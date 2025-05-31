import React from 'react';
import { useParams } from 'react-router-dom';
import { Breadcrumb } from '../../components/breadcrumb/Breadcrumb';
import { useCSVData } from '../../hooks/useCSVData';
import { NCDsExplore } from './ncds/index';

export default function NCDs() {
  const { datasetId } = useParams<{ datasetId: string }>();
  const { data: csvData, isLoading, error } = useCSVData('/data/demo.csv');

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb 
        items={[
          { label: 'Home', path: '/' },
          { label: 'Explore', path: '/explore' },
          { label: 'Dataset ' + datasetId, path: `/explore/${datasetId}` },
          { label: 'NCDs', path: `/explore/${datasetId}/ncds` }
        ]} 
      />
      
      <NCDsExplore data={csvData} />
    </div>
  );
} 