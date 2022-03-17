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
import Time from './util/Time';

function preventDefault(event) {
  event.preventDefault();
}

export default function RecntTXs() {
  const [transactionHash, setTransactionHash] = useState();
  const [fromAddress, setFromAddress] = useState();
  const [toAddress, setToAddress] = useState();
 

    var callBlock = async () => {
        const response = await axios.get("http://localhost:3001/getTxId");
        const {success, data, id, error} = response.data;
        const result = data.result;
        const txid = result.txid;
        setTransactionHash(txid);
        
        const fromAddress = result.vout[0]
        const fromAddress2 = fromAddress.scriptPubKey
        const fromAddress3 = fromAddress2.addresses
        setFromAddress(fromAddress3);
        
        const toAddress = result.vout[1]
        const toAddress2 = toAddress.scriptPubKey
        if(toAddress2.type === "pubkeyhash"){
          const toAddress3 = toAddress2.addresses
            setToAddress(toAddress3);
        }else{
            setToAddress("null");
        }
       
    };
    useEffect(() => {
        callBlock();
    }, []);
    

  return (
    <React.Fragment>
      <Title>Recent Transactions</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>TX Hash</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>From</TableCell>
            <TableCell>To</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>{transactionHash}</TableCell>
            <Time />
            <TableCell>{toAddress}</TableCell>
            <TableCell>{fromAddress}</TableCell>
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
