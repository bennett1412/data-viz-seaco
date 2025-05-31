import React, { useState, useMemo } from 'react';
import { SimpleConditionCard } from './components/SimpleConditionCard';
import { DetailedConditionCard } from './components/DetailedConditionCard';
import {
  heartDiseaseConfig,
  asthmaConfig,
  hypertensionConfig,
  diabetesConfig
} from './components/config';
import type { Individual, Gender, Ethnicity } from '../../../types/SeacoTypes';

interface NCDsExploreProps {
  data: Individual[];
}

export const NCDsExplore: React.FC<NCDsExploreProps> = ({ data }) => {
  const [selectedDemographics, setSelectedDemographics] = useState<{
    gender?: Gender[];
    ethnicity?: Ethnicity[];
    ageRange?: [number, number];
    subdistrict?: string[];
  }>({});

  const [appliedFilters, setAppliedFilters] = useState<typeof selectedDemographics>({});

  // Get unique values for filters
  const uniqueValues = useMemo(() => {
    const genders = Array.from(new Set(data.map(d => d.gender)));
    const ethnicities = Array.from(new Set(data.map(d => d.ethnicity)));
    const subdistricts = Array.from(new Set(data.map(d => d.subdistrict)));
    const ages = data.map(d => parseInt(d.age));
    const minAge = Math.min(...ages);
    const maxAge = Math.max(...ages);

    return {
      genders,
      ethnicities,
      subdistricts,
      ageRange: [minAge, maxAge]
    };
  }, [data]);

  const handleDemographicChange = (
    type: 'gender' | 'ethnicity' | 'ageRange' | 'subdistrict',
    value: any
  ) => {
    setSelectedDemographics(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const handleApplyFilters = () => {
    setAppliedFilters(selectedDemographics);
  };

  const handleResetFilters = () => {
    setSelectedDemographics({});
    setAppliedFilters({});
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (appliedFilters.gender?.length) count++;
    if (appliedFilters.ethnicity?.length) count++;
    if (appliedFilters.ageRange) count++;
    if (appliedFilters.subdistrict?.length) count++;
    return count;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Non-Communicable Diseases Overview
        </h1>
        <p className="text-gray-600">
          Explore the prevalence and management of various health conditions in the population.
          Use the filters below to analyze specific demographic groups.
        </p>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Demographic Filters</h2>
          <div className="flex items-center space-x-4">
            {getActiveFilterCount() > 0 && (
              <span className="text-sm text-gray-600">
                {getActiveFilterCount()} active filter{getActiveFilterCount() !== 1 ? 's' : ''}
              </span>
            )}
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Reset
            </button>
            <button
              onClick={handleApplyFilters}
              className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Gender Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender
            </label>
            <div className="space-y-2">
              {uniqueValues.genders.map(gender => (
                <label key={gender} className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={selectedDemographics.gender?.includes(gender)}
                    onChange={(e) => {
                      const currentGenders = selectedDemographics.gender || [];
                      const newGenders = e.target.checked
                        ? [...currentGenders, gender]
                        : currentGenders.filter(g => g !== gender);
                      handleDemographicChange('gender', newGenders);
                    }}
                  />
                  <span className="ml-2 text-sm text-gray-700">{gender}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Ethnicity Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ethnicity
            </label>
            <div className="space-y-2">
              {uniqueValues.ethnicities.map(ethnicity => (
                <label key={ethnicity} className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={selectedDemographics.ethnicity?.includes(ethnicity)}
                    onChange={(e) => {
                      const currentEthnicities = selectedDemographics.ethnicity || [];
                      const newEthnicities = e.target.checked
                        ? [...currentEthnicities, ethnicity]
                        : currentEthnicities.filter(e => e !== ethnicity);
                      handleDemographicChange('ethnicity', newEthnicities);
                    }}
                  />
                  <span className="ml-2 text-sm text-gray-700">{ethnicity}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Age Range Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Age Range
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="number"
                min={uniqueValues.ageRange[0]}
                max={uniqueValues.ageRange[1]}
                value={selectedDemographics.ageRange?.[0] || uniqueValues.ageRange[0]}
                onChange={(e) => {
                  const min = parseInt(e.target.value);
                  const max = selectedDemographics.ageRange?.[1] || uniqueValues.ageRange[1];
                  handleDemographicChange('ageRange', [min, max]);
                }}
                className="w-20 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <span className="text-gray-500">to</span>
              <input
                type="number"
                min={uniqueValues.ageRange[0]}
                max={uniqueValues.ageRange[1]}
                value={selectedDemographics.ageRange?.[1] || uniqueValues.ageRange[1]}
                onChange={(e) => {
                  const min = selectedDemographics.ageRange?.[0] || uniqueValues.ageRange[0];
                  const max = parseInt(e.target.value);
                  handleDemographicChange('ageRange', [min, max]);
                }}
                className="w-20 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Subdistrict Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subdistrict
            </label>
            <select
              multiple
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={selectedDemographics.subdistrict || []}
              onChange={(e) => {
                const selected = Array.from(e.target.selectedOptions, option => option.value);
                handleDemographicChange('subdistrict', selected);
              }}
            >
              {uniqueValues.subdistricts.map(subdistrict => (
                <option key={subdistrict} value={subdistrict}>
                  {subdistrict}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Simple Condition Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <SimpleConditionCard
          {...heartDiseaseConfig}
          data={data}
          selectedDemographics={appliedFilters}
        />
        <SimpleConditionCard
          {...asthmaConfig}
          data={data}
          selectedDemographics={appliedFilters}
        />
      </div>

      {/* Detailed Condition Cards */}
      <div className="grid grid-cols-1 gap-6">
        <DetailedConditionCard
          {...hypertensionConfig}
          data={data}
          selectedDemographics={appliedFilters}
        />
        <DetailedConditionCard
          {...diabetesConfig}
          data={data}
          selectedDemographics={appliedFilters}
        />
      </div>
    </div>
  );
}; 