const express = require('express');
const router = express.Router();
var request = require('request');
const dotenv = require('dotenv');
const { default: axios } = require('axios');
dotenv.config();


const USER = process.env.RPC_USER;
const PASS = process.env.RPC_PASSWORD;
const PORT = 9776;
const ACCOUNT = "jidoil";
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

router.get("/getblockhash", (req, res) => {
    var dataString = `{"jsonrpc":"1.0", "id":"${ID_STRING}", "method":"getblockhash", "params":[1]}`
    console.log(dataString) 
    var options = {
        url: `http://${USER}:${PASS}@127.0.0.1:${PORT}`,
        method:"POST",
        headers: headers,
        body: dataString
    };
    callback = (error, response, body) => {
        console.log(response)
        if(!error && response.statusCode == 200){
            const data = JSON.parse(body);
            const datas = JSON.stringify(data.result)
            console.log(datas)
            res.send(datas);
        }
    };

    request(options, callback);
});


router.post("/getblock", (req, res)=>{
    var hash = req.body.hash;
    console.log(req.body.hash);
    console.log(hash);
    var dataString  = `{"jsonrpc": "1.0", "id":"${ID_STRING}", "method": "getblock", "params": ["${hash}"]}`;
    var options = {
        url: `http://${USER}:${PASS}@127.0.0.1:${PORT}`,
        method: "POST",
        headers: headers,
        body: dataString
    };
    callback = (error, response, body) => {
        if(!error && response.statusCode == 200){
            const data = JSON.parse(body);
            console.log(data);
            res.status(200).json({ success: true, data: data });
        }
    };

    request(options, callback);
});

//=============================
// transaction history
for(let i = 0; i < 200; i ++){
    router.get(`/txhistory${i}`, (req, res) => {
        var dataString = `{"jsonrpc":"1.0", "id":"${ID_STRING}", "method":"getblockhash", "params":[${i}]}`
        console.log(dataString) 
        var options = {
            url: `http://${USER}:${PASS}@127.0.0.1:${PORT}`,
            method:"POST",
            headers: headers,
            body: dataString
        };
        callback = async(error, response, body) => {
            console.log(response)
            if(!error && response.statusCode == 200){
                const data = JSON.parse(body);
                const datas = JSON.stringify(data.result)
                // res.send(datas);
                
                // callback2
                var dataString = `{"jsonrpc":"1.0","method":"getblock", "params":[${datas}]}`
                var options = {
                    url: `http://${USER}:${PASS}@127.0.0.1:${PORT}`,
                    method:"POST",
                    headers: headers,
                    body: dataString
                };
                callback2 = async(error, response, body) => {
                    if(!error && response.statusCode == 200){
                        const data = JSON.parse(body);
                        // send data to front
                        res.send(data);
    
                        // extracted data
                        const blockHeight = JSON.stringify(data.result.height) // time 
                        const blockTime = JSON.stringify(data.result.time) // time 
                        const txArray = JSON.stringify(data.result.tx) // transaction array 
                        const txNum = JSON.stringify(data.result.tx.length) // transaction number 
                        // unix timestamp -> real time
                        function Unix_timestamp(t){
                          var date = new Date(t*1000);
                          var year = date.getFullYear();
                          var month = "0" + (date.getMonth()+1);
                          var day = "0" + date.getDate();
                          var hour = "0" + date.getHours();
                          var minute = "0" + date.getMinutes();
                          var second = "0" + date.getSeconds();
                          return year + "-" + month.substr(-2) + "-" + day.substr(-2) + " " + hour.substr(-2) + ":" + minute.substr(-2) + ":" + second.substr(-2);
                        }
    
                        console.log("blockHeight : ", blockHeight);
                        console.log("blockTime : ", blockTime);
                        console.log("blockRealtime : ", Unix_timestamp(blockTime));
                        console.log("txArray : ", txArray);
                        console.log("txNum : ", txNum);
                    }
                }
                request(options, callback2);
            }
        };
        request(options, callback);
    });
}




