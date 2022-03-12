const express = require('express');
const router = express.Router();
var request = require('request');

const dotenv = require('dotenv');
dotenv.config();

const USER = process.env.RPC_USER;
const PASS = process.env.RPC_PASSWORD;
const PORT = 9776;
const ACCOUNT = "kbpark";
const ID_STRING = "kigacoin_id";
const headers = {
    "content-type": "text/plain;"
};

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
            res.send(JSON.stringify(data.result));
        }
    };

    request(options, callback);
});

router.get("/getbestblockhash", (req, res) => {
    var dataString = `{"jsonrpc":"1.0", "id":"${ID_STRING}", "method":"getbestblockhash", "params":[]}`
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

router.get("/gettxoutsetinfo", (req, res) => {
    var dataString = `{"jsonrpc":"1.0", "id":"${ID_STRING}", "method":"gettxoutsetinfo", "params":[]}`
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

router.get("/getaddress", (req, res) => {
    var dataString = `{"jsonrpc":"1.0", "id":"${ID_STRING}", "method":"gettxoutsetinfo", "params":[]}`
    var options = {
        url: `http://${USER}:${PASS}@127.0.0.1:${PORT}`,
        method:"POST",
        headers: headers,
        body: dataString
    };

    callback = (error, response, body) => {
        if(!error && response.statusCode == 200){
            const data = JSON.parse(body);
            const datas = JSON.stringify(data.result.bestblock)
            //res.send(datas);

            var dataString = `{"jsonrpc":"1.0", "id":"${ID_STRING}", "method":"getblock", "params":[${datas}]}`
            var options = {
                url: `http://${USER}:${PASS}@127.0.0.1:${PORT}`,
                method:"POST",
                headers: headers,
                body: dataString
            };
        
            callback1 = (error, response, body) => {
                if(!error && response.statusCode == 200){
                    const data = JSON.parse(body);   
                    const datas = JSON.stringify(data.result.tx[0])
                    // var data3 = datas.toString();      
                    // console.log(data3)
                    // res.send(JSON.stringify(data.result.tx))       
                    //console.log(typeof(JSON.stringify(data.result.tx)))
        
                        //callback2
                        var dataString = `{"jsonrpc":"1.0", "id":"${ID_STRING}", "method":"getrawtransaction", "params":[${datas}]}`
                        var options = {
                            url: `http://${USER}:${PASS}@127.0.0.1:${PORT}`,
                            method:"POST",
                            headers: headers,
                            body: dataString
                        };
                        
                        callback2 = (error, response, body) => {
                            if(!error && response.statusCode == 200){
                                const data = JSON.parse(body);   
                                const datas = JSON.stringify(data.result)     
                                //res.send(JSON.stringify(data.result))       
                                //console.log(data.result)
        
                                //callback3
                                var dataString = `{"jsonrpc":"1.0", "id":"${ID_STRING}", "method":"decoderawtransaction", "params":[${datas}]}`
                                var options = {
                                    url: `http://${USER}:${PASS}@127.0.0.1:${PORT}`,
                                    method:"POST",
                                    headers: headers,
                                    body: dataString
                                };
                                
                                callback3 = (error, response, body) => {
                                    if(!error && response.statusCode == 200){
                                        const data = JSON.parse(body);  
                                        const datas = JSON.stringify(data.result) 
                                        // res.send(JSON.stringify(data.result.tx.length))       
                                        res.send(JSON.stringify(data.result.vout[0].scriptPubKey.addresses[0]))       
                                        //res.send(data)    
                                        //console.log(data.result)
                                        //console.log(typeof(datas))
                                    } 
                                };
                                request(options, callback3);
                            } 
                        };
                    request(options, callback2);
                } 
            };
            request(options, callback1);
        }
    };
    request(options, callback);
});

//=============================

for(let i = 0; i < 10000; i++) {
    router.get(`/getblock${i}`, (req, res) => {  
            var dataString = `{"jsonrpc":"1.0","method":"getblockhash", "params":[${i}]}`
            var options = {
                url: `http://${USER}:${PASS}@127.0.0.1:${PORT}`,
                method:"POST",
                headers: headers,
                body: dataString
            };
            callback = async(error, response, body) => {
                if(!error && response.statusCode == 200){
                    const data = JSON.parse(body);
                    const datas = JSON.stringify(data.result)
                    
                    // console.log(datas)
    
                    var dataString = `{"jsonrpc":"1.0","method":"getblock", "params":[${datas}]}`
                    var options2 = {
                        url: `http://${USER}:${PASS}@127.0.0.1:${PORT}`,
                        method:"POST",
                        headers: headers,
                        body: dataString
                    };
                    callback2 = async(error, response, body) => {
                        if(!error && response.statusCode == 200){
                            const data = JSON.parse(body);  
                            const datas = JSON.stringify(data.result.tx.length)                     
                            res.send(datas)                            
                        }
                    }
                    request(options2, callback2);
                }  
            };
            request(options, callback);
        })
    };
module.exports = router;