import { ProcessedDataStorage, Step, USER } from '../types';
import dayjs from 'dayjs';
import { formatDate, addRange } from './date.services';

/**
 * It adds to current intervals, which takes in a store of processed data and a measurement, and adds the measurement to the last item
 * in the store
 * @param {ProcessedDataStorage[]} store - This is the array of objects that we are storing the data
 * in.
 * @param {number} measurement - number - the measurement to be added to the store
 */
const addtoExistingMeasurement = (
  store: ProcessedDataStorage[],
  measurement: number
) => {
  store[store.length - 1].measurement.high = Math.max(
    Number(store[store.length - 1].measurement.high),
    measurement
  ).toString();
  store[store.length - 1].measurement.low = Math.min(
    Number(store[store.length - 1].measurement.low),
    measurement
  ).toString();
};

/**
 * It create & add into a new intervals, which takes a measurement, a step data object, and a store of processed data. It then creates a new
 * processed data object and pushes it to the store
 * @param {ProcessedDataStorage[]} store - ProcessedDataStorage[]
 * @param {number} measurement - number - the measurement value
 * @param {Step} stepData - Step
 */
const addNewMeasurement = (
  store: ProcessedDataStorage[],
  measurement: number,
  stepData: Step
) => {
  const processedDataStorage: ProcessedDataStorage = {
    from_date_key: stepData.on_date,

    from_date: formatDate(dayjs(stepData.on_date)),
    to_date: addRange(stepData.on_date),
    measurement: {
      low: measurement.toString(),
      high: measurement.toString(),
    },
  };
  store.push(processedDataStorage);
};

const addToStorage = (storage: ProcessedDataStorage[], data: Step) => {
  let fromDT = dayjs(storage[storage.length - 1].from_date_key);
  let toDT = fromDT.add(15, 'minute');
  const onDate = dayjs(data.on_date);

  if (onDate.isSame(fromDT) || onDate.isBetween(fromDT, toDT)) {
    addtoExistingMeasurement(storage, Number(data.measurement));
  } else {
    fromDT = onDate;
    toDT = fromDT.add(15, 'minute');
    addNewMeasurement(storage, Number(data.measurement), data);
  }
};

/**
 * Initialise store, it takes the first date from the user's heart rate data and returns an array with an object
 * containing the date, the date plus 7 days, and the heart rate measurement
 * @param {USER} userData - USER - this is the data that is passed in from the parent component.
 * @returns An array of objects.
 */
const initialiseStore = (userData: USER) => {
  return [
    {
      from_date_key: userData.clinical_data.HEART_RATE.data[0].on_date,

      from_date: formatDate(
        dayjs(userData.clinical_data.HEART_RATE.data[0].on_date)
      ),
      to_date: addRange(userData.clinical_data.HEART_RATE.data[0].on_date),
      measurement: {
        low: userData.clinical_data.HEART_RATE.data[0].measurement,
        high: userData.clinical_data.HEART_RATE.data[0].measurement,
      },
    },
  ];
};

const mapingResponse = (storeData: ProcessedDataStorage[]) => {
  return storeData.map((store) => {
    delete store.from_date_key;
    return store;
  });
};

/**
 * It takes a user object, and returns a new user object with a new property called processedData
 * @param {USER} userData - USER
 * @returns An object with the same properties as the userData object, but with an additional property
 * called processedData.
 */
const processUserData = (userData: USER) => {
  if (userData.clinical_data.HEART_RATE.data.length === 0)
    return { ...userData, processedData: null };
  const store: ProcessedDataStorage[] = initialiseStore(userData);
  userData.clinical_data.HEART_RATE.data.map((stepData: Step) =>
    addToStorage(store, stepData)
  );
  return { ...userData, processedData: mapingResponse(store) };
};

export { processUserData };