// //=============================
// var getaxi = async() => {
//     try{
//     return await axios.get("http://localhost:3001/getblockcount")
// }   catch(err) {
//     console.error(err)
// }
// }

// var getcount = async() => {
//     let count = await getaxi()
//     console.log(count.data);
// }

// getcount();
// for(let i = 0; i < 100000; i++) {  

//     router.get(`/getblock${i}`, (req, res) => {  
//             var dataString = `{"jsonrpc":"1.0","method":"getblockhash", "params":[${i}]}`
//             var options = {
//                 url: `http://${USER}:${PASS}@127.0.0.1:${PORT}`,
//                 method:"POST",
//                 headers: headers,
//                 body: dataString
//             };
//             callback = async(error, response, body) => {
//                 if(!error && response.statusCode == 200){
//                     const data = JSON.parse(body);
//                     const datas = JSON.stringify(data.result)
                    
//                     // console.log(datas)
    
//                     var dataString = `{"jsonrpc":"1.0","method":"getblock", "params":[${datas}]}`
//                     var options2 = {
//                         url: `http://${USER}:${PASS}@127.0.0.1:${PORT}`,
//                         method:"POST",
//                         headers: headers,
//                         body: dataString
//                     };
//                     callback2 = async(error, response, body) => {
//                         if(!error && response.statusCode == 200){
//                             const data = JSON.parse(body);  
//                             const datas = JSON.stringify(data.result.tx.length)                     
//                             res.send(datas)                            
//                         }
//                     }
//                     request(options2, callback2);
//                 }  
//             };
//             request(options, callback);
//         })
//     };
    
router.get("/getTxId", (req, res) => {
    var dataString = `{"jsonrpc":"1.0", "id":"${ID_STRING}", "method":"getbestblockhash", "params":[]}`;
    var options1 = {
        url: `http://${USER}:${PASS}@127.0.0.1:${PORT}`,
        method: "POST",
        headers: headers,
        body: dataString
    };
    
    callback1 = (error, response, body) => {
        if(!error && response.statusCode == 200){
            const data = JSON.parse(body);
            const datas = JSON.stringify(data.result)
            console.log("bestblock: ", datas);

            var dataString = `{"jsonrpc":"1.0","method":"getblock", "params":[${datas}]}`
            var options2 = {
                url: `http://${USER}:${PASS}@127.0.0.1:${PORT}`,
                method:"POST",
                headers: headers,
                body: dataString
            };
            callback2 = (error, response, body) => {
                if(!error && response.statusCode == 200){
                    const data = JSON.parse(body);
                    const txid = JSON.stringify(data.result.tx[0])
                    console.log("getblock :", txid);

                    var dataString = `{"jsonrpc":"1.0","method":"getrawtransaction", "params":[${txid}]}`
                    var options3 = {
                        url: `http://${USER}:${PASS}@127.0.0.1:${PORT}`,
                        method:"POST",
                        headers: headers,
                        body: dataString
                    };
                    callback3 = (error, response, body) => {
                        if(!error && response.statusCode == 200){
                            const data = JSON.parse(body);
                            const hex = JSON.stringify(data.result)
                            console.log("getrawtransaction :", hex);

                            var dataString = `{"jsonrpc":"1.0","method":"decoderawtransaction", "params":[${hex}]}`
                            var options4 = {
                                url: `http://${USER}:${PASS}@127.0.0.1:${PORT}`,
                                method:"POST",
                                headers: headers,
                                body: dataString
                            };
                            callback4 = (error, response, body) => {
                                if(!error && response.statusCode == 200){
                                    const data = JSON.parse(body);
                                    const txid = JSON.stringify(data.result)
                                    console.log("decoderawtransaction :", txid);
                                    
                                    res.status(200).json({success: true, data: data});
                                    var dataString = `{"jsonrpc":"1.0","method":"gettransaction", "params":[${txid}]}`
                                    var options5 = {
                                        url: `http://${USER}:${PASS}@127.0.0.1:${PORT}`,
                                        method:"POST",
                                        headers: headers,
                                        body: dataString
                                    }
                                    callback5 = (error, response, body) => {
                                        if(!error && response.statusCode == 200){
                                           const data = JSON.parse(body);
                                            res.status(200).json({success: true, data: data});
                                        }
                                    }
                                    request(options5, callback5);
                                }
                            }
                            request(options4, callback4);
                        }
                    }
                    request(options3, callback3);
                }
            }
            request(options2, callback2);
        }
    }
    request(options1, callback1);
});

