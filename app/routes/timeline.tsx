import React from 'react';
import TimelineView from '../components/TimelineView';
import { sampleDatasets } from '../data/sampleDatasets';

const TimelinePage: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Population Timeline View</h1>
      <TimelineView datasets={sampleDatasets} />
    </div>
  );
};

export default TimelinePage; 