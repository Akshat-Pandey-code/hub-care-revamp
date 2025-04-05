
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Sample data
const data = [
  { name: "Jan", patients: 65 },
  { name: "Feb", patients: 59 },
  { name: "Mar", patients: 80 },
  { name: "Apr", patients: 81 },
  { name: "May", patients: 56 },
  { name: "Jun", patients: 55 },
  { name: "Jul", patients: 40 },
  { name: "Aug", patients: 70 },
  { name: "Sep", patients: 90 },
  { name: "Oct", patients: 110 },
  { name: "Nov", patients: 100 },
  { name: "Dec", patients: 95 },
];

const PatientChart = () => {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <BarChart
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
          <Bar dataKey="patients" fill="#9333ea" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PatientChart;
