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

// Generate Order Data
// function createData(id, date, name, shipTo, paymentMethod, amount) {
//   return { id, date, name, shipTo, paymentMethod, amount };
// }

// const rows = [
//   createData(
//     0,
//     '16 Mar, 2019',
//     'Elvis Presley',
//     'Tupelo, MS',
//     'VISA ⠀•••• 3719',
//     312.44,
//   ),
//   createData(
//     1,
//     '16 Mar, 2019',
//     'Paul McCartney',
//     'London, UK',
//     'VISA ⠀•••• 2574',
//     866.99,
//   ),
//   createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
//   createData(
//     3,
//     '16 Mar, 2019',
//     'Michael Jackson',
//     'Gary, IN',
//     'AMEX ⠀•••• 2000',
//     654.39,
//   ),
//   createData(
//     4,
//     '15 Mar, 2019',
//     'Bruce Springsteen',
//     'Long Branch, NJ',
//     'VISA ⠀•••• 5919',
//     212.79,
//   ),
// ];

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {

  const [blockCount, setBlockCount] = useState([]);
  const [blockHash, setBlockHash] = useState([]);
  const [addresses, setAddresses] = useState([]);


  var callApi1 = async() => {
   const response = await axios.get("http://localhost:3001/blockcount")
   setBlockCount(response.data)
 }
 
 useEffect(() => {
   callApi1();
 },[]);


 var callApi2 = async() => {
  const response = await axios.get("http://localhost:3001/getbestblockhash")
  setBlockHash(response.data.result)
}

useEffect(() => {
  callApi2();
},[]);


var callApi3 = async() => {
  const response = await axios.get("http://localhost:3001/getaddress")
  setAddresses(response.data)
}

useEffect(() => {
  callApi3();
},[]);



  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>BLOCK#</TableCell>
            <TableCell>HASH</TableCell>
            <TableCell>Addresses</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell align="right">Sale Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>{blockCount[0]}</TableCell>
            <TableCell>{blockHash}</TableCell>
            <TableCell>{addresses}</TableCell>
            <TableCell>test4</TableCell>
            <TableCell>test5</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{blockCount[1]}</TableCell>
            <TableCell>{blockHash}</TableCell>
            <TableCell>{addresses}</TableCell>
            <TableCell>test4</TableCell>
            <TableCell>test5</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{blockCount[2]}</TableCell>
            <TableCell>{blockHash}</TableCell>
            <TableCell>{addresses}</TableCell>
            <TableCell>test4</TableCell>
            <TableCell>test5</TableCell>
          </TableRow>
          {/* {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{`$${row.amount}`}</TableCell>
            </TableRow>
          ))} */}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
}
