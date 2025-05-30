import React from 'react';
import { Bar, Line } from 'react-chartjs-2';

interface DeepAnalysisProps {
  dimension: string;
  data: any;
  filters: {
    timePeriod?: string;
    gender?: string;
    subdistrict?: string;
  };
}

const DeepAnalysis: React.FC<DeepAnalysisProps> = ({
  dimension,
  data,
  filters
}) => {
  const renderDemographicsAnalysis = () => {
    if (!data) return null;

    return (
      <div className="space-y-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h4 className="text-xl font-semibold mb-4">Age-Gender Cross Tabulation</h4>
          <Bar
            data={{
              labels: Object.keys(data.ageGroups),
              datasets: [
                {
                  label: 'Male',
                  data: Object.keys(data.ageGroups).map(age => 
                    Math.floor(data.ageGroups[age] * 0.48) // Example calculation
                  ),
                  backgroundColor: 'rgba(54, 162, 235, 0.5)',
                  borderColor: 'rgba(54, 162, 235, 1)',
                  borderWidth: 1
                },
                {
                  label: 'Female',
                  data: Object.keys(data.ageGroups).map(age => 
                    Math.floor(data.ageGroups[age] * 0.52) // Example calculation
                  ),
                  backgroundColor: 'rgba(255, 99, 132, 0.5)',
                  borderColor: 'rgba(255, 99, 132, 1)',
                  borderWidth: 1
                }
              ]
            }}
            options={{
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: 'Population Distribution by Age and Gender'
                }
              },
              scales: {
                x: {
                  stacked: true
                },
                y: {
                  stacked: true
                }
              }
            }}
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h4 className="text-xl font-semibold mb-4">Demographic Trends</h4>
          <Line
            data={{
              labels: ['2019', '2020', '2021', '2022', '2023'],
              datasets: [
                {
                  label: 'Population Growth',
                  data: [100, 105, 110, 115, 120], // Example data
                  borderColor: 'rgba(75, 192, 192, 1)',
                  tension: 0.1
                }
              ]
            }}
            options={{
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: 'Population Growth Over Time'
                }
              }
            }}
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h4 className="text-xl font-semibold mb-4">Key Demographics Indicators</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded">
              <h5 className="font-medium text-gray-600">Dependency Ratio</h5>
              <p className="text-2xl font-bold text-blue-600">45%</p>
            </div>
            <div className="bg-gray-50 p-4 rounded">
              <h5 className="font-medium text-gray-600">Median Age</h5>
              <p className="text-2xl font-bold text-blue-600">32</p>
            </div>
            <div className="bg-gray-50 p-4 rounded">
              <h5 className="font-medium text-gray-600">Population Density</h5>
              <p className="text-2xl font-bold text-blue-600">245/km²</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderHealthAnalysis = () => {
    if (!data) return null;

    return (
      <div className="space-y-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h4 className="text-xl font-semibold mb-4">Health Conditions by Age Group</h4>
          <Bar
            data={{
              labels: Object.keys(data.ageGroups),
              datasets: [
                {
                  label: 'Diabetes',
                  data: [5, 8, 12, 15, 20], // Example data
                  backgroundColor: 'rgba(255, 99, 132, 0.5)',
                  borderColor: 'rgba(255, 99, 132, 1)',
                  borderWidth: 1
                },
                {
                  label: 'Hypertension',
                  data: [3, 7, 15, 25, 30], // Example data
                  backgroundColor: 'rgba(54, 162, 235, 0.5)',
                  borderColor: 'rgba(54, 162, 235, 1)',
                  borderWidth: 1
                }
              ]
            }}
            options={{
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: 'Prevalence of Health Conditions by Age'
                }
              }
            }}
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h4 className="text-xl font-semibold mb-4">Health Trends</h4>
          <Line
            data={{
              labels: ['2019', '2020', '2021', '2022', '2023'],
              datasets: [
                {
                  label: 'Diabetes Prevalence',
                  data: [8, 9, 10, 11, 12], // Example data
                  borderColor: 'rgba(255, 99, 132, 1)',
                  tension: 0.1
                },
                {
                  label: 'Hypertension Prevalence',
                  data: [15, 16, 17, 18, 19], // Example data
                  borderColor: 'rgba(54, 162, 235, 1)',
                  tension: 0.1
                }
              ]
            }}
            options={{
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: 'Health Condition Trends Over Time'
                }
              }
            }}
          />
        </div>
      </div>
    );
  };

  const renderAnalysis = () => {
    switch (dimension) {
      case 'demographics':
        return renderDemographicsAnalysis();
      case 'healthDomains':
        return renderHealthAnalysis();
      case 'geography':
        return (
          <div className="bg-white p-6 rounded-lg shadow">
            <h4 className="text-xl font-semibold mb-4">Geographic Analysis</h4>
            <p className="text-gray-600">Geographic analysis visualizations will be implemented here</p>
          </div>
        );
      case 'socioeconomic':
        return (
          <div className="bg-white p-6 rounded-lg shadow">
            <h4 className="text-xl font-semibold mb-4">Socioeconomic Analysis</h4>
            <p className="text-gray-600">Socioeconomic analysis visualizations will be implemented here</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {renderAnalysis()}
    </div>
  );
};

export default DeepAnalysis; 