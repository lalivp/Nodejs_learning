const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const environt_var = require("./Config/index");
const mongoose = require('mongoose');


//body-parsing
require('body-parser-xml')(bodyParser);
require("./Config")
app.use(express.json());
app.use(bodyParser.xml());

//Mongo connection
mongoose.connect('mongodb://localhost:27017/test').then((result)=>{
    console.log("connected")
}).catch((error)=>{
    console.log(error)
});

// app.get('/', (req, res) => {
//   res.send("Hello World");
// })
// app.post('/register', (req, res) => {
//     res.send({message:"User registration detail", data:req.body});
//   })

app.use(require('./Routes/userRoutes')) // C

app.listen(environt_var.port, () => {
    console.log(`Example app listening on port ${environt_var.port}`)
})