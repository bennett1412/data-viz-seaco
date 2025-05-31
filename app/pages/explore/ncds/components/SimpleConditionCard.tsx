import React, { useMemo, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import type { SimpleConditionCardProps, ChartData } from './types';

export const SimpleConditionCard: React.FC<SimpleConditionCardProps> = ({
  data,
  title,
  variable,
  description,
  color,
  selectedDemographics
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const chartData = useMemo(() => {
    const filteredData = data.filter(individual => {
      if (!selectedDemographics) return true;
      
      const genderMatch = !selectedDemographics.gender?.length || 
        selectedDemographics.gender.includes(individual.gender);
      const ethnicityMatch = !selectedDemographics.ethnicity?.length || 
        selectedDemographics.ethnicity.includes(individual.ethnicity);
      const ageMatch = !selectedDemographics.ageRange || 
        (parseInt(individual.age) >= selectedDemographics.ageRange[0] && 
         parseInt(individual.age) <= selectedDemographics.ageRange[1]);
      const subdistrictMatch = !selectedDemographics.subdistrict?.length || 
        selectedDemographics.subdistrict.includes(individual.subdistrict);

      return genderMatch && ethnicityMatch && ageMatch && subdistrictMatch;
    });

    const yesCount = filteredData.filter(d => d[variable] === 'Yes').length;
    const total = filteredData.length;

    return [
      {
        name: 'Yes',
        value: yesCount,
        percentage: (yesCount / total) * 100,
        total
      },
      {
        name: 'No',
        value: total - yesCount,
        percentage: ((total - yesCount) / total) * 100,
        total
      }
    ] as ChartData[];
  }, [data, variable, selectedDemographics]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-2 border border-gray-200 rounded shadow-sm">
          <p className="font-medium">{data.name}</p>
          <p>{data.value} out of {data.total} people</p>
          <p>{data.percentage.toFixed(1)}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          {showDetails ? 'Hide Details' : 'View Details'}
        </button>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === 0 ? color : '#e5e7eb'}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {showDetails && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-2">Demographic Breakdown</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Gender</p>
              {/* Add gender breakdown visualization */}
            </div>
            <div>
              <p className="text-sm font-medium">Age Groups</p>
              {/* Add age breakdown visualization */}
            </div>
            <div>
              <p className="text-sm font-medium">Ethnicity</p>
              {/* Add ethnicity breakdown visualization */}
            </div>
            <div>
              <p className="text-sm font-medium">Area Type</p>
              {/* Add area type breakdown visualization */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 