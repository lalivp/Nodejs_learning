const bcrypt = require('bcryptjs');
const { studentCollection } = require('../Models/dbschema');
const async = require("async");

const getUser = (req, res) => {

    // Business find, delete
    // res.send('Hello World!')
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

                const student = new studentCollection(req.body);
                student.save(req.body).then((result) => {
                    callback(null,{message:"insert success"})
                }).catch((error) => {
                    callback(error);
                });
            }
         });
        }
    ],(err, result)=>{
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
}

const loginUser = (req, res) =>{
    studentCollection.find({email:req.body.email}).then((data) =>{
        if(data.length > 0){
            res.send(data[0])
        } else {
            res.status(404).send({message:"email not found"})
        }
    }).catch ((error) =>{
        console.log(error);
    })
}

module.exports = {
    getUser,
    regUser,
    loginUser
}