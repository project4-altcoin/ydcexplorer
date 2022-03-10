const express = require('express');
const router = express.Router();
var request = require('request');

const dotenv = require('dotenv');
dotenv.config();

const USER = process.env.RPC_USER;
const PASS = process.env.RPC_PASSWORD;
const PORT = 9776;
const ACCOUNT = "wsj";
const ID_STRING = "kigacoin_id";
const headers = {
    "content-type": "text/plain;"
};

router.get("/test",(req, res)=>res.json({ msg: "backend works"}));

router.get("/getblockcount", (req, res) => {
    var dataString = `{"jsonrpc":"1.0", "id":"${ID_STRING}", "method":"getblockcount", "params":[]}`
    var options = {
        url: `http://${USER}:${PASS}@127.0.0.1:${PORT}`,
        method:"POST",
        headers: headers,
        body: dataString
    };

    callback = (error, response, body) => {
        if(!error && response.statusCode == 200){
            const data = JSON.parse(body);
            res.send(data);
        }
    };

    request(options, callback);
});

router.get("/getnetworkinfo", (req, res) => {
    var dataString = `{"jsonrpc":"1.0", "id":"${ID_STRING}", "method":"getnetworkinfo", "params":[]}`
    var options = {
        url: `http://${USER}:${PASS}@127.0.0.1:${PORT}`,
        method:"POST",
        headers: headers,
        body: dataString
    };

    callback = (error, response, body) => {
        if(!error && response.statusCode == 200){
            const data = JSON.parse(body);
            res.send(data);
        }
    };

    request(options, callback);
});

router.get("/getaccountaddress", (req, res) => {
    var dataString = `{"jsonrpc":"1.0", "id":"${ID_STRING}", "method":"getaccountaddress", "params":["${USER}"]}`
    var options = {
        url: `http://${USER}:${PASS}@127.0.0.1:${PORT}`,
        method:"POST",
        headers: headers,
        body: dataString
    };

    callback = (error, response, body) => {
        if(!error && response.statusCode == 200){
            const data = JSON.parse(body);
            res.send(data);
        }
    };

    request(options, callback);
});

router.get("/getaddressesbyaccount", (req, res) => {
    var dataString = `{"jsonrpc":"1.0", "id":"${ID_STRING}", "method":"getaddressesbyaccount", "params":["${USER}"]}`
    var options = {
        url: `http://${USER}:${PASS}@127.0.0.1:${PORT}`,
        method:"POST",
        headers: headers,
        body: dataString
    };

    callback = (error, response, body) => {
        if(!error && response.statusCode == 200){
            const data = JSON.parse(body);
            res.send(data);
        }
    };

    request(options, callback);
});

router.get("/listsinceblock", (req, res) => {
    var dataString = `{"jsonrpc":"1.0", "id":"${ID_STRING}", "method":"listsinceblock", "params":[]}`
    var options = {
        url: `http://${USER}:${PASS}@127.0.0.1:${PORT}`,
        method:"POST",
        headers: headers,
        body: dataString
    };

    callback = (error, response, body) => {
        if(!error && response.statusCode == 200){
            const data = JSON.parse(body);
            res.send(data);
        }
    };

    request(options, callback);
});

module.exports = router;