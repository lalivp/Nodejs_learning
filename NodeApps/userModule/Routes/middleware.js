const Joi = require("joi");
const { getSchema } = require("../Models/schema");
const jwt = require('jsonwebtoken');

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
    let token = req?.headers?.authorization;
    jwt.verify (token, "secretkey",(err,result) =>{
        if(err){
            console.log(JSON.stringify(err))
        }else{
            next()
        }
    })
}
module.exports = {
    validationCheck,
    tokenVerify
}