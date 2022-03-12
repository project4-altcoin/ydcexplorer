import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { useEffect, useState } from 'react';
import axios from "axios"
function preventDefault(event) {
  event.preventDefault();
}

export default function Performance() {
  
  const [ressum, setRessum] = useState(0)
  
  var txsApi = async() => {
    const response = await axios.get("http://localhost:3001/getblockcount")
    let count = response.data
    
    for(let i = count - 10; i < count; i++) {
        console.log(i)
      axios.all([await axios.get(`http://localhost:3001/getblock${i}`)])
      .then(axios.spread((res1) => {
      const txs1 = res1.data
      const res = [txs1];
        console.log(res)
      for(let j = 0; j < res.length; j++) {
        let sum = 0
        sum += res[j]
        console.log(sum)
        setRessum(sum)
      }
    }))
  }   
  
  }
  
 useEffect(() => {
  (txsApi());
 },[]);


  return (
    <React.Fragment>
      <Title>Recent Deposits</Title>
      <Typography component="p" variant="h4">
        {ressum}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on 15 March, 2019
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
  }
