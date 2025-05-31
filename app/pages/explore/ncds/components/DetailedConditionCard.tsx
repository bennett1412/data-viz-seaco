import React, { useMemo, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import type { DetailedConditionCardProps, GroupedChartData } from './types';

export const DetailedConditionCard: React.FC<DetailedConditionCardProps> = ({
  data,
  title,
  variables,
  colorScheme,
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

    return variables.map(group => {
      const items = group.items.map(item => {
        const yesCount = filteredData.filter(d => d[item.key] === 'Yes').length;
        const total = filteredData.length;
        return {
          name: item.label,
          value: yesCount,
          percentage: (yesCount / total) * 100,
          total
        };
      });

      return {
        groupName: group.groupName,
        items
      };
    });
  }, [data, variables, selectedDemographics]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-2 border border-gray-200 rounded shadow-sm">
          <p className="font-medium">{label}</p>
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
          <p className="text-sm text-gray-600">Detailed breakdown of {title.toLowerCase()} indicators</p>
        </div>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          {showDetails ? 'Hide Details' : 'View Details'}
        </button>
      </div>

      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData.flatMap(group => group.items)}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar
              dataKey="percentage"
              name="Percentage"
              fill={colorScheme[0]}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {showDetails && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-2">Group Details</h4>
          {chartData.map((group, groupIndex) => (
            <div key={group.groupName} className="mb-4">
              <h5 className="text-sm font-medium text-gray-700 mb-2">
                {group.groupName}
              </h5>
              <div className="grid grid-cols-1 gap-2">
                {group.items.map((item, itemIndex) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between p-2 bg-white rounded"
                  >
                    <span className="text-sm">{item.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        {item.percentage.toFixed(1)}%
                      </span>
                      <span className="text-sm text-gray-500">
                        ({item.value}/{item.total})
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 