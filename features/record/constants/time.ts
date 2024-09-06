import { AmpmType, HourType, MinuteType } from '../types';

export const timeOptions = {
  ampm: ['오전', '오후'],
  hour: [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
  ],
  minute: [
    '00',
    '05',
    '10',
    '15',
    '20',
    '25',
    '30',
    '35',
    '40',
    '45',
    '50',
    '55',
  ],
};

export const defaultPickerValue = {
  ampm: '오후' as AmpmType,
  hour: '02' as HourType,
  minute: '05' as MinuteType,
};
