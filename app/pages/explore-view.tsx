import React, { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Dataset } from '../data/sampleDatasets';
import { sampleDatasets } from '../data/sampleDatasets';
import { useCSVData } from '../hooks/useCSVData';
import { Breadcrumb } from '../components/breadcrumb/Breadcrumb';
import ChartJsPyramid from '../components/homepage/ChartJsPyramid';
import { Map } from '../components/map/Map';
import DiseasesViz from '../components/diseases/DiseasesViz';

// Navigation structure
const navigationStructure = {
  demographics: {
    title: 'Demographics',
    children: ['ageDistribution', 'genderDistribution', 'ethnicity', 'education', 'employment', 'geographicDistribution']
  },
  geography: {
    title: 'Geography',
    children: ['subdistrictOverview', 'populationDensity', 'urbanRural', 'migrationPatterns']
  }
};

// Add socioeconomic variables at the top of the file
const socioeconomicVariables = [
  { 
    id: 'var-201', 
    name: 'Wealth Index', 
    description: 'Household wealth distribution and economic status',
    icon: '💰'
  },
  { 
    id: 'var-202', 
    name: 'Education Level', 
    description: 'Educational attainment across different age groups',
    icon: '🎓'
  },
  { 
    id: 'var-203', 
    name: 'Employment Status', 
    description: 'Employment rates and occupational distribution',
    icon: '💼'
  },
  { 
    id: 'var-204', 
    name: 'Housing Conditions', 
    description: 'Housing quality and infrastructure access',
    icon: '🏠'
  },
  { 
    id: 'var-205', 
    name: 'Access to Services', 
    description: 'Access to healthcare, education, and other services',
    icon: '🏥'
  }
];

