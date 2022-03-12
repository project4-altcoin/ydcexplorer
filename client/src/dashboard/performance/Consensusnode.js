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

export default function Consensusnode() {
  
  return (
      <div text-aline="center">
    <React.Fragment>
        <Align>
      <p>
        <h1>5</h1>
      </p>
      <p>
      <a>
    Consensus <br />  
      Node
      </a>
      </p>
      </Align>
    </React.Fragment>
    </div>
    
  );
  }
