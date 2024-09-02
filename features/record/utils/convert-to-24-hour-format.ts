import { AmpmType, HourType, MinuteType } from '../types';

export const convertTo24HourFormat = (pickerValue: {
  ampm: AmpmType;
  hour: HourType;
  minute: MinuteType;
}) => {
  let hour24 = parseInt(pickerValue.hour, 10);

  if (pickerValue.ampm === '오후' && hour24 !== 12) {
    hour24 += 12;
  }

  if (pickerValue.ampm === '오전' && hour24 === 12) {
    hour24 = 0;
  }

  return `${hour24.toString().padStart(2, '0')}:${pickerValue.minute}`;
};
