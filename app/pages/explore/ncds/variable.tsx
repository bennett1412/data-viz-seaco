import React from 'react';
import { useParams } from 'react-router-dom';
import { Breadcrumb } from '../../../components/breadcrumb/Breadcrumb';

// Sample variable data - in a real app, this would come from your data
const variableData = {
  'var-121': {
    name: 'Heart Disease',
    description: 'Prevalence of heart disease in the population',
    metrics: {
      totalCases: 450,
      prevalence: '12.5%',
      genderDistribution: {
        male: '55%',
        female: '45%'
      },
      ageGroups: {
        '0-18': '2%',
        '19-30': '5%',
        '31-50': '25%',
        '51-70': '45%',
        '70+': '23%'
      }
    },
    trends: [
      { year: 2020, value: 10.2 },
      { year: 2021, value: 11.5 },
      { year: 2022, value: 12.5 }
    ]
  }
};

export default function VariableDetail() {
  const { datasetId, variableId } = useParams<{ datasetId: string; variableId: string }>();
  const variable = variableData[variableId as keyof typeof variableData];

  if (!variable) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Variable not found
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb 
        items={[
          { label: 'Home', path: '/' },
          { label: 'Explore', path: '/explore' },
          { label: 'Dataset ' + datasetId, path: `/explore/${datasetId}` },
          { label: 'NCDs', path: `/explore/${datasetId}/ncds` },
          { label: variable.name, path: `/explore/${datasetId}/ncds/${variableId}` }
        ]} 
      />
      
      <div className="mt-8">
        <h1 className="text-3xl font-bold mb-6">{variable.name}</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Overview</h2>
          <p className="text-gray-600 mb-6">{variable.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Key Metrics</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded">
                  <div className="text-sm text-gray-600">Total Cases</div>
                  <div className="text-2xl font-bold">{variable.metrics.totalCases}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded">
                  <div className="text-sm text-gray-600">Prevalence</div>
                  <div className="text-2xl font-bold">{variable.metrics.prevalence}</div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Gender Distribution</h3>
              <div className="bg-gray-50 p-4 rounded">
                <div className="flex justify-between mb-2">
                  <span>Male</span>
                  <span>{variable.metrics.genderDistribution.male}</span>
                </div>
                <div className="flex justify-between">
                  <span>Female</span>
                  <span>{variable.metrics.genderDistribution.female}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Age Distribution</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(variable.metrics.ageGroups).map(([ageGroup, percentage]) => (
              <div key={ageGroup} className="bg-gray-50 p-4 rounded">
                <div className="text-sm text-gray-600">{ageGroup}</div>
                <div className="text-xl font-bold">{percentage}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 