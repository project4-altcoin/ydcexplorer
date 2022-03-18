import * as React from 'react';
import Link from '@mui/material/Link';
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

export default function Orders() {

  const [blockCount, setBlockCount] = useState([]);
  const [blockHash, setBlockHash] = useState([]);
  const [proposer, setProposer] = useState([]);
  const [reward, setReward] = useState([]);
 
var callApi1 = async() => {

  var array = []

  for(let i = 0 ; i < 5; i++) {
    const response = await axios.get("http://localhost:3001/getblockcount")
    let count = response.data
    let count2 = count - i
    array.push(count2)
  }
  console.log(array)
  setBlockCount(array)
  }

useEffect(() => {
  callApi1();
},[]);

var callApi2 = async() => {

  const response = await axios.get("http://localhost:3001/getblockcount")
  let count = response.data

  var array = []

  for(let i = count; i > count - 5; i--) {
    const response = await axios.get(`http://localhost:3001/recentblockhash${i}`)
    array.push(response.data)
  }
  console.log(array)
  setBlockHash(array)
  }

useEffect(() => {
  callApi2();
},[]);

var callApi3 = async() => {

  const response = await axios.get("http://localhost:3001/getblockcount")
  let count = response.data

  var array = []

  for(let i = count; i > count - 5; i--) {
    const response = await axios.get(`http://localhost:3001/recentproposer${i}`)
    array.push(response.data)
  }
  console.log(array)
  setProposer(array)
  }

useEffect(() => {
  callApi3();
},[]);

var callApi4 = async() => {

  const response = await axios.get("http://localhost:3001/getblockcount")
  let count = response.data

  var array = []

  for(let i = count; i > count - 5; i--) {
    const response = await axios.get(`http://localhost:3001/recentreward${i}`)
    array.push(response.data)
  }
  console.log(array)
  setReward(array)
  }

useEffect(() => {
  callApi4();
},[]);


const number = [
  { count : 0 },
  { count : 1 },
  { count : 2 },
  { count : 3 },
  { count : 4 }
]

  return (
    <React.Fragment>
      <Title>Recent Blocks</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>BLOCK#</TableCell>
            <TableCell>HASH</TableCell>
            <TableCell>Proposer</TableCell>
            <TableCell>Reward</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {number.map( (val) => {
            return (
              <TableRow key={val.count}>
                <TableCell>{blockCount[val.count]}</TableCell>
                <TableCell>{blockHash[val.count]}</TableCell>
                <TableCell>{proposer[val.count]}</TableCell>
                <TableCell>{reward[val.count]}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
}
