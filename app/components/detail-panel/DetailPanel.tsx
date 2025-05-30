import React from 'react';
import ChartJsPyramid from '../homepage/ChartJsPyramid';
import type { Dataset } from '../../data/sampleDatasets';
import './DetailPanel.css';

interface DetailPanelProps {
  isOpen: boolean;
  selectedDataset: Dataset | null;
  onClose: () => void;
}

const DetailPanel: React.FC<DetailPanelProps> = ({ isOpen, selectedDataset, onClose }) => {
  if (!isOpen || !selectedDataset) return null;

  return (
    <div className="detail-panel">
      <div className="detail-panel-header">
        <h3>Dataset Details</h3>
        <button onClick={onClose} className="close-button">×</button>
      </div>
      <div className="detail-panel-content">
        <div className="detail-section">
          <h4>Description</h4>
          <p>{selectedDataset.metadata.description}</p>
        </div>
        <div className="detail-section">
          <h4>Methodology</h4>
          <p>{selectedDataset.metadata.methodology}</p>
        </div>
        <div className="detail-section">
          <h4>Source</h4>
          <p>{selectedDataset.metadata.source}</p>
        </div>
        <div className="detail-section">
          <h4>Last Updated</h4>
          <p>{selectedDataset.metadata.lastUpdated}</p>
        </div>
        <div className="detail-section">
          <h4>Variables Collected</h4>
          <ul>
            {selectedDataset.variables.map(variable => (
              <li key={variable}>{variable}</li>
            ))}
          </ul>
        </div>
        <div className="detail-section">
          <h4>Population Pyramid</h4>
          <div className="pyramid-container">
            <ChartJsPyramid source={`/data/${selectedDataset.id}.csv`} />
          </div>
        </div>
        <div className="detail-section">
          <button 
            onClick={() => window.location.href = `/explore/${selectedDataset.id}`}
            className="explore-button"
          >
            Explore Dataset
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailPanel; 