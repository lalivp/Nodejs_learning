const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const environt_var = require("./Config/index");
const mongoose = require('mongoose');
const cors = require('cors');


//body-parsing
require('body-parser-xml')(bodyParser);
app.use(express.json());
app.use(bodyParser.xml());

app.use(cors());

//env
require("./Config")

//Mongo connection
mongoose.connect('mongodb://localhost:27017/test').then((result)=>{
    console.log("connected")
}).catch((error)=>{
    console.log(error)
});


app.use(require('./Routes/userRoutes')) // Custom middleware

app.listen(environt_var.port, () => {
    console.log(`Example app listening on port ${environt_var.port}`)
})