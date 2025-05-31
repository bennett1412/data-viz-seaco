import React, { useEffect, useState } from "react";
import { useCSVData } from '../../hooks/useCSVData';
import type { Individual } from "~/types/SeacoTypes";
import Plot from 'react-plotly.js';

interface PlotlyPyramidProps {
  source: string;
}

type Ethnicity = 'Malay' | 'Chinese' | 'Indian' | 'Other';

const PlotlyPyramid: React.FC<PlotlyPyramidProps> = ({ source }) => {
  const { data: rawData, isLoading, error } = useCSVData(source);
  const [plotData, setPlotData] = useState<any[]>([]);
  const [layout, setLayout] = useState<any>({});

  useEffect(() => {
    if (!rawData.length) return;

    const ageGroups = ["0-4", "5-14", "15-24", "25-34", "35-44", "45-54", "55+"];
    const ethnicities: Ethnicity[] = ["Malay", "Chinese", "Indian", "Other"];
    const colors: Record<Ethnicity, string> = {
      Malay: 'rgba(255, 127, 14, 0.8)',
      Chinese: 'rgba(44, 160, 44, 0.8)',
      Indian: 'rgba(31, 119, 180, 0.8)',
      Other: 'rgba(148, 103, 189, 0.8)'
    };

    // Initialize data structures
    const maleData: Record<Ethnicity, number[]> = {
      Malay: new Array(ageGroups.length).fill(0),
      Chinese: new Array(ageGroups.length).fill(0),
      Indian: new Array(ageGroups.length).fill(0),
      Other: new Array(ageGroups.length).fill(0)
    };
    const femaleData: Record<Ethnicity, number[]> = {
      Malay: new Array(ageGroups.length).fill(0),
      Chinese: new Array(ageGroups.length).fill(0),
      Indian: new Array(ageGroups.length).fill(0),
      Other: new Array(ageGroups.length).fill(0)
    };

    // Process the data
    rawData.forEach((individual: Individual) => {
      const age = Number(individual.age);
      const gender = individual.gender;
      const ethnicity = (individual.ethnicity || "Other") as Ethnicity;
      let ageIndex = -1;

      if (age <= 4) ageIndex = 0;
      else if (age <= 14) ageIndex = 1;
      else if (age <= 24) ageIndex = 2;
      else if (age <= 34) ageIndex = 3;
      else if (age <= 44) ageIndex = 4;
      else if (age <= 54) ageIndex = 5;
      else ageIndex = 6;

      if (gender === "M") {
        maleData[ethnicity][ageIndex]++;
      } else if (gender === "F") {
        femaleData[ethnicity][ageIndex]++;
      }
    });

    // Create traces for Plotly
    const traces = ethnicities.flatMap(ethnicity => [
      {
        x: maleData[ethnicity].map(x => -x), // negative for left side
        y: ageGroups,
        name: `${ethnicity} (Male)`,
        orientation: 'h',
        type: 'bar',
        marker: { 
          color: colors[ethnicity],
          line: {
            color: 'rgba(0, 0, 0, 0.1)',
            width: 1
          }
        },
        stackgroup: 'male',
        hovertemplate: '%{x}<br>%{y}<br>%{fullData.name}<extra></extra>'
      },
      {
        x: femaleData[ethnicity],
        y: ageGroups,
        name: `${ethnicity} (Female)`,
        orientation: 'h',
        type: 'bar',
        marker: { 
          color: colors[ethnicity],
          line: {
            color: 'rgba(0, 0, 0, 0.1)',
            width: 1
          }
        },
        stackgroup: 'female',
        hovertemplate: '%{x}<br>%{y}<br>%{fullData.name}<extra></extra>'
      }
    ]);

    setPlotData(traces);
    setLayout({
      title: {
        text: 'Population Pyramid by Ethnicity',
        font: {
          size: 20,
          color: '#2c3e50'
        },
        y: 0.95
      },
      barmode: 'relative',
      xaxis: {
        title: {
          text: 'Population',
          font: {
            size: 14,
            color: '#2c3e50'
          }
        },
        tickvals: [-1000, -500, 0, 500, 1000],
        ticktext: [1000, 500, 0, 500, 1000],
        gridcolor: 'rgba(0, 0, 0, 0.1)',
        zerolinecolor: 'rgba(0, 0, 0, 0.2)',
        zerolinewidth: 2
      },
      yaxis: {
        title: {
          text: 'Age Group',
          font: {
            size: 14,
            color: '#2c3e50'
          }
        },
        categoryorder: 'category ascending',
        gridcolor: 'rgba(0, 0, 0, 0.1)'
      },
      legend: {
        traceorder: 'normal',
        orientation: 'h',
        y: -0.25,
        x: 0.5,
        xanchor: 'center',
        yanchor: 'top',
        font: {
          size: 12,
          color: '#2c3e50'
        }
      },
      bargap: 0.1,
      bargroupgap: 0.1,
      height: 400,
      width: 480,
      margin: { t: 50, b: 80, l: 50, r: 50 },
      paper_bgcolor: 'rgba(0,0,0,0)',
      plot_bgcolor: 'rgba(0,0,0,0)',
      showlegend: true,
      hovermode: 'closest'
    });
  }, [rawData]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Plot
        data={plotData}
        layout={layout}
        config={{ 
          responsive: true,
          displayModeBar: false
        }}
        style={{ width: '100%', height: '100%', maxWidth: '480px' }}
      />
    </div>
  );
};

export default PlotlyPyramid; 