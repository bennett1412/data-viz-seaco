import React from 'react';
import { useParams } from 'react-router-dom';
import { Breadcrumb } from '../components/breadcrumb/Breadcrumb';

export default function Socioeconomic() {
  const { id } = useParams<{ id: string }>();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb 
        items={[
          { label: 'Home', path: '/' },
          { label: 'Socioeconomic', path: '/socioeconomic' }
        ]} 
      />
      
      <div className="mt-8">
        <h1 className="text-3xl font-bold mb-6">Socioeconomic Indicators</h1>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Wealth Index Distribution</h2>
              {/* Wealth index visualization will go here */}
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">Education Levels</h2>
              {/* Education level visualization will go here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 