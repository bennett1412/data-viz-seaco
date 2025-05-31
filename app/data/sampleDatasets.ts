export interface Dataset {
  id: string;
  name: string;
  year: number;
  variables: string[];
  metadata: {
    description: string;
    source: string;
    lastUpdated: string;
    methodology: string;
  };
  populationData: {
    ageGroups: string[];
    maleData: { [key: string]: number[] };
    femaleData: { [key: string]: number[] };
  };
}

export const sampleDatasets: Dataset[] = [
  {
    id: 'health-round-1',
    name: 'Health Round 1',
    year: 2022,
    variables: ['heart_disease', 'asthma', 'stroke', 'arthritis', 'dengue', 'bp_12months', 'kidney_disease', 'kidney_dialysis'],
    metadata: {
      description: 'First round of health data collection focusing on non-communicable diseases and general health indicators.',
      source: 'National Health Survey',
      lastUpdated: '2022-06-01',
      methodology: 'Following the Global Health Observatory (GHO) guidelines, this survey utilized a two-stage cluster sampling design. First stage involved random selection of enumeration blocks, followed by systematic sampling of households within selected blocks. Data collection was conducted through a combination of Computer-Assisted Personal Interviewing (CAPI) and paper-based questionnaires.'
    },
    populationData: {
      ageGroups: ['0-9', '10-19', '20-29', '30-39', '40-49', '50-59', '60+'],
      maleData: {
        Malay: [500, 600, 700, 650, 500, 400, 300],
        Chinese: [400, 500, 600, 550, 450, 300, 200],
        Indian: [300, 350, 400, 300, 200, 150, 100],
        Other: [100, 150, 200, 180, 160, 120, 90],
      },
      femaleData: {
        Malay: [480, 580, 690, 640, 490, 390, 290],
        Chinese: [390, 480, 590, 530, 440, 290, 190],
        Indian: [280, 340, 390, 290, 190, 140, 90],
        Other: [90, 140, 190, 170, 150, 110, 80],
      },
    },
  },
  {
    id: 'health-round-2',
    name: 'Health Round 2',
    year: 2023,
    variables: ['heart_disease', 'asthma', 'stroke', 'arthritis', 'dengue', 'bp_12months', 'kidney_disease', 'kidney_dialysis'],
    metadata: {
      description: 'Second round of health data collection with additional focus on disease progression and treatment outcomes.',
      source: 'National Health Survey',
      lastUpdated: '2022-12-15',
      methodology: 'This survey implemented the WHO Health Observatory methodology with a three-stage sampling design. Primary sampling units were selected using probability proportional to size (PPS) sampling, followed by systematic sampling of households and random selection of eligible respondents. Data collection utilized a mixed-mode approach combining face-to-face interviews, self-administered questionnaires, and digital health records linkage.'
    },
    populationData: {
      ageGroups: ['0-9', '10-19', '20-29', '30-39', '40-49', '50-59', '60+'],
      maleData: {
        Malay: [480, 590, 680, 640, 490, 390, 290],
        Chinese: [390, 490, 590, 540, 440, 290, 190],
        Indian: [290, 340, 390, 290, 190, 140, 90],
        Other: [90, 140, 190, 170, 150, 110, 80],
      },
      femaleData: {
        Malay: [470, 570, 680, 630, 480, 380, 280],
        Chinese: [380, 470, 580, 520, 430, 280, 180],
        Indian: [270, 330, 380, 280, 180, 130, 80],
        Other: [80, 130, 180, 160, 140, 100, 70],
      },
    },
  }
]; 