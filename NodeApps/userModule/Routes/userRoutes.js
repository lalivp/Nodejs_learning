const express = require('express');
const { validationCheck, tokenVerify } = require('./middleware.js');
const { getUser, regUser, loginUser } = require('../Controller/userController');
const app = express.Router();



app.get('/', (req, res) => {
  res.send("Hello World");
});
app.post('/getuser', validationCheck, tokenVerify, getUser);
app.post('/register', validationCheck, regUser);
app.post('/login', validationCheck, loginUser);

module.exports = app;