router.post("/decoderawtransaction", (req, res)=>{
    var hex = req.body.hex;
    console.log(req.body.hex);
    console.log(hex);
    var dataString  = `{"jsonrpc": "1.0", "id":"${ID_STRING}", "method": "decoderawtransaction", "params": ["${hex}"]}`;
    var options = {
        url: `http://${USER}:${PASS}@127.0.0.1:${PORT}`,
        method: "POST",
        headers: headers,
        body: dataString
    };
    callback = (error, response, body) => {
        if(!error && response.statusCode == 200){
            const data = JSON.parse(body);
            console.log(data);
            res.status(200).json({ success: true, data: data });
        }
    };

    request(options, callback);
})

router.post("/getrawtransaction", (req, res)=>{
    var txid = req.body.txid;
    var verbose = 0;
    console.log("txid: "+ req.body.txid);
    var dataString  = `{"jsonrpc": "1.0", "id":"${ID_STRING}", "method": "getrawtransaction", "params": ["${txid}", ${verbose}]}`;
    var options = {
        url: `http://${USER}:${PASS}@127.0.0.1:${PORT}`,
        method: "POST",
        headers: headers,
        body: dataString
    };
    callback = (error, response, body) => {
        if(!error && response.statusCode == 200){
            const data = JSON.parse(body);
            console.log(data);
            res.status(200).json({ success: true, data: data });
        }
    };
    request(options, callback);
})

router.post("/gettransaction", (req, res)=>{
    var txid = req.body.txid;
    console.log("txid: "+ req.body.txid);
    var dataString  = `{"jsonrpc": "1.0", "id":"${ID_STRING}", "method": "gettransaction", "params": ["${txid}"]}`;
    var options = {
        url: `http://${USER}:${PASS}@127.0.0.1:${PORT}`,
        method: "POST",
        headers: headers,
        body: dataString
    };
    callback = (error, response, body) => {
        if(!error && response.statusCode == 200){
            const data = JSON.parse(body);
            console.log(data);
            res.status(200).json({ success: true, data: data });
        }
    };
    request(options, callback);
})


router.get("/gettime", (req, res)=>{
    var dataString = `{"jsonrpc":"1.0", "id":"${ID_STRING}", "method":"getbestblockhash", "params":[]}`;
    var options1 = {
        url: `http://${USER}:${PASS}@127.0.0.1:${PORT}`,
        method: "POST",
        headers: headers,
        body: dataString
    };
    
    callback1 = (error, response, body) => {
        if(!error && response.statusCode == 200){
            const data = JSON.parse(body);
            const datas = JSON.stringify(data.result)
            console.log("bestblock: ", datas);

            var dataString = `{"jsonrpc":"1.0","method":"getblock", "params":[${datas}]}`
            var options2 = {
                url: `http://${USER}:${PASS}@127.0.0.1:${PORT}`,
                method:"POST",
                headers: headers,
                body: dataString
            };
            callback2 = (error, response, body) => {
                if(!error && response.statusCode == 200){
                    const data = JSON.parse(body);
                    res.status(200).json({success: true, data: data});
                }
            }
            request(options2, callback2);
        }
    }
    request(options1, callback1);
})

router.get('/getbalance', (req, res) => {
    var dataString = `{"jsonrpc": "1.0", "id":"${ID_STRING}", "method": "getbalance", "params": ["${ACCOUNT}"]}`;
    var options = {
        url: `http://${USER}:${PASS}@127.0.0.1:${PORT}`,
        method: "POST",
        headers: headers,
        body: dataString
    };
    callback = (error, response, body) => {
        if(!error && response.statusCode == 200){
            const data = JSON.parse(body);
            console.log(data);
            res.status(200).json({ success: true, data: data });
        }
    };
    request(options, callback);
})

