const bcrypt = require('bcryptjs');
const { studentCollection } = require('../Models/dbschema');
const async = require("async");
const jwt = require('jsonwebtoken');
const {secretKey} = require('../Config/index');
const bunyan = require('bunyan');
const path = require("path");

//logging
const log =  bunyan.createLogger({
    name: "UserModule",
    streams: [
        {
            level: "info", // Log level
            path: path.join(__dirname, "logs/app.log"), // Log file path
        },
        {
            level: "error",
            path: path.join(__dirname, "logs/error.log"),
        },
    ],
});

const getUser = (req, res) => {
    let {id} = req.headers;
    // console.log(id);
    studentCollection.find({_id:id},{password:0}).then((data)=>{
        res.send({status:true, data});
    }).catch((error)=>{
        res.status(500).send({status:false, message:"Internal Server error"})
    })
}

const regUser = (req, res) => {
    async.waterfall([
        (callback)=>{
            studentCollection.find({email:req.body.email}).then((data)=>{
                if(data.length > 0){
                    res.status(409).send({message:"email already exist"});
                }else{
                    callback(null, true)
                }
            }).catch((error)=>{
                console.log(error);
            });
        },
        (arg1, callback) =>{
            let { password } = req.body;
            let hassPassword;
             bcrypt.hash(password, 10, function (err, hash) {
            if (err) {
                console.log(err)
            } else {
                hassPassword = hash;
                req.body.password = hassPassword;
                callback(null, true);
            }
         });
        }, (arg2, callback) =>{
            const student = new studentCollection(req.body);
            student.save(req.body).then((result) => {
                callback(null,{message:"insert success"})
            }).catch((error) => {
                callback(error);
            });
        }
    ],(err, result)=>{
        if(err){
            res.send(err);
        }else{
            res.status(201).send(result);
            log.info(req.body);
        }
    })
}

const loginUser = (req, res) =>{
    async.waterfall([
        // 1.Check the email id if already exist or not
        (callback)=>{
            studentCollection.find({email:req.body.email}).then((data) =>{
                if(data.length > 0){
                    userDetails = data[0];
                    callback(null, userDetails)
                } else {
                    res.status(404).send({message:"email not found"})
                }
            }).catch ((error) =>{
                callback(error);
            })

        },
        //2. Comparing the password
        (arg1, callback)=>{
            bcrypt.compare(req.body.password, arg1.password, function (err, result){
                if (result){
                    callback(null,arg1);
                } else {
                    res.status(401).send({message:"Incorrect password"});
                }
            })
        },
        //3. generating the JWT token
        (arg2,callback)=>{
            let token = jwt.sign({id:arg2._id}, secretKey, {expiresIn:"1h"});
            callback (null, token);
        }
    ],(err, result)=>{
        if(err){
            res.send(err);
        }else {
            result2= {...userDetails._doc};
            delete result2.password;
            res.status(200).send({status:true, data: result2, token: result});
        }
    })
}

const updateUser = (req, res) =>{
    let {id} = req.headers;
    console.log(req.body);
    studentCollection.updateOne({_id:id}, {$set: {fullName:req.body.fullName}}).then((result)=>{
        res.status(200).send({status: true, message:"Updated"});
    }).catch((error)=>{
        res.status(500).send({status: false, message:"Internal Server Error"});
    })
}
const deleteUser= (req, res) =>{
    let {id} = req.headers;
    studentCollection.deleteOne({_id:id}).then((result)=>{
        res.status(200).send({status: true, message:"Deleted"})
    }).catch((error)=>{
        res.status(500).send({status: false, message:"Internal Server Error"});
    })
}

module.exports = {
    getUser,
    regUser,
    loginUser,
    updateUser,
    deleteUser
}