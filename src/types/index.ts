export interface USER {
  clinical_data: ClinicalData;
  patient_id: string;
  from_healthkit_sync: boolean;
  orgId: string;
  timestamp: string;
}

export interface ClinicalData {
  HEART_RATE: HeartRate;
  WEIGHT: Weight;
  BLOOD_GLUCOSE_LEVELS: BloodGlucoseLevels;
  HEIGHT: Height;
  BP: Bp;
  STEPS: Steps;
}

export interface HeartRate {
  uom: string;
  data: HeartRateData[];
  name: string;
}

export interface HeartRateData {
  on_date: string;
  measurement: string;
}

export interface Weight {
  uom: string;
  name: string;
}

export interface BloodGlucoseLevels {
  uom: string;
  name: string;
}

export interface Height {
  uom: string;
  name: string;
}

export interface Bp {
  uom: string;
  name: string;
}

export interface Steps {
  uom: string;
  data: Step[];
  name: string;
}

export interface Step {
  on_date: string;
  measurement: string;
}

export interface ProcessedData {
  from_date: string;
  to_date: string;
  measurement: Measurement;
}

export interface ProcessedDataStorage extends ProcessedData {
  from_date_key?: string;
}

export interface Measurement {
  low: string;
  high: string;
}

export interface UserDataResponse extends USER, ProcessedData {}
