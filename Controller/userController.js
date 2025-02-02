const bcrypt = require('bcryptjs');
const { studentCollection } = require('../Models/dbschema');


const getUser = (req, res) => {

    // Business find, delete
    // res.send('Hello World!')
}

const regUser = (req, res) => {
    studentCollection.find({email:req.body.email}).then((data)=>{
        if(data.length > 0){
            res.status(409).send({message:"email already exist"});
        }else{
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
                    res.send({message:"insert success"});
                }).catch((error) => {
                    console.log(error)
                    res.send(error);
                });
            }
         });
        }
    })
    
}

    // studentCollection.save(req.body).then((result) => {
    //     console.log(result)
    //     // res.send(result)
    // }).catch((error) => {
    // });
    //   console.log("controller");
    // res.send("validation success")
    // Business find, delete

module.exports = {
    getUser,
    regUser
}