router.get("/getinfo", (req, res) => {
    var dataString = `{"jsonrpc": "1.0", "id":"${ID_STRING}", "method": "getinfo", "params": []}`;
    var options = {
        url: `http://${USER}:${PASS}@127.0.0.1:${PORT}`,
        method: "POST",
        headers: headers,
        body: dataString
    };
    callback = (error, response, body) => {
        if(!error && response.statusCode == 200){
            const data = JSON.parse(body);
            console.log(data);
            res.status(200).json({ success: true, data: data });
        }
    };
    request(options, callback);
})


router.get("/getconnectioncount", (req, res) => {
    var dataString = `{"jsonrpc": "1.0", "id":"${ID_STRING}", "method": "getconnectioncount", "params": []}`;
    var options = {
        url: `http://${USER}:${PASS}@127.0.0.1:${PORT}`,
        method: "POST",
        headers: headers,
        body: dataString
    };
    callback = (error, response, body) => {
        if(!error && response.statusCode == 200){
            const data = JSON.parse(body);
            console.log(data);
            res.status(200).json({ success: true, data: data });
        }
    };
    request(options, callback);
})


router.post("/getnetworkhashps", (req, res)=>{
    var blocks = req.body.blocks;
    var height = req.body.height;
    console.log(req.body.blocks);
    console.log(req.body.height);
    var dataString  = `{"jsonrpc": "1.0", "id":"${ID_STRING}", "method": "getnetworkhashps", "params": [${blocks}, ${height}]}`;
    var options = {
        url: `http://${USER}:${PASS}@127.0.0.1:${PORT}`,
        method: "POST",
        headers: headers,
        body: dataString
    };
    callback = (error, response, body) => {
        if(!error && response.statusCode == 200){
            const data = JSON.parse(body);
            console.log(data);
            res.status(200).json({ success: true, data: data });
        }
    };

    request(options, callback);
});

router.get("/getnewaddress", (req, res)=>{
    const account = req.body.account;
    console.log("account: " + account);
    var dataString  = `{"jsonrpc": "1.0", "id":"${ID_STRING}", "method": "getnewaddress", "params": ["${account}"]}`;
    var options = {
        url: `http://${USER}:${PASS}@127.0.0.1:${PORT}`,
        method: "POST",
        headers: headers,
        body: dataString
    };
    callback = (error, response, body) => {
        if(!error && response.statusCode == 200){
            const data = JSON.parse(body);
            console.log(data);
            res.status(200).json({ success: true, data: data });
        }
    };
    request(options, callback);
})


router.get("/getpeerinfo",(req, res)=>{
    var dataString = `{"jsonrpc": "1.0", "id":"${ID_STRING}", "method": "getpeerinfo", "params": []}`;
    var options = {
        url: `http://${USER}:${PASS}@127.0.0.1:${PORT}`,
        method: "POST",
        headers: headers,
        body: dataString
    };
    callback = (error, response, body) => {
        if(!error && response.statusCode == 200){
            const data = JSON.parse(body);
            console.log(data);
            res.status(200).json({ success: true, data: data });
        }
    };
    request(options, callback);
})

router.get("/getrawmempool", (req, res)=>{
    var dataString = `{"jsonrpc": "1.0", "id":"${ID_STRING}", "method": "getrawmempool", "params": []}`;
    var options = {
        url: `http://${USER}:${PASS}@127.0.0.1:${PORT}`,
        method: "POST",
        headers: headers,
        body: dataString
    };
    callback = (error, response, body) => {
        if(!error && response.statusCode == 200){
            const data = JSON.parse(body);
            console.log(data);
            res.status(200).json({ success: true, data: data });
        }
    };
    request(options, callback);
})


