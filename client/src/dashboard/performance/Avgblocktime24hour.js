import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from '../Title';
import styled from "styled-components"


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

export default function Avgblocktime24hour() {
  
  return (
      <div text-aline="center">
    <React.Fragment>
        <Align>
      <p>
        <h1>2.5 min</h1>
      </p>
      <p>
      <a>
      Avg Block Time <br />  
      (24 hour)
      </a>
      </p>
      </Align>
    </React.Fragment>
    </div>
    
  );
  }
