import * as React from 'react';
import styled from "styled-components"
import { useEffect, useState } from 'react';
import axios from "axios"


function preventDefault(event) {
  event.preventDefault();
}

const Align = styled.div`

  p {
    text-align: center;
  }
  a {
    text-align: center;  
    color: grey;
  }

`;


export default function Consensusnode() {

  let sum = 0
  const [ressum, setRessum] = useState(0)
  
  var txsApi = async() => {
    const response = await axios.get("http://localhost:3001/getblockcount")
    let count = response.data
    
    for(let i = count - 576; i <= count; i++) {
      axios.all([await axios.get(`http://localhost:3001/getblock${i}`)])
      .then(axios.spread((res1) => {
      const txs1 = res1.data
      const res = [txs1];
     
      for(let j = 0; j < res.length; j++) {
       
        sum += res[j]
        
        setRessum(sum);
    } 
    }))          
    }
} 

useEffect(() => {
  txsApi()
}, []);
  
  return (
      <div text-aline="center">
    <React.Fragment>
        <Align>
      <p>
        <h1>{ressum}</h1>
      </p>
      <p>
      <a>
      Total transaction <br />
      (24 hours)
      </a>
      </p>
      </Align>
    </React.Fragment>
    </div>
    
  );
  }
