import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import type { ChartConfiguration } from "chart.js/auto";
import "./ChartJsPyramid.css";

// interface DatasetType {
//   label: string;
//   data: number[];
//   backgroundColor: string[];
//   borderColor: string[];
//   borderWidth: number;
//   xAxisID?: string; // Optional property to allow xAxisID
// }

// interface ChartDataType {
//   labels: string[];
//   datasets: DatasetType[];
// }

const ChartJsPyramid: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Data setup
    const data = {
      labels: ["55+", "45-54", "35-44", "25-34", "15-24", "5-14", "0-4"],
      datasets: [
        {
          label: "Male",
          data: [1, 5, 10, 15, 20, 25, 30],
          backgroundColor: ["rgb(26, 118, 255)"],
          borderColor: ["rgb(26, 118, 255)"],
          borderWidth: 1,
        //   borderSkipped: false,
        borderRadius: 10,
        },
        {
          label: "Female",
          data: [1, 5, 10, 15, 20, 25, 30],
          backgroundColor: ["rgba(255, 26, 104, 1)"],
          borderColor: ["rgba(255, 26, 104, 1)"],
          borderWidth: 1,
          xAxisID: "female",
          borderRadius: 10,
        //   borderSkipped: false,
        },
      ],
    };

    // Config
    const config: ChartConfiguration = {
      type: "bar",
      data: data,
      options: {
        indexAxis: "y",
        scales: {
          x: {
            beginAtZero: true,
            stack: '1',
            reverse: true, // Reverse the x-axis for the pyramid effect
          },
          female: {
            beginAtZero: true,
            stack: '1'  
          },
          y: {
            stacked: true,
            beginAtZero: true,
          },
        },
      },
    };

    // Create the chart
    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    const myChart = new Chart(ctx, config);

    // Cleanup
    return () => {
      myChart.destroy();
    };
  }, []);

  return (
    <>
      <canvas ref={chartRef}></canvas>
    </>
  );
};

export default ChartJsPyramid;
