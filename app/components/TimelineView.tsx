import React, { useState, useEffect } from 'react';
import Plotly from 'plotly.js-dist-min';
import { createPlotlyComponent } from 'react-plotly.js';
import type { Dataset } from '../data/sampleDatasets';

const Plot = createPlotlyComponent(Plotly);

interface TimelineViewProps {
  datasets: Dataset[];
}

type Ethnicity = 'Malay' | 'Chinese' | 'Indian' | 'Other';

const colors: Record<Ethnicity, string> = {
  Malay: 'rgb(255,127,14)',
  Chinese: 'rgb(44,160,44)',
  Indian: 'rgb(31,119,180)',
  Other: 'rgb(148,103,189)',
};

const TimelineView: React.FC<TimelineViewProps> = ({ datasets }) => {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null);
  const [filteredDatasets, setFilteredDatasets] = useState<Dataset[]>(datasets);
  const [selectedVariables, setSelectedVariables] = useState<string[]>([]);

  // Sort datasets by year
  const sortedDatasets = [...filteredDatasets].sort((a, b) => a.year - b.year);

  // Get unique variables across all datasets
  const allVariables = Array.from(
    new Set(datasets.flatMap((dataset) => dataset.variables))
  );

  // Filter datasets based on selected variables
  useEffect(() => {
    if (selectedVariables.length === 0) {
      setFilteredDatasets(datasets);
    } else {
      setFilteredDatasets(
        datasets.filter((dataset) =>
          selectedVariables.every((variable) =>
            dataset.variables.includes(variable)
          )
        )
      );
    }
  }, [selectedVariables, datasets]);

  const handleVariableToggle = (variable: string) => {
    setSelectedVariables((prev) =>
      prev.includes(variable)
        ? prev.filter((v) => v !== variable)
        : [...prev, variable]
    );
  };

  const renderPopulationPyramid = (dataset: Dataset) => {
    const { ageGroups, maleData, femaleData } = dataset.populationData;
    const ethnicities = Object.keys(maleData) as Ethnicity[];

    const traces = ethnicities.flatMap((ethnicity) => [
      {
        x: maleData[ethnicity].map((x) => -x),
        y: ageGroups,
        name: `${ethnicity} (Male)`,
        orientation: 'h',
        type: 'bar',
        marker: { color: colors[ethnicity] },
        stackgroup: 'male',
      },
      {
        x: femaleData[ethnicity],
        y: ageGroups,
        name: `${ethnicity} (Female)`,
        orientation: 'h',
        type: 'bar',
        marker: { color: colors[ethnicity] },
        stackgroup: 'female',
      },
    ]);

    const layout = {
      title: `Population Pyramid - ${dataset.name}`,
      barmode: 'relative',
      xaxis: {
        title: 'Population',
        tickvals: [-1000, -500, 0, 500, 1000],
        ticktext: [1000, 500, 0, 500, 1000],
      },
      yaxis: {
        title: 'Age Group',
        categoryorder: 'category ascending',
      },
      legend: { traceorder: 'normal' },
      bargap: 0.05,
    };

    return <Plot data={traces} layout={layout} />;
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Variable Filter</h2>
        <div className="flex flex-wrap gap-3">
          {allVariables.map((variable) => (
            <button
              key={variable}
              onClick={() => handleVariableToggle(variable)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
                selectedVariables.includes(variable)
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {variable}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Timeline</h2>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 right-0 top-1/2 h-1 bg-gray-200 -translate-y-1/2"></div>
          
          {/* Timeline points and cards */}
          <div className="relative flex justify-between items-center py-8">
            {sortedDatasets.map((dataset, index) => (
              <div key={dataset.id} className="relative flex flex-col items-center">
                {/* Timeline point */}
                <div 
                  className={`w-4 h-4 rounded-full cursor-pointer transition-all duration-200 ${
                    selectedDataset?.id === dataset.id
                      ? 'bg-blue-600 scale-125'
                      : 'bg-gray-400 hover:bg-blue-500'
                  }`}
                  onClick={() => setSelectedDataset(dataset)}
                />
                
                {/* Year label */}
                <span className="mt-2 text-sm font-medium text-gray-600">
                  {dataset.year}
                </span>
                
                {/* Dataset card */}
                <div
                  className={`absolute top-12 left-1/2 -translate-x-1/2 w-64 p-4 rounded-lg shadow-md transition-all duration-200 cursor-pointer transform hover:scale-105 ${
                    selectedDataset?.id === dataset.id
                      ? 'bg-blue-50 border-2 border-blue-500'
                      : 'bg-white border border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => setSelectedDataset(dataset)}
                >
                  <h3 className="font-bold text-gray-800 mb-2">{dataset.name}</h3>
                  <p className="text-sm text-gray-600">
                    Variables: {dataset.variables.join(', ')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedDataset && (
        <div className="mt-12 bg-gray-50 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Dataset Details</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Metadata</h3>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <p className="mb-3">
                  <span className="font-semibold text-gray-700">Description:</span>
                  <span className="ml-2 text-gray-600">{selectedDataset.metadata.description}</span>
                </p>
                <p className="mb-3">
                  <span className="font-semibold text-gray-700">Source:</span>
                  <span className="ml-2 text-gray-600">{selectedDataset.metadata.source}</span>
                </p>
                <p>
                  <span className="font-semibold text-gray-700">Last Updated:</span>
                  <span className="ml-2 text-gray-600">{selectedDataset.metadata.lastUpdated}</span>
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Population Pyramid</h3>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="w-full h-[400px]">
                  {renderPopulationPyramid(selectedDataset)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimelineView; 