const ExploreView: React.FC = () => {
  const { datasetId } = useParams<{ datasetId: string }>();
  const navigate = useNavigate();
  const dataset = sampleDatasets.find(d => d.id === datasetId);
  const { data: csvData, isLoading, error } = useCSVData('/data/demo.csv');
  
  // State for navigation and progressive disclosure
  const [currentPath, setCurrentPath] = useState<string[]>(['demographics']);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [detailLevel, setDetailLevel] = useState<number>(1);

  // Calculate median age
  const medianAge = useMemo(() => {
    if (!csvData.length) return 0;
    const ages = csvData.map(d => parseInt(d.age)).sort((a, b) => a - b);
    const mid = Math.floor(ages.length / 2);
    return ages.length % 2 === 0 
      ? (ages[mid - 1] + ages[mid]) / 2 
      : ages[mid];
  }, [csvData]);

  // Process data for visualizations
  const demographicData = useMemo(() => {
    if (!csvData.length) return null;

    // Age distribution
    const ageGroups = {
      '0-18': 0,
      '19-30': 0,
      '31-50': 0,
      '51-70': 0,
      '70+': 0
    };

    // Gender distribution
    const genderCount = {
      M: 0,
      F: 0
    };

    // Ethnicity distribution
    const ethnicityCount: Record<string, number> = {};

    // Geographic distribution with sample data
    const geographicData = {
      subdistricts: new Set<string>([
        'Subang Jaya',
        'Petaling Jaya',
        'Shah Alam',
        'Klang',
        'Ampang',
        'Cheras'
      ]),
      urbanCount: 0,
      ruralCount: 0
    };

    // Add sample data for each district
    const sampleData = [
      { district: 'Subang Jaya', population: 850, urban: 800, rural: 50 },
      { district: 'Petaling Jaya', population: 720, urban: 700, rural: 20 },
      { district: 'Shah Alam', population: 650, urban: 600, rural: 50 },
      { district: 'Klang', population: 580, urban: 500, rural: 80 },
      { district: 'Ampang', population: 420, urban: 380, rural: 40 },
      { district: 'Cheras', population: 680, urban: 650, rural: 30 }
    ];

    csvData.forEach(record => {
      // Age distribution
      const age = parseInt(record.age);
      if (age <= 18) ageGroups['0-18']++;
      else if (age <= 30) ageGroups['19-30']++;
      else if (age <= 50) ageGroups['31-50']++;
      else if (age <= 70) ageGroups['51-70']++;
      else ageGroups['70+']++;

      // Gender distribution
      genderCount[record.gender]++;

      // Ethnicity distribution
      const ethnicity = record.ethnicity;
      ethnicityCount[ethnicity] = (ethnicityCount[ethnicity] || 0) + 1;

      // Geographic data
      if (record.subdistrict) {
        geographicData.subdistricts.add(record.subdistrict);
      }
      if (record.area_type === 'Urban') {
        geographicData.urbanCount++;
      } else if (record.area_type === 'Rural') {
        geographicData.ruralCount++;
      }
    });

    return {
      ageGroups,
      genderCount,
      ethnicityCount,
      geographicData,
      totalPopulation: csvData.length,
      districtData: sampleData
    };
  }, [csvData]);

  // Level 1 - Overview Card Component
  const OverviewCard = ({ title, dimension, onClick }: { 
    title: string;
    dimension: string;
    onClick: () => void 
  }) => {
    const getDimensionStats = () => {
      switch (dimension) {
        case 'demographics':
          return {
            icon: '👥',
            description: 'Population characteristics and distribution',
            metrics: [
              { label: 'Age Groups', value: '5' },
              { label: 'Gender Split', value: `${demographicData?.genderCount.F || 0}% F, ${demographicData?.genderCount.M || 0}% M` }
            ]
          };
        case 'geography':
          return {
            icon: '🗺️',
            description: 'Geographic distribution and patterns',
            metrics: [
              { label: 'Subdistricts', value: '12' },
              { label: 'Urban/Rural', value: '65% Urban' }
            ]
          };
        default:
          return {
            icon: '📊',
            description: 'Data overview',
            metrics: []
          };
      }
    };

    const stats = getDimensionStats();

    return (
      <div 
        className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow border border-gray-100"
        onClick={onClick}
      >
        <div className="flex items-center mb-4">
          <span className="text-3xl mr-3">{stats.icon}</span>
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
        
        <p className="text-gray-600 mb-4">{stats.description}</p>
        
        <div className="space-y-3">
          {stats.metrics.map((metric, index) => (
            <div key={index} className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded">
              <span className="text-gray-600">{metric.label}</span>
              <span className="font-medium text-gray-800">{metric.value}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <button 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            Explore Details →
          </button>
        </div>
      </div>
    );
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb 
        items={[
          { label: 'Home', path: '/' },
          { label: 'Explore', path: '/explore' },
          { label: 'Dataset ' + datasetId, path: `/explore/${datasetId}` }
        ]} 
      />
      
      <div className="mt-8">
        <h1 className="text-3xl font-bold mb-6">Dataset Overview</h1>
        
        {/* Main Visualizations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Population Pyramid */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Population Distribution</h2>
            
            {/* Statistics Section */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-blue-800 mb-1">Total Population</h3>
                <p className="text-2xl font-bold text-blue-900">{demographicData?.totalPopulation || 0}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-green-800 mb-1">Median Age</h3>
                <p className="text-2xl font-bold text-green-900">{medianAge}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-purple-800 mb-1">Gender Ratio</h3>
                <p className="text-2xl font-bold text-purple-900">
                  {demographicData ? 
                    `${((demographicData.genderCount.F / demographicData.totalPopulation) * 100).toFixed(1)}% Female` 
                    : '0%'}
                </p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-orange-800 mb-1">Urban Population</h3>
                <p className="text-2xl font-bold text-orange-900">
                  {demographicData ? 
                    `${((demographicData.geographicData.urbanCount / demographicData.totalPopulation) * 100).toFixed(1)}%` 
                    : '0%'}
                </p>
              </div>
            </div>

            <div className="h-[500px]">
              <ChartJsPyramid source="/data/demo.csv" />
            </div>
          </div>

          {/* Geographic Map */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Geographic Distribution</h2>
            
            {/* District Statistics */}
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Population by District</h3>
              <div className="grid grid-cols-2 gap-2">
                {demographicData?.districtData.map((district) => (
                  <div key={district.district} className="bg-gray-50 p-2 rounded flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">{district.district}</span>
                    <div className="text-right">
                      <span className="text-sm font-bold text-gray-900">{district.population}</span>
                      <span className="text-xs text-gray-500 ml-1">
                        ({((district.population / demographicData.totalPopulation) * 100).toFixed(1)}%)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-[500px]">
              <Map 
                data={csvData}
                highlightedAreas={Array.from(demographicData?.geographicData.subdistricts || [])}
              />
            </div>
          </div>
        </div>

        {/* Additional Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div 
            className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate(`/explore/${datasetId}/ncds`)}
          >
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Non-Communicable Diseases</h2>
            </div>

            {/* Overview Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded">
                <div className="text-sm text-gray-600">Diabetes Prevalence</div>
                <div className="text-2xl font-bold">12.5%</div>
                <div className="text-sm text-gray-500">of population</div>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <div className="text-sm text-gray-600">Hypertension</div>
                <div className="text-2xl font-bold">18.2%</div>
                <div className="text-sm text-gray-500">of population</div>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <div className="text-sm text-gray-600">Cardiovascular</div>
                <div className="text-2xl font-bold">8.7%</div>
                <div className="text-sm text-gray-500">of population</div>
              </div>
            </div>

            {/* Disease Distribution Chart */}
            <div className="mb-12">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Disease Distribution Across Ethnicities</h3>
              <div style={{ height: '300px' }}>
                <DiseasesViz source="/data/demo.csv" />
              </div>
            </div>

            <div className="flex justify-end mt-12">
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/explore/${datasetId}/ncds`);
                }}
              >
                View NCDs →
              </button>
            </div>
          </div>

          {/* Socioeconomic Indicators Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-6">
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Socioeconomic Indicators</h2>
            </div>

            {/* Overview Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded">
                <div className="text-sm text-gray-600">Average Wealth Index</div>
                <div className="text-2xl font-bold">3.2</div>
                <div className="text-sm text-gray-500">out of 5</div>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <div className="text-sm text-gray-600">Education Rate</div>
                <div className="text-2xl font-bold">78%</div>
                <div className="text-sm text-gray-500">of population</div>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <div className="text-sm text-gray-600">Employment Rate</div>
                <div className="text-2xl font-bold">65%</div>
                <div className="text-sm text-gray-500">of working age</div>
              </div>
            </div>

            {/* Variables Grid */}
            <div className="grid grid-cols-1 gap-4">
              {socioeconomicVariables.map((variable) => (
                <div
                  key={variable.id}
                  className="bg-gray-50 p-4 rounded cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => navigate(`/explore/${datasetId}/socioeconomic/${variable.id}`)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{variable.icon}</span>
                      <div>
                        <h3 className="font-semibold">{variable.name}</h3>
                        <p className="text-sm text-gray-600">{variable.description}</p>
                      </div>
                    </div>
                    <button 
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/explore/${datasetId}/socioeconomic/${variable.id}`);
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
      </div>
    </div>
  );
};

export default ExploreView; 