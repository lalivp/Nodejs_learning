const express = require('express');
const { validationCheck } = require('./middleware.js');
const { getUser, regUser } = require('../Controller/userController');
const app = express.Router();

app.get('/', (req, res) => {
  res.send("Hello World");
})
app.post('/register', validationCheck, regUser);

module.exports = app;