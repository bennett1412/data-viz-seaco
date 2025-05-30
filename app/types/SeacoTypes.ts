export type Gender = "M" | "F";

export type Citizenship = "Malaysian"; // Extend as needed

export type Ethnicity = "Malay" | "Chinese" | "Indian" | "OrangAsli" | "Other";

export type MaritalStatus = "Single" | "Married" | "Divorced" | "Widowed" | "Separated";

export type SchoolType =
  | "National_Pri"
  | "National_Sec"
  | "Chinese_Pri"
  | "Tamil_Pri"
  | "Vocational"
  | "Religious";

export type EducationLevel = "Primary" | "Secondary" | "College" | "University";

export type Relationship =
  | "Head"
  | "Wife"
  | "Husband"
  | "Son"
  | "Daughter"
  | "Grandmother"
  | "Grandfather"
  | "Child";

export type YesNo = "Yes" | "No"; // For boolean-like string values in CSV

export type AreaType = "Urban" | "Rural";

export interface Individual {
  id: string;
  dob: string; // Format: DD/MM/YYYY
  age: string;
  gender: Gender;
  relationship: Relationship;
  citizenship: Citizenship;
  ethnicity: Ethnicity;
  marital_status: MaritalStatus;

  // Geographic information
  subdistrict: string;
  area_type: AreaType;
  latitude?: number;
  longitude?: number;

  education_current: YesNo;
  education_level: EducationLevel;
  school_type: SchoolType;

  literacy_en: YesNo;
  literacy_my: YesNo;
  literacy_cn: YesNo;
  literacy_tm: YesNo;

  income_personal: number;
  income_household: number;
  income_other: number;
  income_total: number;

  heart_disease: YesNo;
  asthma: YesNo;
  stroke: YesNo;
  arthritis: YesNo;
  dengue: YesNo;
  bp_12months: YesNo;
  kidney_disease: YesNo;
  kidney_dialysis: YesNo;

  bp_measured: YesNo;
  bp_diagnosed: YesNo;
  bp_12m_diagnosis: YesNo;
  bp_medication: YesNo;

  sugar_measured: YesNo;
  diabetes_diagnosed: YesNo;
  insulin_current: YesNo;
  diabetes_medication: YesNo;
}
