const { studentCollection } = require('../Models/dbschema');
const getUser = (req, res) => {

    // Business find, delete
    // res.send('Hello World!')
}

const regUser = (req, res) => {
    // res.send ({data:req.originalUrl});
    const student = new studentCollection(req.body);
    student.save(req.body).then((result) => {
        res.send({message:"insert success"});
    }).catch((error) => {
        console.log(error)
        res.send(error);
    });
};

module.exports = {
    getUser,
    regUser
}