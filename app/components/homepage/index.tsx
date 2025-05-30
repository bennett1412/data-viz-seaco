import { useState } from "react";
import { useNavigate } from "react-router";
import ContentBody from "./ContentBody";
import ChartJsPyramid from "./ChartJsPyramid";
import type { DataSource } from "./ContentBody";

const Home = () => {
  const navigate = useNavigate();
  const [selectedSource, setSelectedSource] = useState<DataSource | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const dataSources: DataSource[] = [
    {
      name: "All Data",
      file: "/data/demo.csv",
      metadata: {
        totalParticipants: 5000,
        collectionDate: "2023-01-15",
        description: "Complete dataset containing all rounds of data collection, including demographic information, health indicators, and socioeconomic data.",
        categories: ["Demographics", "Health", "Socioeconomic"],
        methodology: "Data collection followed WHO STEPS methodology for chronic disease risk factor surveillance. Multi-stage stratified random sampling was employed, with primary sampling units (PSUs) selected based on population density and socioeconomic status. Face-to-face interviews were conducted using standardized WHO STEPS questionnaires, complemented by physical measurements and biochemical assessments."
      }
    },
    {
      name: "Health Round 1",
      file: "/data/demo.csv",
      metadata: {
        totalParticipants: 2500,
        collectionDate: "2022-06-01",
        description: "First round of health data collection focusing on non-communicable diseases and general health indicators.",
        categories: ["Health", "Demographics"],
        methodology: "Following the Global Health Observatory (GHO) guidelines, this survey utilized a two-stage cluster sampling design. First stage involved random selection of enumeration blocks, followed by systematic sampling of households within selected blocks. Data collection was conducted through a combination of Computer-Assisted Personal Interviewing (CAPI) and paper-based questionnaires."
      }
    },
    {
      name: "Health Round 2",
      file: "/data/demo2.csv",
      metadata: {
        totalParticipants: 2800,
        collectionDate: "2022-12-15",
        description: "Second round of health data collection with additional focus on disease progression and treatment outcomes.",
        categories: ["Health", "Demographics", "Treatment"],
        methodology: "This survey implemented the WHO Health Observatory methodology with a three-stage sampling design. Primary sampling units were selected using probability proportional to size (PPS) sampling, followed by systematic sampling of households and random selection of eligible respondents. Data collection utilized a mixed-mode approach combining face-to-face interviews, self-administered questionnaires, and digital health records linkage."
      }
    }
  ];

  const filteredSources = dataSources.filter(source =>
    source.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    source.metadata?.categories.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const totalParticipants = dataSources.reduce((sum, source) => sum + (source.metadata?.totalParticipants || 0), 0);
  const uniqueCategories = Array.from(new Set(dataSources.flatMap(source => source.metadata?.categories || [])));

  const handleSourceClick = (source: DataSource | null) => {
    setSelectedSource(source);
  };

  const getVisualisations = (sourceId: string) => {
    return <ChartJsPyramid source={sourceId} />;
  };

  return (
    <div className="dashboard bg-gray-100 min-h-screen flex flex-col">
      {/* Search and Navigation Section */}
      <div className="bg-white shadow-md p-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="w-full md:w-1/2">
              <input
                type="text"
                placeholder="Search datasets..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => navigate('/map')}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Map View
              </button>
              <button
                onClick={() => navigate('/timeline')}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Timeline View
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Participants</h3>
            <p className="text-3xl font-bold text-blue-600">{totalParticipants.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Available Datasets</h3>
            <p className="text-3xl font-bold text-green-600">{dataSources.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Data Categories</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {uniqueCategories.map((category, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="main">
          <ContentBody
            dataSources={filteredSources}
            selectedSource={selectedSource!}
            categories={[
              { name: "Demographic Data", data: [true, true, true] },
              { name: "NCI Data", data: [true, true, true] },
              { name: "Wealth data", data: [true, false, false] },
            ]}
            handleSourceClick={handleSourceClick}
            getVisualisations={getVisualisations}
          />
        </main>
      </div>
    </div>
  );
};

export default Home;
