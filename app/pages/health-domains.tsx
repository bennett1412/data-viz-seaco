import React from 'react';
import { useParams } from 'react-router-dom';
import { DiseasesViz } from '../components/diseases/DiseasesViz';
import { Breadcrumb } from '../components/breadcrumb/Breadcrumb';

export default function HealthDomains() {
  const { id } = useParams<{ id: string }>();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb 
        items={[
          { label: 'Home', path: '/' },
          { label: 'Health Domains', path: '/health-domains' }
        ]} 
      />
      
      <div className="mt-8">
        <h1 className="text-3xl font-bold mb-6">Health Domains</h1>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <DiseasesViz source={id ? `/data/${id}.csv` : '/data/demo.csv'} />
        </div>
      </div>
    </div>
  );
} 