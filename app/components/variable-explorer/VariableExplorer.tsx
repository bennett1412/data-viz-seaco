import React, { useState, useMemo } from 'react';
import type { Individual } from '../../types/SeacoTypes';
import './VariableExplorer.css';

// Define the structure for our variable groups
interface VariableGroup {
  name: string;
  variables: {
    key: keyof Individual;
    label: string;
  }[];
}

const variableGroups: VariableGroup[] = [
  {
    name: 'Demographics',
    variables: [
      { key: 'age', label: 'Age' },
      { key: 'gender', label: 'Gender' },
      { key: 'ethnicity', label: 'Ethnicity' },
      { key: 'marital_status', label: 'Marital Status' },
      { key: 'citizenship', label: 'Citizenship' },
    ],
  },
  {
    name: 'Education',
    variables: [
      { key: 'education_current', label: 'Currently in Education' },
      { key: 'education_level', label: 'Education Level' },
      { key: 'school_type', label: 'School Type' },
      { key: 'literacy_en', label: 'English Literacy' },
      { key: 'literacy_my', label: 'Malay Literacy' },
      { key: 'literacy_cn', label: 'Chinese Literacy' },
      { key: 'literacy_tm', label: 'Tamil Literacy' },
    ],
  },
  {
    name: 'Income',
    variables: [
      { key: 'income_personal', label: 'Personal Income' },
      { key: 'income_household', label: 'Household Income' },
      { key: 'income_other', label: 'Other Income' },
      { key: 'income_total', label: 'Total Income' },
    ],
  },
  {
    name: 'Health Conditions',
    variables: [
      { key: 'heart_disease', label: 'Heart Disease' },
      { key: 'asthma', label: 'Asthma' },
      { key: 'stroke', label: 'Stroke' },
      { key: 'arthritis', label: 'Arthritis' },
      { key: 'dengue', label: 'Dengue' },
      { key: 'kidney_disease', label: 'Kidney Disease' },
      { key: 'kidney_dialysis', label: 'Kidney Dialysis' },
    ],
  },
  {
    name: 'Blood Pressure',
    variables: [
      { key: 'bp_measured', label: 'BP Measured' },
      { key: 'bp_diagnosed', label: 'BP Diagnosed' },
      { key: 'bp_12m_diagnosis', label: 'BP Diagnosis in Last 12 Months' },
      { key: 'bp_medication', label: 'BP Medication' },
    ],
  },
  {
    name: 'Diabetes',
    variables: [
      { key: 'sugar_measured', label: 'Sugar Measured' },
      { key: 'diabetes_diagnosed', label: 'Diabetes Diagnosed' },
      { key: 'insulin_current', label: 'Currently on Insulin' },
      { key: 'diabetes_medication', label: 'Diabetes Medication' },
    ],
  },
];

interface VariableExplorerProps {
  onVariableSelect: (variables: (keyof Individual)[]) => void;
}

export const VariableExplorer: React.FC<VariableExplorerProps> = ({ onVariableSelect }) => {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [selectedVariables, setSelectedVariables] = useState<Set<keyof Individual>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGroups = useMemo(() => {
    if (!searchQuery.trim()) return variableGroups;

    const query = searchQuery.toLowerCase();
    return variableGroups
      .map(group => ({
        ...group,
        variables: group.variables.filter(v => 
          v.label.toLowerCase().includes(query) || 
          v.key.toLowerCase().includes(query)
        )
      }))
      .filter(group => 
        group.variables.length > 0 || 
        group.name.toLowerCase().includes(query)
      );
  }, [searchQuery]);

  const toggleGroup = (groupName: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupName)) {
      newExpanded.delete(groupName);
    } else {
      newExpanded.add(groupName);
    }
    setExpandedGroups(newExpanded);
  };

  const toggleVariable = (variable: keyof Individual) => {
    const newSelected = new Set(selectedVariables);
    if (newSelected.has(variable)) {
      newSelected.delete(variable);
    } else {
      newSelected.add(variable);
    }
    setSelectedVariables(newSelected);
    onVariableSelect(Array.from(newSelected));
  };

  // Auto-expand groups that contain search results
  React.useEffect(() => {
    if (searchQuery.trim()) {
      const newExpanded = new Set(expandedGroups);
      filteredGroups.forEach(group => {
        if (group.variables.length > 0) {
          newExpanded.add(group.name);
        }
      });
      setExpandedGroups(newExpanded);
    }
  }, [searchQuery, filteredGroups]);

  return (
    <div className="variable-explorer">
      <div className="variable-explorer-header">
        <h3>Variable Explorer</h3>
        <input
          type="text"
          placeholder="Search variables..."
          className="variable-search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="variable-groups">
        {filteredGroups.map((group) => (
          <div key={group.name} className="variable-group">
            <div
              className="group-header"
              onClick={() => toggleGroup(group.name)}
            >
              <span className="expand-icon">
                {expandedGroups.has(group.name) ? '▼' : '▶'}
              </span>
              <span>{group.name}</span>
            </div>
            {expandedGroups.has(group.name) && (
              <div className="group-variables">
                {group.variables.map((variable) => (
                  <div
                    key={variable.key}
                    className={`variable-item ${
                      selectedVariables.has(variable.key) ? 'selected' : ''
                    }`}
                    onClick={() => toggleVariable(variable.key)}
                  >
                    <input
                      type="checkbox"
                      checked={selectedVariables.has(variable.key)}
                      onChange={() => {}}
                    />
                    <span>{variable.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}; 