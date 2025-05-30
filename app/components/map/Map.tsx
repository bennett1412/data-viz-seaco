import React, { useEffect, useRef, useState } from 'react';
import type { Individual } from '../../types/SeacoTypes';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapProps {
  data: Individual[];
  highlightedAreas: string[];
}

// Sample GeoJSON data for subdistricts - in a real app, this would come from your data
const subdistrictGeoJSON: Record<string, any> = {
  'Subang Jaya': {
    type: 'Feature',
    properties: { name: 'Subang Jaya' },
    geometry: {
      type: 'Polygon',
      coordinates: [[[101.58, 3.04], [101.62, 3.04], [101.62, 3.08], [101.58, 3.08], [101.58, 3.04]]]
    }
  },
  'Petaling Jaya': {
    type: 'Feature',
    properties: { name: 'Petaling Jaya' },
    geometry: {
      type: 'Polygon',
      coordinates: [[[101.62, 3.08], [101.66, 3.08], [101.66, 3.12], [101.62, 3.12], [101.62, 3.08]]]
    }
  },
  'Shah Alam': {
    type: 'Feature',
    properties: { name: 'Shah Alam' },
    geometry: {
      type: 'Polygon',
      coordinates: [[[101.50, 3.00], [101.54, 3.00], [101.54, 3.04], [101.50, 3.04], [101.50, 3.00]]]
    }
  }
};

export const Map: React.FC<MapProps> = ({ data, highlightedAreas }) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize map
    if (!mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current).setView([3.1390, 101.6869], 11); // Centered on Malaysia

      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapRef.current);
    }

    // Clear existing layers
    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.GeoJSON) {
        layer.remove();
      }
    });

    // Add GeoJSON layers for each subdistrict
    highlightedAreas.forEach((area) => {
      const geoJSON = subdistrictGeoJSON[area];
      if (geoJSON) {
        const layer = L.geoJSON(geoJSON, {
          style: (feature) => ({
            fillColor: selectedArea === area ? '#ff7800' : '#3388ff',
            weight: 2,
            opacity: 1,
            color: '#ffffff',
            fillOpacity: 0.7
          }),
          onEachFeature: (feature, layer) => {
            const geoLayer = layer as L.GeoJSON;
            geoLayer.on({
              mouseover: () => {
                geoLayer.setStyle({
                  fillColor: '#ff7800',
                  fillOpacity: 0.9
                });
              },
              mouseout: () => {
                geoLayer.setStyle({
                  fillColor: selectedArea === area ? '#ff7800' : '#3388ff',
                  fillOpacity: 0.7
                });
              },
              click: () => {
                setSelectedArea(area);
                // Show area statistics
                const areaData = data.filter(d => d.subdistrict === area);
                const stats = {
                  total: areaData.length,
                  urban: areaData.filter(d => d.area_type === 'Urban').length,
                  rural: areaData.filter(d => d.area_type === 'Rural').length,
                  ethnicities: Object.entries(
                    areaData.reduce((acc, curr) => {
                      acc[curr.ethnicity] = (acc[curr.ethnicity] || 0) + 1;
                      return acc;
                    }, {} as Record<string, number>)
                  )
                };

                L.popup()
                  .setLatLng(geoLayer.getBounds().getCenter())
                  .setContent(`
                    <div class="p-2">
                      <h3 class="font-bold text-lg mb-2">${area}</h3>
                      <div class="space-y-1">
                        <p><strong>Total Population:</strong> ${stats.total}</p>
                        <p><strong>Urban:</strong> ${stats.urban}</p>
                        <p><strong>Rural:</strong> ${stats.rural}</p>
                        <div class="mt-2">
                          <strong>Ethnicity Distribution:</strong>
                          <ul class="list-disc list-inside">
                            ${stats.ethnicities.map(([ethnicity, count]) => 
                              `<li>${ethnicity}: ${count}</li>`
                            ).join('')}
                          </ul>
                        </div>
                      </div>
                    </div>
                  `)
                  .openOn(mapRef.current!);
              }
            });
          }
        }).addTo(mapRef.current!);
      }
    });

    // Add markers for each data point
    data.forEach((individual) => {
      if (individual.latitude && individual.longitude) {
        const marker = L.marker([individual.latitude, individual.longitude])
          .bindPopup(`
            <div>
              <strong>Subdistrict:</strong> ${individual.subdistrict}<br>
              <strong>Area Type:</strong> ${individual.area_type}<br>
              <strong>Ethnicity:</strong> ${individual.ethnicity}
            </div>
          `);
        marker.addTo(mapRef.current!);
      }
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [data, highlightedAreas, selectedArea]);

  return (
    <div 
      ref={mapContainerRef} 
      className="w-full h-full rounded-lg overflow-hidden"
      style={{ minHeight: '500px' }}
    />
  );
}; 