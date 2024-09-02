import { AmpmType, HourType, MinuteType } from '../types';

export const addMinutes = (
  pickerValue: {
    ampm: AmpmType;
    hour: HourType;
    minute: MinuteType;
  },
  minutesToAdd: number,
) => {
  let hour24 = parseInt(pickerValue.hour, 10);
  if (pickerValue.ampm === '오후' && hour24 !== 12) {
    hour24 += 12;
  }
  if (pickerValue.ampm === '오전' && hour24 === 12) {
    hour24 = 0;
  }

  // 새로운 Date 객체 생성
  const date = new Date();
  date.setHours(hour24);
  date.setMinutes(parseInt(pickerValue.minute, 10));

  // 50분 더하기
  date.setMinutes(date.getMinutes() + minutesToAdd);

  // 새로운 시간 반환
  const newHour = date.getHours().toString().padStart(2, '0');
  const newMinute = date.getMinutes().toString().padStart(2, '0');

  return `${newHour}:${newMinute}`;
};
