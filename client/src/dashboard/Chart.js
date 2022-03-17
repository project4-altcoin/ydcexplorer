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

// const data = [
//   createData('00:00', 0),
//   createData('03:00', 300),
//   createData('06:00', 600),
//   createData('09:00', 800),
//   createData('12:00', 1500),
//   createData('15:00', 2000),
//   createData('18:00', 2400),
//   createData('21:00', 2400),
//   createData('24:00', undefined),
// ];

export default function Chart() {

  // blockdata array
  const [TmArr, setTmArr] = useState([]); // unixtimestamp array
  const [realTmArr, setrealTmArr] = useState([]); // realtime array
  const [txLeng, settxLeng] = useState([]); // transaction num array

  var txHistory = async() => {
    let i = 1;
    while(i < 110){
      const response = await axios.get(`http://localhost:3001/txhistory${i}`)

      // unix timestamp -> real time
      function Unix_timestamp(t){
        var date = new Date(t*1000);
        var year = date.getFullYear();
        var month = "0" + (date.getMonth()+1);
        var day = "0" + date.getDate();
        var hour = "0" + date.getHours();
        var minute = "0" + date.getMinutes();
        var second = "0" + date.getSeconds();
        // return year + "-" + month.substr(-2) + "-" + day.substr(-2) + " " + hour.substr(-2) + ":" + minute.substr(-2) + ":" + second.substr(-2);
        return hour.substr(-2) + ":" + minute.substr(-2);
      }


      console.log("i : ", i)
      i++

      // blockdata in array
      setTmArr(TmArr => [...TmArr, response.data.result.time])
      setrealTmArr(realTmArr => [...realTmArr, Unix_timestamp(response.data.result.time)])
      settxLeng(txLeng => [...txLeng, response.data.result.tx.length])



    }
  }
  
  useEffect(() => {
    setTimeout(() => {
      txHistory();
    }, 5000);
  },[]);

  // console.log("txArray is  what?", txArray)
  // console.log("txNum is what?", txNum)
  
  // console.log("allData is every data of each block : ", allData)
  // console.log("TmArr is array of unixtimestamp : ", TmArr)
  // console.log("realTmArr is array of realTime : ", realTmArr)
  // console.log("txLeng is array of transaction number : ", txLeng)


  let txNumSum0 = 0;
  let txNumSum1 = 0;
  let txNumSum2 = 0;
  let txNumSum3 = 0;
  let txNumSum4 = 0;
  let txNumSum5 = 0;
  let txNumSum6 = 0;
  let txNumSum7 = 0;

  for(let i = 1; i < 110; i ++){
    if(TmArr[i] <= TmArr[8]){
      txNumSum0 += txLeng[i]
    } else if(TmArr[8] < TmArr[i] && TmArr[i] <= TmArr[18]) {
      txNumSum1 += txLeng[i]
    } else if(TmArr[18] < TmArr[i] && TmArr[i] <= TmArr[28]) {
      txNumSum2 += txLeng[i]
    } else if(TmArr[28] < TmArr[i] && TmArr[i] <= TmArr[46]) {
      txNumSum3 += txLeng[i]
    } else if(TmArr[46] < TmArr[i] && TmArr[i] <= TmArr[62]) {
      txNumSum4 += txLeng[i]
    } else if(TmArr[62] < TmArr[i] && TmArr[i] <= TmArr[78]) {
      txNumSum5 += txLeng[i]
    } else if(TmArr[78] < TmArr[i] && TmArr[i] <= TmArr[90]) {
      txNumSum6 += txLeng[i]
    } else if(TmArr[90] < TmArr[i] && TmArr[i] <= TmArr[100]) {
      txNumSum7 += txLeng[i]
    }
  }

  // console.log("==============txNum0===========", txNumSum0)
  // console.log("==============txNum1===========", txNumSum1)
  // console.log("==============txNum2===========", txNumSum2)
  // console.log("==============txNum3===========", txNumSum3)
  // console.log("==============txNum4===========", txNumSum4)
  // console.log("==============txNum5===========", txNumSum5)
  // console.log("==============txNum6===========", txNumSum6)
  // console.log("==============txNum7===========", txNumSum7)

  const data = [
    createData(realTmArr[0], txNumSum0),
    createData(realTmArr[8], txNumSum1),
    createData(realTmArr[18], txNumSum2),
    createData(realTmArr[28], txNumSum3),
    createData(realTmArr[46], txNumSum4),
    createData(realTmArr[62], txNumSum5),
    createData(realTmArr[78], txNumSum6),
    createData(realTmArr[90], txNumSum7)
  ];


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
