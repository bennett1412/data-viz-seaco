import React from 'react';
import { useParams } from 'react-router-dom';
import { Breadcrumb } from '../../../components/breadcrumb/Breadcrumb';

interface WealthIndexMetrics {
  averageScore: number;
  distribution: {
    [key: string]: string;
  };
  urbanRural: {
    urban: string;
    rural: string;
  };
}

interface EducationMetrics {
  literacyRate: string;
  educationLevels: {
    [key: string]: string;
  };
  genderGap: {
    male: string;
    female: string;
  };
}

interface Trend {
  year: number;
  value: number;
}

interface VariableData {
  name: string;
  description: string;
  metrics: WealthIndexMetrics | EducationMetrics;
  trends: Trend[];
}

// Sample variable data - in a real app, this would come from your data
const variableData: Record<string, VariableData> = {
  'var-201': {
    name: 'Wealth Index',
    description: 'Household wealth distribution and economic status',
    metrics: {
      averageScore: 3.2,
      distribution: {
        'Quintile 1 (Poorest)': '20%',
        'Quintile 2': '18%',
        'Quintile 3': '22%',
        'Quintile 4': '25%',
        'Quintile 5 (Richest)': '15%'
      },
      urbanRural: {
        urban: '3.8',
        rural: '2.6'
      }
    },
    trends: [
      { year: 2020, value: 2.9 },
      { year: 2021, value: 3.0 },
      { year: 2022, value: 3.2 }
    ]
  },
  'var-202': {
    name: 'Education Level',
    description: 'Educational attainment across different age groups',
    metrics: {
      literacyRate: '92%',
      educationLevels: {
        'No Formal Education': '8%',
        'Primary': '25%',
        'Secondary': '45%',
        'Tertiary': '22%'
      },
      genderGap: {
        male: '94%',
        female: '90%'
      }
    },
    trends: [
      { year: 2020, value: 90 },
      { year: 2021, value: 91 },
      { year: 2022, value: 92 }
    ]
  }
};

export default function VariableDetail() {
  const { datasetId, variableId } = useParams<{ datasetId: string; variableId: string }>();
  const variable = variableId ? variableData[variableId] : undefined;

  if (!variable) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Variable not found
        </div>
      </div>
    );
  }

  const isWealthIndex = 'averageScore' in variable.metrics;

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb 
        items={[
          { label: 'Home', path: '/' },
          { label: 'Explore', path: '/explore' },
          { label: 'Dataset ' + datasetId, path: `/explore/${datasetId}` },
          { label: 'Socioeconomic', path: `/explore/${datasetId}/socioeconomic` },
          { label: variable.name, path: `/explore/${datasetId}/socioeconomic/${variableId}` }
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
                {isWealthIndex && (
                  <div className="bg-gray-50 p-4 rounded">
                    <div className="text-sm text-gray-600">Average Score</div>
                    <div className="text-2xl font-bold">{(variable.metrics as WealthIndexMetrics).averageScore}</div>
                  </div>
                )}
                {!isWealthIndex && (
                  <div className="bg-gray-50 p-4 rounded">
                    <div className="text-sm text-gray-600">Literacy Rate</div>
                    <div className="text-2xl font-bold">{(variable.metrics as EducationMetrics).literacyRate}</div>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Distribution</h3>
              <div className="bg-gray-50 p-4 rounded">
                {isWealthIndex && Object.entries((variable.metrics as WealthIndexMetrics).distribution).map(([key, value]) => (
                  <div key={key} className="flex justify-between mb-2">
                    <span>{key}</span>
                    <span>{value}</span>
                  </div>
                ))}
                {!isWealthIndex && Object.entries((variable.metrics as EducationMetrics).educationLevels).map(([key, value]) => (
                  <div key={key} className="flex justify-between mb-2">
                    <span>{key}</span>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Trends</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {variable.trends.map((trend: Trend) => (
              <div key={trend.year} className="bg-gray-50 p-4 rounded">
                <div className="text-sm text-gray-600">{trend.year}</div>
                <div className="text-xl font-bold">{trend.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 