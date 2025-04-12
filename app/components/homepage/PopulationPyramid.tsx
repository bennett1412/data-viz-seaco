import React from "react";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import './styles.css'
const PopulationPyramid = () => {
  const data = [
    { name: "0-10", male: -400, female: 450 },
    { name: "11-20", male: -300, female: 350 },
    { name: "21-30", male: -200, female: 300 },
    { name: "31-40", male: -150, female: 200 },
    { name: "41-50", male: -100, female: 150 },
    { name: "51-60", male: -50, female: 100 },
  ];

  return (
    <div className="visualization-grid">
      <div key={"demo-viz"} className="visualization-card">
        <h2>Demographic Visualisation</h2>

        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              layout="vertical"
              width={500}
              height={400}
              data={data}
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis
                type="number"
                domain={[-500, 500]} // Adjust domain based on your data
                tickFormatter={(value) => Math.abs(value)} // Show positive values on both sides
              />
              <YAxis
                dataKey="name"
                type="category"
                scale="band"
                axisLine={false} // Remove the default Y-axis line
                tick={{ dx: -10 }} // Adjust tick position for better alignment
              />
              <Tooltip
                formatter={(value) => Math.abs(value)} // Show positive values in the tooltip
              />
              <Legend />
              <Bar dataKey="male" barSize={20} fill="#413ea0" />
              <Bar dataKey="female" barSize={20} fill="#ff7300" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default PopulationPyramid;
