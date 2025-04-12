// Enums for fixed categories
export enum Gender {
  M = "M",
  F = "F",
}

export enum Citizenship {
  Malaysian = "Malaysian",
  // Add other citizenships if needed
}

export enum Ethnicity {
  Malay = "Malay",
  Chinese = "Chinese",
  Indian = "Indian",
  OrangAsli = "OrangAsli",
  Other = "Other",
}

export enum MaritalStatus {
  Single = "Single",
  Married = "Married",
  Divorced = "Divorced",
  Widowed = "Widowed",
  Separated = "Separated",
}

export enum SchoolType {
  National_Pri = "National_Pri",
  National_Sec = "National_Sec",
  Chinese_Pri = "Chinese_Pri",
  Tamil_Pri = "Tamil_Pri",
  Vocational = "Vocational",
  Religious = "Religious",
}

export enum EducationLevel {
  Primary = "Primary",
  Secondary = "Secondary",
  College = "College",
  University = "University",
}

export enum Relationship {
  Head = "Head",
  Wife = "Wife",
  Husband = "Husband",
  Son = "Son",
  Daughter = "Daughter",
  Grandmother = "Grandmother",
  Grandfather = "Grandfather",
  Child = "Child",
}

// Interface for literacy status
export interface LiteracyStatus {
  english: boolean;
  malay: boolean;
  chinese: boolean;
  tamil: boolean;
}

// Interface for income details
export interface Income {
  personal: number;
  household: number;
  other: number;
  total: number;
}

// Interface for education details
export interface Education {
  currentlyStudying: boolean;
  educationLevel: EducationLevel;
  schoolType: SchoolType;
}

// Main interface for an individual
export interface Individual {
  id: string;
  personalInfo: {
    dob: string; // Format: DD/MM/YYYY
    age: number;
    gender: Gender;
    relationship: Relationship;
    citizenship: Citizenship;
    ethnicity: Ethnicity;
    maritalStatus: MaritalStatus;
  };
  education: Education;
  literacy: LiteracyStatus;
  income: Income;
}
