import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import axios from 'axios';
import { useEffect, useState } from 'react';


function preventDefault(event) {
  event.preventDefault();
}

export default function RecntTXs() {
  const [transactionHash, setTransactionHash] = useState([]);
  const [time, setTime] = useState([]);
  const [fromAddress, setFromAddress] = useState([]);
  const [toAddress, setToAddress] = useState([]);

    var gettxid = async() => {
    
      const response = await axios.get("http://localhost:3001/getblockcount");
      let count = response.data
      var array = [];
      
      for(let i = count; i > count - 5; i--) {
        const response = await axios.get(`http://localhost:3001/getTxId${i}`);
        const {success, data, id, error} = response.data
        const result = data.result;
        const txid = result.txid;
        array.push(txid)
    }
    setTransactionHash(array);
  }

  var gettoaddress = async() => {
    const response = await axios.get("http://localhost:3001/getblockcount");
    let count = response.data
    var array = [];

    for(let i = count; i > count - 5; i--) {
    const response = await axios.get(`http://localhost:3001/getTxId${i}`);
    const {success, data, id, error} = response.data;
    const result = data.result;
    const toAddress = result.vout[0].scriptPubKey.addresses
    array.push(toAddress)
  }
  setToAddress(array)
}


var getfromaddress = async() => {
  const response = await axios.get("http://localhost:3001/getblockcount");
  let count = response.data
  var array = [];

  for(let i = count; i > count - 5; i--) {
  const response = await axios.get(`http://localhost:3001/getTxId${i}`);
  const {success, data, id, error} = response.data;
  const result = data.result;
  const getAddress = result.vout[1].scriptPubKey.addresses
    if(getAddress == undefined){
      array.push("Yordle")
    } else {
    array.push(getAddress)
    }
}
setFromAddress(array)
}

var gettime = async() => {
  const response = await axios.get("http://localhost:3001/getblockcount");
  let count = response.data
  var array = [];

  for(let i = count; i > count - 5; i--) {
  axios.all([await axios.get(`http://localhost:3001/gettime${i}`)])
  .then(axios.spread((res1) => {
    const time = res1.data
    array.push(time)
  }))

}
setTime(array)
}

    useEffect(() => {
      gettxid()
      gettoaddress()
      getfromaddress()
      gettime()
    }, []);

 var gettxidmap = transactionHash.map((row, index) => 
 <TableRow key={index}><TableCell>{row}</TableCell></TableRow>

 )

 var gettimemap = time.map((row, index) => 
  <TableRow key={index}><TableCell>{row}</TableCell></TableRow>
 )

 var getfromaddressmap = fromAddress.map((row, index) => 
  <TableRow key={index}><TableCell>{row}</TableCell></TableRow>
 )
 var gettoaddressmap = toAddress.map((row, index) => 
  <TableRow key={index}><TableCell>{row}</TableCell></TableRow>
 )
    

  return (
    <React.Fragment>
      <Title>Recent Transactions</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>&nbsp;&nbsp;&nbsp;TX Hash</TableCell>
            <TableCell>&nbsp;&nbsp;&nbsp;Time</TableCell>
            <TableCell>&nbsp;&nbsp;&nbsp;from</TableCell>
            <TableCell>&nbsp;&nbsp;&nbsp;To</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>{gettxidmap}</TableCell>
            <TableCell>{gettimemap}</TableCell> 
            <TableCell>{getfromaddressmap}</TableCell>
            <TableCell>{gettoaddressmap}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
