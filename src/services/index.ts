import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import isBetween from 'dayjs/plugin/isBetween';
import { processUserData } from './user.services';
dayjs.extend(isBetween);
dayjs.extend(utc);

export { processUserData };
