import React from "react";
import { useNavigate } from "react-router";
import type { DataSource } from "./ContentBody";
import DiseasesViz from "../diseases/DiseasesViz";

interface VisualisationStartProps {
  source: DataSource;
}

const VisualisationStart: React.FC<VisualisationStartProps> = ({ source }) => {
  const navigate = useNavigate();
  return (
    <div className="rounded-lg p-4 bg-gray-100">
      {/* Main Content Section */}
      <div className="flex flex-col">
        {/* Disease Visualization Section */}
        <div className="w-full">
          <DiseasesViz source={source.file} />
        </div>

        {/* Controls Section */}
        <div className="w-full mt-4">
          <h3 className="text-lg font-semibold mb-2">Filters</h3>
          <div className="flex flex-col space-y-4">
            <div>
              <label
                htmlFor="ethnicity"
                className="block text-sm font-medium mb-1"
              >
                Select Ethnicity
              </label>
              <select
                id="ethnicity"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- Choose Ethnicity --</option>
                <option value="ethnicity1">Malay</option>
                <option value="ethnicity2">Chinese</option>
                <option value="ethnicity3">Indian</option>
                <option value="ethnicity3">Other</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualisationStart;
