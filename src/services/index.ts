import { ProcessedDataStorage, Step, USER } from '../types';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);
dayjs.extend(utc);

const formatDate = (dayJSOb: Dayjs) => {
  return dayJSOb.utc().format();
};

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
    // add to existing
    // find replace min - max
    addtoExistingMeasurement(storage, Number(data.measurement));
  } else {
    fromDT = onDate;
    toDT = fromDT.add(15, 'minute');
    // create new key, add into store
    addNewMeasurement(storage, Number(data.measurement), data);
  }
};

const addRange = (startDT: string) => {
  return formatDate(dayjs(startDT).add(15, 'minute'));
};

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

const processUserData = (userData: USER) => {
  if (userData.clinical_data.HEART_RATE.data.length === 0)
    return { ...userData, processedData: null };
  const store: ProcessedDataStorage[] = initialiseStore(userData);
  userData.clinical_data.HEART_RATE.data.map((stepData: Step) =>
    addToStorage(store, stepData)
  );
  const response = { ...userData, processedData: store };
  return { ...userData, processedData: mapingResponse(store) };
};

export { processUserData };
