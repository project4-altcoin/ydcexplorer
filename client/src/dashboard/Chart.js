import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import { useEffect, useState } from 'react';
import axios from "axios"

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

const data = [
  createData('00:00', 0),
  createData('03:00', 300),
  createData('06:00', 600),
  createData('09:00', 800),
  createData('12:00', 1500),
  createData('15:00', 2000),
  createData('18:00', 2400),
  createData('21:00', 2400),
  createData('24:00', undefined),
];

export default function Chart() {

  const [blockData, setblockData] = useState("");
  const [blockHash, setblockHash] = useState("");
  const [blockHeight, setblockHeight] = useState("");
  const [txTime, settxTime] = useState("");
  const [txArray, settxArray] = useState("");
  const [txNum, settxNum] = useState("");

  var txHistory = async() => {
    let i = 0;
    while(i < 5){
      const response = await axios.get(`http://localhost:3001/txhistory${i}`)
      //blockData
      // setblockData(response.data.result)
      //blockHash
      // setblockHash(response.data.result.hash)
      //blockHeight
      setblockHeight(response.data.result.height)
      // transaction array
      settxArray(response.data.result.tx)
      // length of transaction array
      settxNum(response.data.result.tx.length)

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

      // txTime
      settxTime(Unix_timestamp(response.data.result.time))

      i++

    }
  }
  
  useEffect(() => {
    setTimeout(() => {
      txHistory();
    }, 3000);
  },[]);

  // console.log("blockData is what?", blockData)
  // console.log("blockHash is what?", blockHash)
  console.log("blockHeight is what?", blockHeight)
  console.log("txTime is what?", txTime)
  console.log("txArray is what?", txArray)

  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>Today</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="time"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Sales ($)
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
