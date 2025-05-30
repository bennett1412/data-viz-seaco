import React, { useEffect, useState } from "react";
import { useCSVData } from "../../hooks/useCSVData";
import type { Individual } from "../../types/SeacoTypes";
import Chart from "chart.js/auto";

const DiseasesViz: React.FC<{ source: string }> = ({ source }) => {
  const { data: rawData, isLoading, error } = useCSVData(source);
  const [selectedDisease, setSelectedDisease] = useState<string>("all");
  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: { label: string; data: number[]; backgroundColor: string }[];
  }>({
    labels: [],
    datasets: [],
  });

  const [ethnicityChartData, setEthnicityChartData] = useState<{
    labels: string[];
    datasets: { label: string; data: number[]; backgroundColor: string }[];
  }>({
    labels: [],
    datasets: [],
  });

  // Disease metadata including sub-questions
  const diseaseMetadata = {
    heart_disease: {
      label: "Heart Disease",
      subQuestions: ["Chest pain", "Shortness of breath", "Irregular heartbeat"],
      description: "Cardiovascular conditions affecting heart function"
    },
    asthma: {
      label: "Asthma",
      subQuestions: ["Wheezing", "Coughing at night", "Exercise-induced symptoms"],
      description: "Chronic respiratory condition affecting airways"
    },
    stroke: {
      label: "Stroke",
      subQuestions: ["Facial drooping", "Arm weakness", "Speech difficulties"],
      description: "Brain damage due to interrupted blood supply"
    },
    arthritis: {
      label: "Arthritis",
      subQuestions: ["Joint pain", "Morning stiffness", "Reduced mobility"],
      description: "Inflammation of joints causing pain and stiffness"
    },
    dengue: {
      label: "Dengue",
      subQuestions: ["High fever", "Severe headache", "Joint pain"],
      description: "Mosquito-borne viral infection"
    },
    kidney_disease: {
      label: "Kidney Disease",
      subQuestions: ["Swelling in legs", "Changes in urination", "Fatigue"],
      description: "Impaired kidney function affecting waste filtration"
    }
  };

  useEffect(() => {
    if (!rawData.length) return;

    const diseases = Object.keys(diseaseMetadata);
    const diseaseCounts: Record<string, number> = diseases.reduce(
      (acc: Record<string, number>, disease) => {
        acc[disease] = 0;
        return acc;
      },
      {}
    );

    rawData.forEach((individual: Individual) => {
      diseases.forEach((disease) => {
        if (individual[disease as keyof Individual] === "Yes") {
          diseaseCounts[disease]++;
        }
      });
    });

    setChartData({
      labels: diseases.map((disease) => diseaseMetadata[disease as keyof typeof diseaseMetadata].label),
      datasets: [
        {
          label: "Number of Cases",
          data: diseases.map((disease) => diseaseCounts[disease]),
          backgroundColor: "rgba(75, 192, 192, 0.6)",
        },
      ],
    });

    // Ethnicity Chart Data
    const ethnicities = ["Malay", "Chinese", "Indian", "OrangAsli", "Other"];
    const ethnicityDiseaseCounts: Record<
      string,
      Record<string, number>
    > = ethnicities.reduce((acc, ethnicity) => {
      acc[ethnicity] = diseases.reduce((diseaseAcc, disease) => {
        diseaseAcc[disease] = 0;
        return diseaseAcc;
      }, {} as Record<string, number>);
      return acc;
    }, {} as Record<string, Record<string, number>>);

    rawData.forEach((individual: Individual) => {
      const ethnicity = individual.ethnicity;
      if (ethnicities.includes(ethnicity)) {
        diseases.forEach((disease) => {
          if (individual[disease as keyof Individual] === "Yes") {
            ethnicityDiseaseCounts[ethnicity][disease]++;
          }
        });
      }
    });

    setEthnicityChartData({
      labels: diseases.map((disease) => diseaseMetadata[disease as keyof typeof diseaseMetadata].label),
      datasets: ethnicities.map((ethnicity, index) => ({
        label: ethnicity,
        data: diseases.map(
          (disease) => ethnicityDiseaseCounts[ethnicity][disease]
        ),
        backgroundColor: `rgba(${index * 50}, ${100 + index * 30}, ${
          200 - index * 40
        }, 0.6)`,
      })),
    });
  }, [rawData]);

  const handleDiseaseChange = (disease: string) => {
    setSelectedDisease(disease);
  };

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  if (isLoading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Selected Disease Information */}
      {selectedDisease !== "all" && (
        <div className="bg-blue-50 p-6 rounded-lg mb-8 border border-blue-100">
          <div className="flex items-center mb-4">
            <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <svg className="h-4 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-blue-800">
              {diseaseMetadata[selectedDisease as keyof typeof diseaseMetadata].label}
            </h3>
          </div>
          <p className="text-blue-600 mb-4 leading-relaxed">
            {diseaseMetadata[selectedDisease as keyof typeof diseaseMetadata].description}
          </p>
          <div className="space-y-3">
            <h4 className="font-medium text-blue-700 flex items-center">
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              Key Symptoms/Indicators:
            </h4>
            <ul className="space-y-2">
              {diseaseMetadata[selectedDisease as keyof typeof diseaseMetadata].subQuestions.map((question, index) => (
                <li key={index} className="flex items-center text-blue-600">
                  <span className="h-2 w-2 bg-blue-400 rounded-full mr-3"></span>
                  {question}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Charts Section */}
      <div className="max-w-4xl mx-auto">
        {/* Ethnicity Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <div className="w-full" style={{ height: '100%', minHeight: '250px' }}>
            <canvas id="ethnicityChart"></canvas>
          </div>
        </div>
      </div>

      {/* Chart Rendering */}
      <ChartRenderer chartData={ethnicityChartData} chartId="ethnicityChart" />
    </div>
  );
};

const ChartRenderer: React.FC<{ chartData: any; chartId: string }> = ({
  chartData,
  chartId,
}) => {
  useEffect(() => {
    const ctx = document.getElementById(chartId) as HTMLCanvasElement;
    if (!ctx) return;

    const chartInstance = new Chart(ctx, {
      type: "bar",
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "top",
            labels: {
              padding: 10,
              font: {
                size: 10,
                weight: 'normal'
              }
            }
          },
          title: {
            display: true,
            text: "Disease Distribution Across Ethnicities",
            font: {
              size: 14,
              weight: 'bold'
            },
            padding: {
              top: 5,
              bottom: 10
            }
          },
          tooltip: {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            titleColor: '#1f2937',
            bodyColor: '#4b5563',
            borderColor: '#e5e7eb',
            borderWidth: 1,
            padding: 12,
            boxPadding: 6,
            usePointStyle: true,
            callbacks: {
              label: function(context) {
                return `${context.dataset.label}: ${context.parsed.y} cases`;
              }
            }
          }
        },
        scales: {
          x: {
            stacked: true,
            beginAtZero: true,
            grid: {
              display: false
            },
            title: {
              display: true,
              text: "Diseases",
              font: {
                size: 12,
                weight: 'normal'
              },
              padding: {
                top: 10
              }
            }
          },
          y: {
            stacked: true,
            beginAtZero: true,
            grid: {
              color: '#f3f4f6'
            },
            title: {
              display: true,
              text: "Number of Cases",
              font: {
                size: 12,
                weight: 'normal'
              },
              padding: {
                bottom: 10
              }
            }
          },
        },
      },
    });

    return () => {
      chartInstance.destroy();
    };
  }, [chartData, chartId]);

  return null;
};

export default DiseasesViz;
