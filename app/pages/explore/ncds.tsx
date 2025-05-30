import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DiseasesViz from '../../components/diseases/DiseasesViz';
import { Breadcrumb } from '../../components/breadcrumb/Breadcrumb';
import { useCSVData } from '../../hooks/useCSVData';

// Sample NCD variables - in a real app, this would come from your data
const ncdVariables = [
  { id: 'var-121', name: 'Heart Disease', description: 'Prevalence of heart disease in the population' },
  { id: 'var-122', name: 'Diabetes', description: 'Diabetes diagnosis and management' },
  { id: 'var-123', name: 'Hypertension', description: 'Blood pressure measurements and diagnosis' },
  { id: 'var-124', name: 'Asthma', description: 'Asthma prevalence and severity' },
  { id: 'var-125', name: 'Obesity', description: 'BMI and obesity rates' },
];

export default function NCDs() {
  const { datasetId } = useParams<{ datasetId: string }>();
  const navigate = useNavigate();
  const [selectedVariable, setSelectedVariable] = useState<string | null>(null);
  const { data: csvData, isLoading, error } = useCSVData('/data/demo.csv');

  const handleVariableClick = (variableId: string) => {
    navigate(`/explore/${datasetId}/ncds/${variableId}`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb 
        items={[
          { label: 'Home', path: '/' },
          { label: 'Explore', path: '/explore' },
          { label: 'Dataset ' + datasetId, path: `/explore/${datasetId}` },
          { label: 'NCDs', path: `/explore/${datasetId}/ncds` }
        ]} 
      />
      
      <div className="mt-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Non-Communicable Diseases</h1>
        
        <div className="mb-12">
          <DiseasesViz source="/data/demo.csv" />
        </div>

        {/* Variables Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {ncdVariables.map((variable) => (
            <div
              key={variable.id}
              className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleVariableClick(variable.id)}
            >
              <h3 className="text-lg font-semibold mb-2">{variable.name}</h3>
              <p className="text-gray-600 mb-4">{variable.description}</p>
              <div className="flex justify-end">
                <button 
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleVariableClick(variable.id);
                  }}
                >
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 