import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import type { Feature, FeatureCollection, GeoJsonObject } from 'geojson';
import type { Layer, PathOptions } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { sampleDatasets } from '../data/sampleDatasets';
import DatasetMetadata from '../components/metadata/DatasetMetadata';
import ChartJsPyramid from '../components/homepage/ChartJsPyramid';
import DetailPanel from '../components/detail-panel/DetailPanel';
import './map-view.css';
import './timeline-view.css';

interface MalaysiaFeature extends Feature {
  properties: {
    name: string;
    state: string;
    datasets: string[];
  };
}

interface MalaysiaGeoJSON extends FeatureCollection {
  features: MalaysiaFeature[];
}

// Malaysia GeoJSON data with more detailed regions
const malaysiaGeoJSON: MalaysiaGeoJSON = {
  type: "FeatureCollection",
  features: [
    // Peninsular Malaysia States
    {
      type: "Feature",
      properties: {
        name: "Kuala Lumpur",
        state: "Federal Territory",
        datasets: ["1", "dataset-2019", "dataset-2018"]
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[101.6, 3.1], [101.7, 3.1], [101.7, 3.2], [101.6, 3.2], [101.6, 3.1]]]
      }
    },
    {
      type: "Feature",
      properties: {
        name: "Selangor",
        state: "Selangor",
        datasets: ["1", "dataset-2019"]
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[101.0, 2.8], [101.8, 2.8], [101.8, 3.5], [101.0, 3.5], [101.0, 2.8]]]
      }
    },
    {
      type: "Feature",
      properties: {
        name: "Penang",
        state: "Penang",
        datasets: ["1", "dataset-2018"]
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[100.2, 5.2], [100.3, 5.2], [100.3, 5.5], [100.2, 5.5], [100.2, 5.2]]]
      }
    },
    {
      type: "Feature",
      properties: {
        name: "Johor",
        state: "Johor",
        datasets: ["1", "dataset-2019"]
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[102.5, 1.5], [104.0, 1.5], [104.0, 2.5], [102.5, 2.5], [102.5, 1.5]]]
      }
    },
    // East Malaysia States
    {
      type: "Feature",
      properties: {
        name: "Kuching",
        state: "Sarawak",
        datasets: ["1", "dataset-2019"]
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[110.2, 1.5], [110.4, 1.5], [110.4, 1.7], [110.2, 1.7], [110.2, 1.5]]]
      }
    },
    {
      type: "Feature",
      properties: {
        name: "Kota Kinabalu",
        state: "Sabah",
        datasets: ["1", "dataset-2018"]
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[115.9, 5.9], [116.1, 5.9], [116.1, 6.1], [115.9, 6.1], [115.9, 5.9]]]
      }
    }
  ]
};

interface MapViewProps {}

const MapView: React.FC<MapViewProps> = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedDataset, setSelectedDataset] = useState<string | null>(null);
  const [isDetailPanelOpen, setIsDetailPanelOpen] = useState(false);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const handleRegionClick = (regionName: string) => {
    setSelectedRegion(prev => prev === regionName ? null : regionName);
    setSelectedDataset(null);
  };

  const handleDatasetClick = (datasetId: string) => {
    setSelectedDataset(datasetId);
    setIsDetailPanelOpen(true);
  };

  const handleCloseDetailPanel = () => {
    setIsDetailPanelOpen(false);
    setSelectedDataset(null);
  };

  const getRegionDatasets = () => {
    if (!selectedRegion) {
      return sampleDatasets;
    }
    const region = malaysiaGeoJSON.features.find(f => f.properties.name === selectedRegion);
    return region ? region.properties.datasets.map(id => 
      sampleDatasets.find(dataset => dataset.id === id)
    ).filter((dataset): dataset is NonNullable<typeof dataset> => dataset !== undefined) : [];
  };

  const getStyle = (feature: Feature | undefined): PathOptions => {
    const name = feature?.properties?.name;
    const isSelected = name === selectedRegion;
    const isHovered = name === hoveredRegion;

    return {
      fillColor: isSelected ? '#3b82f6' : isHovered ? '#60a5fa' : '#94a3b8',
      fillOpacity: isSelected || isHovered ? 0.8 : 0.6,
      color: '#1e293b',
      weight: isSelected ? 3 : 2,
    };
  };

  return (
    <div className="map-view-container">
      <div className="map-view-main">
        <h1 className="text-3xl font-bold mb-8">Malaysia Population Map</h1>
        
        <div className="map-container">
          <MapContainer
            center={[4.5, 108.0]}
            zoom={6}
            style={{ height: "600px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <GeoJSON
              data={malaysiaGeoJSON}
              style={getStyle}
              onEachFeature={(feature: MalaysiaFeature, layer: Layer) => {
                layer.on({
                  click: () => handleRegionClick(feature.properties.name),
                  mouseover: () => setHoveredRegion(feature.properties.name),
                  mouseout: () => setHoveredRegion(null),
                });
              }}
            />
          </MapContainer>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">
              {selectedRegion ? (
                <>
                  Available Datasets for {selectedRegion}
                  <span className="text-lg font-normal text-gray-600 ml-2">
                    ({malaysiaGeoJSON.features.find(f => f.properties.name === selectedRegion)?.properties.state})
                  </span>
                </>
              ) : (
                "All Available Datasets"
              )}
            </h2>
            {selectedRegion && (
              <button
                onClick={() => setSelectedRegion(null)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Clear Selection
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getRegionDatasets().map((dataset) => (
              <div
                key={dataset.id}
                className="p-4 border rounded-lg hover:shadow-md cursor-pointer transition-all"
                onClick={() => handleDatasetClick(dataset.id)}
              >
                <h3 className="font-bold text-lg mb-2">{dataset.name}</h3>
                <p className="text-gray-600 text-sm mb-2">
                  Year: {dataset.year}
                </p>
                <div className="flex flex-wrap gap-2">
                  {dataset.variables.map((variable) => (
                    <span
                      key={variable}
                      className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                    >
                      {variable}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <DetailPanel
        isOpen={isDetailPanelOpen}
        selectedDataset={selectedDataset ? sampleDatasets.find(d => d.id === selectedDataset) || null : null}
        onClose={handleCloseDetailPanel}
      />
    </div>
  );
};

export default MapView; 