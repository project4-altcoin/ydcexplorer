import React from "react";
import TableCell from '@mui/material/TableCell';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Time() {
  const [time, setTime] = useState();

  var callApi = async () => {
    const response = await axios.get("http://localhost:3001/gettime");
    const { success, data, id, error } = response.data;
    const result = data.result;
    const time = result.time;
    setTime(time);
  };

  useEffect(() => {
    callApi();
  }, []);

  return (
    <React.Fragment>
      <TableCell>{time}</TableCell>
    </React.Fragment>
  );
}