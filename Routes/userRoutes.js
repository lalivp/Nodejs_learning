const express = require('express');
const { validationCheck } = require('./middleware.js');
const { getUser, regUser, loginUser } = require('../Controller/userController');
const app = express.Router();



app.get('/', (req, res) => {
  res.send("Hello World");
})
app.post('/register', validationCheck, regUser);
app.post('/login', validationCheck, loginUser);

module.exports = app;