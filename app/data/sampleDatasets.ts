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
    id: '1',
    name: 'Population Survey 2020',
    year: 2020,
    variables: ['age', 'gender', 'ethnicity', 'education', 'income'],
    metadata: {
      description: 'Comprehensive population survey conducted in 2020',
      source: 'National Statistics Office',
      lastUpdated: '2020-12-31',
      methodology: 'Data collection followed WHO STEPS methodology for chronic disease risk factor surveillance. Multi-stage stratified random sampling was employed, with primary sampling units (PSUs) selected based on population density and socioeconomic status. Face-to-face interviews were conducted using standardized WHO STEPS questionnaires, complemented by physical measurements (height, weight, blood pressure) and biochemical measurements (fasting blood glucose, lipids). Quality control measures included double data entry, regular field supervision, and 10% random back-checking of completed interviews. Sample size of 10,000 households was determined using power analysis to achieve 95% confidence level with 5% margin of error.'
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
    id: 'dataset-2019',
    name: 'Population Survey 2019',
    year: 2019,
    variables: ['age', 'gender', 'ethnicity', 'employment'],
    metadata: {
      description: 'Annual population survey for 2019',
      source: 'National Statistics Office',
      lastUpdated: '2019-12-31',
      methodology: 'Following the Global Health Observatory (GHO) guidelines, this survey utilized a two-stage cluster sampling design. First stage involved random selection of enumeration blocks, followed by systematic sampling of households within selected blocks. Data collection was conducted through a combination of Computer-Assisted Personal Interviewing (CAPI) and paper-based questionnaires. The survey team included trained field supervisors, interviewers, and medical technicians. Quality assurance protocols included pre-field training, pilot testing, daily data validation, and 15% random field verification. Ethical clearance was obtained from the National Medical Research Ethics Committee.'
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
  },
  {
    id: 'dataset-2018',
    name: 'Population Survey 2018',
    year: 2018,
    variables: ['age', 'gender', 'ethnicity', 'health'],
    metadata: {
      description: 'Annual population survey for 2018',
      source: 'National Statistics Office',
      lastUpdated: '2018-12-31',
      methodology: 'This survey implemented the WHO Health Observatory methodology with a three-stage sampling design. Primary sampling units were selected using probability proportional to size (PPS) sampling, followed by systematic sampling of households and random selection of eligible respondents. Data collection utilized a mixed-mode approach combining face-to-face interviews, self-administered questionnaires, and digital health records linkage where available. The survey incorporated WHO core indicators for health system performance assessment. Quality control measures included standardized training protocols, regular field monitoring, and data consistency checks. The sampling frame was updated using the latest population census data to ensure representativeness.'
    },
    populationData: {
      ageGroups: ['0-9', '10-19', '20-29', '30-39', '40-49', '50-59', '60+'],
      maleData: {
        Malay: [470, 580, 670, 630, 480, 380, 280],
        Chinese: [380, 480, 580, 530, 430, 280, 180],
        Indian: [280, 330, 380, 280, 180, 130, 80],
        Other: [80, 130, 180, 160, 140, 100, 70],
      },
      femaleData: {
        Malay: [460, 560, 670, 620, 470, 370, 270],
        Chinese: [370, 460, 570, 510, 420, 270, 170],
        Indian: [260, 320, 370, 270, 170, 120, 70],
        Other: [70, 120, 170, 150, 130, 90, 60],
      },
    },
  },
]; 