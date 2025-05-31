import type { Individual, YesNo, Gender, Ethnicity } from '../../../../types/SeacoTypes';

export interface ConditionCardProps {
  data: Individual[];
  selectedDemographics?: {
    gender?: Gender[];
    ethnicity?: Ethnicity[];
    ageRange?: [number, number];
    subdistrict?: string[];
  };
}

export interface SimpleConditionCardProps extends ConditionCardProps {
  title: string;
  variable: keyof Individual;
  description: string;
  color: string;
}

export interface DetailedConditionCardProps extends ConditionCardProps {
  title: string;
  variables: {
    groupName: string;
    items: {
      key: keyof Individual;
      label: string;
      description?: string;
    }[];
  }[];
  colorScheme: string[];
}

export interface ChartData {
  name: string;
  value: number;
  percentage: number;
  total: number;
}

export interface GroupedChartData {
  groupName: string;
  items: ChartData[];
} 