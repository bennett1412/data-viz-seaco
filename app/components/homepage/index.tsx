import React from "react";
import PopulationPyramid from "./PopulationPyramid";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  ZAxis,
  Scatter,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  Radar,
} from "recharts";
import { hdssData } from "./hdssData";
import ChartJsPyramid from "./ChartJsPyramid";

const Home = () => {
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884d8",
    "#82ca9d",
  ];
  const visualizations = [
    {
      id: "barChart",
      name: "Bar Chart",
      description: "Comparing population across villages",
      component: (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={hdssData.demographics}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="population" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      ),
    },
    {
      id: "lineChart",
      name: "Line Chart",
      description: "Trends in births and deaths over time",
      component: (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={hdssData.timeSeriesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="births"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="deaths" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      ),
    },
    {
      id: "pieChart",
      name: "Pie Chart",
      description: "Age distribution in the population",
      component: (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={hdssData.ageDistribution}
              cx="50%"
              cy="50%"
              labelLine={true}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, value }) => `${name}: ${value}%`}
            >
              {hdssData.ageDistribution.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      ),
    },
    {
      id: "scatterChart",
      name: "Scatter Chart",
      description: "Birth rate vs. death rate by village size",
      component: (
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid />
            <XAxis
              type="number"
              dataKey="birthRate"
              name="Birth Rate"
              unit="%"
            />
            <YAxis
              type="number"
              dataKey="deathRate"
              name="Death Rate"
              unit="%"
            />
            <ZAxis
              type="number"
              dataKey="population"
              range={[50, 400]}
              name="Population"
            />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Legend />
            <Scatter
              name="Villages"
              data={hdssData.demographics}
              fill="#8884d8"
            />
          </ScatterChart>
        </ResponsiveContainer>
      ),
    },
    {
      id: "areaChart",
      name: "Area Chart",
      description: "Population movement: births, deaths, and migration",
      component: (
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={hdssData.timeSeriesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="births"
              stackId="1"
              stroke="#8884d8"
              fill="#8884d8"
            />
            <Area
              type="monotone"
              dataKey="deaths"
              stackId="1"
              stroke="#82ca9d"
              fill="#82ca9d"
            />
            <Area
              type="monotone"
              dataKey="migration"
              stackId="1"
              stroke="#ffc658"
              fill="#ffc658"
            />
          </AreaChart>
        </ResponsiveContainer>
      ),
    },
    {
      id: "radarChart",
      name: "Radar Chart",
      description: "Health indicators across villages",
      component: (
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart outerRadius={90} data={hdssData.healthIndicators}>
            <PolarGrid />
            <Tooltip />
            <Legend />
            <Radar
              name="Immunization Rate"
              dataKey="immunizationRate"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.6}
            />
            <Radar
              name="Access to Water"
              dataKey="accessToWater"
              stroke="#82ca9d"
              fill="#82ca9d"
              fillOpacity={0.6}
            />
            <Radar
              name="Malnutrition"
              dataKey="malnutrition"
              stroke="#ff8042"
              fill="#ff8042"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
      ),
    },
  ];
  return (
    <div className="dashboard">
      <header className="header">
        <h1>SEACO Data Visualization Dashboard</h1>
      </header>
      <main className="main">
        <section className="pyramid-section">
          {/* <PopulationPyramid /> */}
          <ChartJsPyramid />
        </section>
        <section className="other-section">
          {visualizations.map((viz) => (
            <div key={viz.id} className="card">
              <h2>{viz.name}</h2>
              <p>{viz.description}</p>
              <div className="chart-container">{viz.component}</div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Home;
