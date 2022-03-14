var express = require('express');
const bodyParser = require('body-parser');
const rpcMethods = require('./routes/api');
const cors = require("cors");
var app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true}))

var request = require("request");

const dotenv = require('dotenv');
dotenv.config();

const USER = process.env.RPC_USER;
const PASS = process.env.RPC_PASSWORD;
const PORT = 9776;
const ACCOUNT = "jaewonee";
const ID_STRING = "kigacoin_id";
const headers = {
    "content-type": "text/plain;"
};

app.use("/", rpcMethods);

app.get("/", (req, res) => {
    res.send("hello server")
})

app.listen(3001, function(){
    console.log("kigacoin api Tutorial is running at http://localhost:3001/");
});
