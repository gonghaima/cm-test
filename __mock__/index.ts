import { HeartRateData } from '../src/types';

const heartRateData: HeartRateData[] = [
  {
    on_date: '2020-10-06T06:48:17.503000Z',
    measurement: '111',
  },
  {
    on_date: '2020-10-06T06:48:38.065000Z',
    measurement: '66',
  },
  {
    on_date: '2020-10-06T06:55:36.001000Z',
    measurement: '148',
  },
  {
    on_date: '2020-10-06T06:59:07.841000Z',
    measurement: '142',
  },
  {
    on_date: '2020-10-06T07:01:35.759000Z',
    measurement: '138',
  },
  {
    on_date: '2020-10-06T07:15:06.645000Z',
    measurement: '134',
  },
];

const prepareClinicalData = (data: HeartRateData[]) => ({
  clinical_data: {
    HEART_RATE: {
      uom: 'beats/min',
      data: data,
      name: 'Heart Rate',
    },
    WEIGHT: {
      uom: 'Kg',
      name: 'Weight',
    },
    BLOOD_GLUCOSE_LEVELS: {
      uom: 'mmol/L',
      name: 'Blood Glucose',
    },
    HEIGHT: {
      uom: 'cm',
      name: 'Height',
    },
    BP: {
      uom: 'mmHg',
      name: 'Blood Pressure',
    },
    STEPS: {
      uom: '',
      data: [
        {
          on_date: '2020-10-05T13:00:00.000000Z',
          measurement: '11031',
        },
        {
          on_date: '2020-10-06T13:00:00.000000Z',
          measurement: '4667',
        },
        {
          on_date: '2020-10-07T13:00:00.000000Z',
          measurement: '13030',
        },
        {
          on_date: '2020-10-08T13:00:00.000000Z',
          measurement: '3048',
        },
      ],
      name: 'Steps',
    },
  },
  patient_id: 'gk6dhgh-9a60-4980-bb8b-787bf82689d7',
  from_healthkit_sync: true,
  orgId: '8gj4djk6s-a5ad-444b-b58c-358dcbd72dc3',
  timestamp: '2020-10-09T05:36:31.381Z',
});

const userData = prepareClinicalData(heartRateData);

const userDataWithEmptyPayload = prepareClinicalData([]);

const result = [
  {
    from_date: '2020-10-06T06:48:17Z',
    to_date: '2020-10-06T07:03:17Z',
    measurement: {
      low: '66',
      high: '148',
    },
  },
  {
    from_date: '2020-10-06T07:15:06Z',
    to_date: '2020-10-06T07:30:06Z',
    measurement: {
      low: '134',
      high: '134',
    },
  },
];

const prepareProcessedData = (
  result: any,
  data: /* A type that allows us to assign any value to
a variable. */
  any
) => ({
  clinical_data: {
    HEART_RATE: {
      uom: 'beats/min',
      data,
      name: 'Heart Rate',
    },
    WEIGHT: {
      uom: 'Kg',
      name: 'Weight',
    },
    BLOOD_GLUCOSE_LEVELS: {
      uom: 'mmol/L',
      name: 'Blood Glucose',
    },
    HEIGHT: {
      uom: 'cm',
      name: 'Height',
    },
    BP: {
      uom: 'mmHg',
      name: 'Blood Pressure',
    },
    STEPS: {
      uom: '',
      data: [
        {
          on_date: '2020-10-05T13:00:00.000000Z',
          measurement: '11031',
        },
        {
          on_date: '2020-10-06T13:00:00.000000Z',
          measurement: '4667',
        },
        {
          on_date: '2020-10-07T13:00:00.000000Z',
          measurement: '13030',
        },
        {
          on_date: '2020-10-08T13:00:00.000000Z',
          measurement: '3048',
        },
      ],
      name: 'Steps',
    },
  },
  patient_id: 'gk6dhgh-9a60-4980-bb8b-787bf82689d7',
  from_healthkit_sync: true,
  orgId: '8gj4djk6s-a5ad-444b-b58c-358dcbd72dc3',
  timestamp: '2020-10-09T05:36:31.381Z',
  processedData: result,
});

const expectedResult = prepareProcessedData(result, heartRateData);
const expectedResultWithEmptyPayload = prepareProcessedData(null, []);

export {
  userData,
  userDataWithEmptyPayload,
  expectedResult,
  expectedResultWithEmptyPayload,
};
