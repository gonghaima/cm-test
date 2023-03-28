import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);
dayjs.extend(utc);

const formatDate = (dayJSOb: Dayjs) => {
  return dayJSOb.utc().format();
};
const addRange = (startDT: string) => {
  return formatDate(dayjs(startDT).add(15, 'minute'));
};

export { addRange, formatDate };
