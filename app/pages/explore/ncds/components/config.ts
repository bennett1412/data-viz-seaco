import type { SimpleConditionCardProps, DetailedConditionCardProps } from './types';

export const heartDiseaseConfig: SimpleConditionCardProps = {
  title: "Heart Disease",
  variable: "heart_disease",
  description: "Prevalence of heart disease in the population",
  color: "#dc2626",
  data: [] // This will be populated by the parent component
};

export const asthmaConfig: SimpleConditionCardProps = {
  title: "Asthma",
  variable: "asthma",
  description: "Asthma prevalence and diagnosis",
  color: "#059669",
  data: [] // This will be populated by the parent component
};

export const hypertensionConfig: DetailedConditionCardProps = {
  title: "Hypertension",
  variables: [
    {
      groupName: "Screening & Diagnosis",
      items: [
        { key: "bp_measured", label: "BP Ever Measured" },
        { key: "bp_diagnosed", label: "Hypertension Diagnosed" }
      ]
    },
    {
      groupName: "Recent Activity",
      items: [
        { key: "bp_12months", label: "High BP Last 12 Months" },
        { key: "bp_12m_diagnosis", label: "Diagnosed Last 12 Months" }
      ]
    },
    {
      groupName: "Current Management",
      items: [
        { key: "bp_medication", label: "Taking BP Medication" }
      ]
    }
  ],
  colorScheme: ["#2563eb", "#3b82f6", "#60a5fa"],
  data: [] // This will be populated by the parent component
};

export const diabetesConfig: DetailedConditionCardProps = {
  title: "Diabetes",
  variables: [
    {
      groupName: "Screening & Diagnosis",
      items: [
        { key: "sugar_measured", label: "Blood Sugar Measured" },
        { key: "diabetes_diagnosed", label: "Diabetes Diagnosed" }
      ]
    },
    {
      groupName: "Current Treatment",
      items: [
        { key: "diabetes_medication", label: "Taking Diabetes Medication" },
        { key: "insulin_current", label: "Currently Using Insulin" }
      ]
    }
  ],
  colorScheme: ["#7c3aed", "#8b5cf6"],
  data: [] // This will be populated by the parent component
}; 