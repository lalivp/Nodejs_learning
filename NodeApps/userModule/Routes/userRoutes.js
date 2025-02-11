const express = require('express');
const { validationCheck, tokenVerify } = require('./middleware.js');
const { getUser, regUser, loginUser, updateUser } = require('../Controller/userController');
const app = express.Router();



app.get('/', (req, res) => {
  res.send("Hello World");
});
app.post('/getuser',tokenVerify, validationCheck,  getUser);
app.post('/register', validationCheck, regUser);
app.post('/updateUser', tokenVerify, validationCheck,  updateUser)
app.post('/login', validationCheck, loginUser);


module.exports = app;