import React from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

interface DimensionVisualizationsProps {
  dimension: string;
  data: any;
  filters: {
    timePeriod?: string;
    gender?: string;
    subdistrict?: string;
  };
}

const DimensionVisualizations: React.FC<DimensionVisualizationsProps> = ({
  dimension,
  data,
  filters
}) => {
  const renderDemographicsVisualizations = () => {
    if (!data) return null;

    return (
      <div className="space-y-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="text-lg font-semibold mb-4">Age Distribution</h4>
          <Bar
            data={{
              labels: Object.keys(data.ageGroups),
              datasets: [{
                label: 'Population',
                data: Object.values(data.ageGroups),
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
              }]
            }}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false
                },
                title: {
                  display: true,
                  text: 'Population by Age Group'
                }
              }
            }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="text-lg font-semibold mb-4">Gender Distribution</h4>
            <Pie
              data={{
                labels: ['Female', 'Male'],
                datasets: [{
                  data: [data.genderCount.F, data.genderCount.M],
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)'
                  ],
                  borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)'
                  ],
                  borderWidth: 1
                }]
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'bottom'
                  }
                }
              }}
            />
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="text-lg font-semibold mb-4">Ethnicity Distribution</h4>
            <Bar
              data={{
                labels: Object.keys(data.ethnicityCount),
                datasets: [{
                  label: 'Population',
                  data: Object.values(data.ethnicityCount),
                  backgroundColor: 'rgba(75, 192, 192, 0.5)',
                  borderColor: 'rgba(75, 192, 192, 1)',
                  borderWidth: 1
                }]
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    display: false
                  }
                }
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  const renderHealthVisualizations = () => {
    if (!data) return null;

    return (
      <div className="space-y-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="text-lg font-semibold mb-4">Health Conditions Overview</h4>
          <Bar
            data={{
              labels: Object.keys(data.healthConditions).map(key => 
                key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
              ),
              datasets: [{
                label: 'Number of Cases',
                data: Object.values(data.healthConditions),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
              }]
            }}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false
                }
              }
            }}
          />
        </div>
      </div>
    );
  };

  const renderGeographyVisualizations = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="text-lg font-semibold mb-4">Geographic Distribution</h4>
          <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
            <p className="text-gray-500">Map visualization will be implemented here</p>
          </div>
        </div>
      </div>
    );
  };

  const renderSocioeconomicVisualizations = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="text-lg font-semibold mb-4">Wealth Distribution</h4>
          <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
            <p className="text-gray-500">Wealth distribution visualization will be implemented here</p>
          </div>
        </div>
      </div>
    );
  };

  const renderVisualizations = () => {
    switch (dimension) {
      case 'demographics':
        return renderDemographicsVisualizations();
      case 'healthDomains':
        return renderHealthVisualizations();
      case 'geography':
        return renderGeographyVisualizations();
      case 'socioeconomic':
        return renderSocioeconomicVisualizations();
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {renderVisualizations()}
    </div>
  );
};

export default DimensionVisualizations; 