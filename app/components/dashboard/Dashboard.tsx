import React, { useState } from 'react';
import type { Individual } from '../../types/SeacoTypes';
import { VariableExplorer } from '../variable-explorer/VariableExplorer';
import './Dashboard.css';

export const Dashboard: React.FC = () => {
  const [selectedVariables, setSelectedVariables] = useState<(keyof Individual)[]>([]);

  const handleVariableSelect = (variables: (keyof Individual)[]) => {
    setSelectedVariables(variables);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-grid">
        <div className="dashboard-cell map-view">
          <h3>Geographic View</h3>
          <div className="placeholder-content">
            Map visualization will go here
          </div>
        </div>
        
        <div className="dashboard-cell variable-explorer">
          <VariableExplorer onVariableSelect={handleVariableSelect} />
        </div>
        
        <div className="dashboard-cell timeline-view">
          <h3>Temporal View</h3>
          <div className="placeholder-content">
            Timeline visualization will go here
          </div>
        </div>
        
        <div className="dashboard-cell detail-view">
          <h3>Detail View</h3>
          <div className="placeholder-content">
            Selected variables: {selectedVariables.join(', ') || 'None'}
          </div>
        </div>
      </div>
    </div>
  );
}; 