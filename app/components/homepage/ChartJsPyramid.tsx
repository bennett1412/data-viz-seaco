import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { useCSVData } from '../../hooks/useCSVData';
import type { Individual } from "~/types/SeacoTypes";

interface ChartJsPyramidProps {
  source: string;
}

const ChartJsPyramid: React.FC<ChartJsPyramidProps> = ({ source }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);
  const { data: rawData, isLoading, error } = useCSVData(source);
  
  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: { label: string; data: number[]; backgroundColor: string }[];
  }>({
    labels: ["55+", "45-54", "35-44", "25-34", "15-24", "5-14", "0-4"],
    datasets: [
      { label: "Male", data: [], backgroundColor: "blue"  },
      { label: "Female", data: [], backgroundColor: "pink", xAxisID: "female" },
    ],
  });


  useEffect(() => {
    if (!rawData.length) return;

    const ageRanges = ["55+", "45-54", "35-44", "25-34", "15-24", "5-14", "0-4"];
    const maleData = new Array(ageRanges.length).fill(0);
    const femaleData = new Array(ageRanges.length).fill(0);

    rawData.forEach((individual) => {
      const age = Number(individual.age);
      const gender = individual.gender;
      let ageIndex = -1;

      if (age >= 55) ageIndex = 0;
      else if (age >= 45) ageIndex = 1;
      else if (age >= 35) ageIndex = 2;
      else if (age >= 25) ageIndex = 3;
      else if (age >= 15) ageIndex = 4;
      else if (age >= 5) ageIndex = 5;
      else ageIndex = 6;

      if (gender === "M") {
        maleData[ageIndex] += 1;
      } else if (gender === "F") {
        femaleData[ageIndex] += 1;
      }
    });

    setChartData(prev => ({
      ...prev,
      datasets: [
        { ...prev.datasets[0], data: maleData },
        { ...prev.datasets[1], data: femaleData },
      ],
    }));
  }, [rawData]);

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: "bar",
      data: chartData,
      options: {
        indexAxis: "y",
        scales: {
          x: {
            beginAtZero: true,
            stack: "1",
            reverse: true,
          },
          female: {
            beginAtZero: true,
            stack: "1",
          },
          y: {
            stacked: true,
            beginAtZero: true,
          },
        },
      },
    });    

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [chartData]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <canvas ref={chartRef}></canvas>;
};

export default ChartJsPyramid;