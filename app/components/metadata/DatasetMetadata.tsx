import React from 'react';
import { useNavigate } from 'react-router-dom';
import PlotlyPyramid from '../homepage/PlotlyPyramid';

interface DatasetMetadataProps {
  source: string;
  totalParticipants: number;
  collectionDate: string;
  description: string;
  categories: string[];
  methodology: string;
}

const DatasetMetadata: React.FC<DatasetMetadataProps> = ({
  source,
  totalParticipants,
  collectionDate,
  description,
  categories,
  methodology
}) => {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate(`/explore/${source.toLowerCase().replace(/\s+/g, '-')}`);
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
            <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Dataset Information</h2>
        </div>
        <button
          onClick={handleExplore}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
        >
          <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          Explore Dataset
        </button>
      </div>
      
      <div className="space-y-6">
        {/* Basic Information and Population Pyramid */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-700 flex items-center">
            <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Basic Information
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium w-40 text-gray-600">Source:</span>
                <span className="text-gray-800 font-medium">{source}</span>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium w-40 text-gray-600">Total Participants:</span>
                <span className="text-gray-800 font-medium">{totalParticipants.toLocaleString()}</span>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium w-40 text-gray-600">Collection Date:</span>
                <span className="text-gray-800 font-medium">{new Date(collectionDate).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium w-40 text-gray-600">Categories:</span>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-3 text-gray-700">Population Pyramid</h4>
              <div className="w-full h-[400px] bg-white rounded-lg shadow-sm explore-page-chart">
                <PlotlyPyramid source="/data/demo.csv" />
              </div>
            </div>
          </div>
        </div>

        {/* Description and Methodology */}
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold mb-3 text-gray-700 flex items-center">
              <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
              Description
            </h3>
            <p className="text-gray-600 leading-relaxed">{description}</p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-3 text-gray-700 flex items-center">
              <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Methodology
            </h3>
            <p className="text-gray-600 leading-relaxed">{methodology}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatasetMetadata; 