router.get("/listaccount", (req, res)=>{
    var dataString = `{"jsonrpc": "1.0", "id":"${ID_STRING}", "method": "listaccounts", "params": []}`;
    var options = {
        url: `http://${USER}:${PASS}@127.0.0.1:${PORT}`,
        method: "POST",
        headers: headers,
        body: dataString
    };
    callback = (error, response, body) => {
        if(!error && response.statusCode == 200){
            const data = JSON.parse(body);
            console.log(data);
            res.status(200).json({ success: true, data: data });
        }
    };
    request(options, callback);
})

router.post("/listtransaction", (req, res)=>{
    var account = req.body.account;
    var count = req.body.count;
    var skip = req.body.skip;
    var dataString = `{"jsonrpc": "1.0", "id":"${ID_STRING}", "method": "listtransactions", "params": ["${account}", ${count}, ${skip}]}`;
    var options = {
        url: `http://${USER}:${PASS}@127.0.0.1:${PORT}`,
        method: "POST",
        headers: headers,
        body: dataString
    };
    callback = (error, response, body) => {
        if(!error && response.statusCode == 200){
            const data = JSON.parse(body);
            console.log(data);
            res.status(200).json({ success: true, data: data });
        }
    };
    request(options, callback);
})

router.post("/sendfrom", (req, res)=>{
    var from = req.body.from;
    var to = req.body.to;
    var amount = req.body.amount;
    var miniconf = 1
    var comment = req.body.comment;
    var dataString = `{"jsonrpc": "1.0", "id":"${ID_STRING}", "method": "sendfrom", "params": ["${from}", "${to}", ${amount}, ${miniconf}, "${comment}"]}`;
    var options = {
        url: `http://${USER}:${PASS}@127.0.0.1:${PORT}`,
        method: "POST",
        headers: headers,
        body: dataString
    };
    callback = (error, response, body) => {
        if(!error && response.statusCode == 200){
            const data = JSON.parse(body);
            console.log(data);
            res.status(200).json({ success: true, data: data });
        }
    };
    request(options, callback);
})

router.post("/sendmany", (req, res)=>{
    var from = req.body.from;
    var to = req.body.to;
    var amount = req.body.amount;
    var miniconf = 1
    var comment = req.body.comment;
    var comment_to = req.body.comment_to;
    var dataString = `{"jsonrpc": "1.0", "id":"${ID_STRING}", "method": "sendmany", "params": ["${from}", ${to}, ${amount}, ${miniconf}, "${comment}", "${comment_to}"]}`;
    var options = {
        url: `http://${USER}:${PASS}@127.0.0.1:${PORT}`,
        method: "POST",
        headers: headers,
        body: dataString
    };
    callback = (error, response, body) => {
        if(!error && response.statusCode == 200){
            const data = JSON.parse(body);
            console.log(data);
            res.status(200).json({ success: true, data: data });
        }
    };
    request(options, callback);
})

router.post("/sendtoaddress", (req, res)=>{
    var address = req.body.address;
    var amount = req.body.amount;
    var comment = req.body.comment;
    var comment_to = req.body.comment_to;
    var dataString = `{"jsonrpc": "1.0", "id":"${ID_STRING}", "method": "sendtoaddress", "params": ["${address}", ${amount}, "${comment}", "${comment_to}"]}`;
    var options = {
        url: `http://${USER}:${PASS}@127.0.0.1:${PORT}`,
        method: "POST",
        headers: headers,
        body: dataString
    };
    callback = (error, response, body) => {
        if(!error && response.statusCode == 200){
            const data = JSON.parse(body);
            console.log(data);
            res.status(200).json({ success: true, data: data });
        }
    };
    request(options, callback);
})

router.get("/verifychain", (req, res)=>{
    var dataString = `{"jsonrpc": "1.0", "id":"${ID_STRING}", "method": "verifychain", "params": []}`;
    var options = {
        url: `http://${USER}:${PASS}@127.0.0.1:${PORT}`,
        method: "POST",
        headers: headers,
        body: dataString
    };
    callback = (error, response, body) => {
        if(!error && response.statusCode == 200){
            const data = JSON.parse(body);
            console.log(data);
            res.status(200).json({ success: true, data: data });
        }
    };
    request(options, callback);
})



module.exports = router;
