const Joi = require("joi");
const { getSchema } = require("../Models/schema");
const jwt = require('jsonwebtoken');
const {secretKey} = require('../Config/index'); 
const async = require("async");
const { studentCollection } = require("../Models/dbschema");

const validationCheck = (req,res,next)=>{
    let reqUrl = req.originalUrl;
    let validationSchema = getSchema(reqUrl);
    let validationMethods = Joi.object(validationSchema);
    let result = validationMethods.validate(req.body);
    if(result?.error){
        res.send(result?.error?.details[0]?.message)
    } else{
        next()
    }
}

const tokenVerify = (req, res, next) =>{
    async.waterfall([
        (callback)=>{
            let token = req?.headers?.authorization;
            jwt.verify (token, secretKey, (err, result) =>{
            if(err){
                res.status(401).send({status:false, message:"Token Expired"});
            }else{
                callback(null, result);
            }
             })
        },
        (result, callback)=>{
        //    res.send(result);
            let id = result?.email;
            studentCollection.find({email:id}).then((data)=>{
                if(data?.length >0){
                    callback(null, data);
                }else{
                    res.send({status:false, message:"Tokn expired"})
                }
            })
        } 
    ],(err, result)=>{
        if(err){
            res.status(401).send({status:false, message:"Token Expired"})
        }else{
            next();
        }
    })
    
}
module.exports = {
    validationCheck,
    tokenVerify
}