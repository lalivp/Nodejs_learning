const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const environt_var = require("./Config/index");
require('body-parser-xml')(bodyParser);
require("./Config")
app.use(express.json());
app.use(bodyParser.xml());

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