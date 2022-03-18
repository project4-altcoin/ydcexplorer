import * as React from 'react';
import Link from '@mui/material/Link';
import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Title from './Title';
import axios from 'axios';

function preventDefault(event) {
  event.preventDefault();
}

export default function Blockheight() {
  const [inputData, setInputData] = useState([])

  var callApi = async() => {
    const response = axios.get("http://localhost:3001/getblockcount")
    setInputData((await response).data)
  }
  
  useEffect(() => {
    callApi();
  },[]);
  
  //console.log(inputData)

  return (
    <React.Fragment>
      <Title>Block Height</Title>
      <Typography mt="40px" component="p" variant="h4">
        <img style={{ width : "40px", height : "40px", position: "relative", top : "10px"}} src='/img/yordle.png'></img>#{inputData}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        yordles created
      </Typography>
      {/* <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div> */}
    </React.Fragment>
  );
}
