
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Jan',
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Feb',
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Mar',
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'April',
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'May',
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'June',
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'July',
    pv: 4300,
    amt: 2100,
  },
];
const LineCustomChart = () => {
  return (
    <div style={{width: "100%",height: 300}}>
      <h2 style={{marginBottom: "2%"}}>Product Sell Rates Per Daily</h2>
       <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="pv" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
    </div>
   
  );
}
  


export default LineCustomChart