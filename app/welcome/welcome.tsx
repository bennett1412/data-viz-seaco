// App.jsx
import React, { useState } from 'react';
import '../app.css';
import './welcome.css'
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  ScatterChart, Scatter, AreaChart, Area, RadarChart, Radar, PolarGrid,
  Treemap, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ZAxis
} from 'recharts';


export const  Welcome = () => {
  const [selectedVisualization, setSelectedVisualization] = useState(null);
  const [ratings, setRatings] = useState({});

  const handleRating = (vizType: string, rating: number)=> {
    setRatings({
      ...ratings,
      [vizType]: rating
    });
  };

  // Visualization components
  

  return (
    <div className="App">
      <header className="App-header">
        <h1>HDSS Visualization Comparison Tool</h1>
        <p>Compare different visualization types for Health and Demographic Surveillance System data</p>
      </header>

      <div className="visualization-grid">
       
      </div>
    </div>
  );
};


