import React, { type JSX } from "react";
import VisualisationStart from "./VisualisationStart";
import DatasetMetadata from "../metadata/DatasetMetadata";

export type DataSource = {
  name: string;
  file: string;
  metadata?: {
    totalParticipants: number;
    collectionDate: string;
    description: string;
    categories: string[];
    methodology: string;
  };
};

interface ContentBodyProps {
  dataSources: DataSource[];
  selectedSource: DataSource;
  categories: { name: string; data: boolean[] }[];
  handleSourceClick: (source: DataSource | null) => void;
  getVisualisations: (sourceId: string) => JSX.Element;
}

const ContentBody: React.FC<ContentBodyProps> = ({
  dataSources,
  selectedSource,
  categories,
  handleSourceClick,
  getVisualisations,
}) => {
  const TableBody = () => {
    return (
      <>
        {categories.map((category, index) => (
          <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
            <td className="border border-gray-200 px-6 py-4 text-gray-700 font-medium">
              {category.name}
            </td>
            {category.data.map((hasData, idx) => (
              <td
                key={idx}
                className={`border border-gray-200 px-6 py-4 text-center ${
                  hasData
                    ? "text-green-600 font-semibold"
                    : "text-red-600 font-semibold"
                }`}
              >
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                  hasData ? "bg-green-50" : "bg-red-50"
                }`}>
                  {hasData ? "Available" : "Not Available"}
                </span>
              </td>
            ))}
          </tr>
        ))}
      </>
    );
  };

  return (
    <div className="space-y-8">
      {/* Data Source Selection */}
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Data Source Selection</h2>
          </div>
          {selectedSource && (
            <button
              onClick={() => handleSourceClick(null)}
              className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center"
            >
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Selection
            </button>
          )}
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Category
                </th>
                {dataSources.map((source, index) => (
                  <th
                    key={index}
                    className={`px-6 py-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider cursor-pointer transition-colors duration-200 ${
                      selectedSource?.name === source.name
                        ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-500'
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => handleSourceClick(source)}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <span>{source.name}</span>
                      {selectedSource?.name === source.name && (
                        <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {!selectedSource ? (
                <TableBody />
              ) : (
                <tr>
                  <td colSpan={dataSources.length + 1} className="p-8">
                    <div className="space-y-8">
                      {/* Dataset Metadata Section */}
                      {selectedSource.metadata && (
                        <DatasetMetadata
                          source={selectedSource.name}
                          totalParticipants={selectedSource.metadata.totalParticipants}
                          collectionDate={selectedSource.metadata.collectionDate}
                          description={selectedSource.metadata.description}
                          categories={selectedSource.metadata.categories}
                          methodology={selectedSource.metadata.methodology}
                        />
                      )}

                      {/* Summary Section */}
                      <details open className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden group">
                        <summary className="p-8 cursor-pointer hover:bg-gray-50 transition-colors duration-200 list-none">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                                <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                              </div>
                              <h2 className="text-2xl font-bold text-gray-800">Summary</h2>
                            </div>
                            <svg className="h-6 w-6 text-gray-400 transform transition-transform duration-200 group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </summary>
                        <div className="px-8 pb-8">
                          <div className="prose max-w-none">
                            <p className="text-gray-600 leading-relaxed mb-8">
                              Overview of the dataset and key findings, including demographic distribution and population structure.
                            </p>
                            
                            {/* Population Pyramid */}
                            <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-lg border border-gray-100">
                              <div className="flex items-center mb-4">
                                <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                  <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                  </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800">Population Pyramid</h3>
                              </div>
                              <p className="text-gray-600 mb-6">
                                Age and gender distribution of the population, showing the demographic structure and potential population trends.
                              </p>
                              <div className="w-full h-96 bg-white rounded-lg shadow-sm p-4">
                                {getVisualisations(selectedSource.file)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </details>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ContentBody;
