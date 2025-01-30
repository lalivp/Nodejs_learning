const getUser = (req, res) => {

    // Business find, delete
    // res.send('Hello World!')
}

const regUser = (req, res) => {
    res.send ({data:req.originalUrl});
};

module.exports = {
    getUser,
    regUser
}