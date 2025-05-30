import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Individual } from '../types/SeacoTypes';
import './timeline-view.css';
import PlotlyPyramid from '../components/homepage/PlotlyPyramid';

// Define data categories and their associated variables
const DATA_CATEGORIES = {
  'Demographics': ['age', 'gender', 'ethnicity', 'marital_status', 'citizenship'],
  'Education': ['education_current', 'education_level', 'school_type', 'literacy_en', 'literacy_my', 'literacy_cn', 'literacy_tm'],
  'Income': ['income_personal', 'income_household', 'income_other', 'income_total'],
  'Health': ['heart_disease', 'asthma', 'stroke', 'arthritis', 'dengue', 'bp_12months', 'kidney_disease', 'kidney_dialysis'],
  'Blood Pressure': ['bp_measured', 'bp_diagnosed', 'bp_12m_diagnosis', 'bp_medication'],
  'Diabetes': ['sugar_measured', 'diabetes_diagnosed', 'insulin_current', 'diabetes_medication']
} as const;

interface TimelineItem {
  id: string;
  date: string;
  title: string;
  description: string;
  variables: (keyof Individual)[];
  filePath?: string;
}

// Sample timeline data - this would come from your actual data
const timelineData: TimelineItem[] = [
  {
    id: 'health-round-1',
    date: '2022-06',
    title: 'Health Round 1',
    description: 'First round of health data collection focusing on non-communicable diseases and general health indicators.',
    variables: [
      'heart_disease',
      'asthma',
      'stroke',
      'arthritis',
      'dengue',
      'kidney_disease',
      'bp_measured',
      'diabetes_diagnosed',
      'bp_diagnosed',
      'bp_medication',
      'diabetes_medication'
    ],
    filePath: '/data/demo.csv'
  },
  {
    id: 'health-round-2',
    date: '2022-12',
    title: 'Health Round 2',
    description: 'Second round of health data collection with additional focus on disease progression and treatment outcomes.',
    variables: [
      'income_personal',
      'income_household',
      'income_other',
      'income_total',
      'education_current',
      'education_level',
      'school_type',
      'literacy_en',
      'literacy_my',
      'literacy_cn',
      'literacy_tm',
      'marital_status',
      'citizenship'
    ],
    filePath: '/data/demo2.csv'
  }
];

interface DetailPanelProps {
  isOpen: boolean;
  selectedItem: TimelineItem | null;
  onClose: () => void;
}

const DetailPanel: React.FC<DetailPanelProps> = ({ isOpen, selectedItem, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen || !selectedItem) return null;

  const handleExplore = () => {
    navigate(`/explore/${selectedItem.id}`);
  };

  // Use the same data source for both datasets to ensure consistency
  const dataSource = '/data/demo.csv';

  return (
    <div className="detail-panel">
      <div className="detail-panel-header">
        <h3>{selectedItem.title}</h3>
        <button onClick={onClose} className="close-button">×</button>
      </div>
      <div className="detail-panel-content">
        <div className="detail-section">
          <h4>Date</h4>
          <p>{selectedItem.date}</p>
        </div>
        <div className="detail-section">
          <h4>Methodology</h4>
          <p>{selectedItem.description}</p>
        </div>
        <div className="detail-section">
          <h4>Variables Collected</h4>
          <ul>
            {selectedItem.variables.map(variable => (
              <li key={variable}>{variable}</li>
            ))}
          </ul>
        </div>
        <div className="detail-section">
          <h4>Population Pyramid</h4>
          <div className="pyramid-container">
            <PlotlyPyramid source={dataSource} />
          </div>
        </div>
        <div className="detail-section">
          <button 
            onClick={handleExplore}
            className="explore-button"
          >
            Explore Dataset
          </button>
        </div>
      </div>
    </div>
  );
};

export default function TimelineView() {
  const [selectedItem, setSelectedItem] = useState<TimelineItem | null>(null);
  const [isDetailPanelOpen, setIsDetailPanelOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleItemClick = (item: TimelineItem) => {
    setSelectedItem(item);
    setIsDetailPanelOpen(true);
  };

  const handleCloseDetailPanel = () => {
    setIsDetailPanelOpen(false);
  };

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const filteredTimelineData = useMemo(() => {
    if (selectedCategories.length === 0) return timelineData;
    
    return timelineData.filter(item => {
      const itemVariables = new Set(item.variables);
      return selectedCategories.some(category => 
        DATA_CATEGORIES[category as keyof typeof DATA_CATEGORIES].some(
          variable => itemVariables.has(variable as keyof Individual)
        )
      );
    });
  }, [selectedCategories]);

  return (
    <div className="timeline-view-container">
      <div className="timeline-view-main">
        <h2>Data Collection Timeline</h2>
        
        <div className="filter-section">
          <h3>Filter by Data Category</h3>
          <div className="category-filters">
            {Object.keys(DATA_CATEGORIES).map(category => (
              <label key={category} className="category-filter">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryToggle(category)}
                />
                {category}
              </label>
            ))}
          </div>
        </div>

        <div className="timeline">
          {filteredTimelineData.map((item, index) => (
            <div
              key={item.id}
              className="timeline-item"
              onClick={() => handleItemClick(item)}
            >
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="timeline-date">{item.date}</div>
                <div className="timeline-title">{item.title}</div>
                <div className="timeline-description">{item.description}</div>
              </div>
              {index < filteredTimelineData.length - 1 && <div className="timeline-line"></div>}
            </div>
          ))}
        </div>
      </div>
      <DetailPanel
        isOpen={isDetailPanelOpen}
        selectedItem={selectedItem}
        onClose={handleCloseDetailPanel}
      />
    </div>
  );
} 