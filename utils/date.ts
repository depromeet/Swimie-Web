import { nameOfDays } from '@/constants/date';

type GetDate = {
  dateStr: string;
  padNum?: number;
};

/**
 * 주어진 날짜 문자열을 형식화하여 반환합니다.
 *
 * @param {string} params.dateStr - 형식화할 날짜 문자열
 * @param {number} [params.padNum] - 월과 일을 패딩할 자리수 (없을 경우 패딩 없이 반환)
 * @returns {Object} 날짜 객체 (연도, 월, 일, 요일)
 */
export const getFormatDate = ({ dateStr, padNum }: GetDate) => {
  const date = new Date(dateStr);

  const originMonth = String(date.getMonth() + 1);
  const originDay = String(date.getDate());

  const year = String(date.getFullYear()).slice(2);
  const month = padNum ? originMonth.padStart(padNum, '0') : originMonth;
  const day = padNum ? originDay.padStart(padNum, '0') : originDay;
  const weekday = nameOfDays[date.getDay()];

  return {
    year,
    month,
    day,
    weekday,
  };
};

export const isTodayDate = (dateStr: string) => {
  const targetDate = new Date(dateStr);
  const today = new Date();
  return (
    targetDate.getFullYear() === today.getFullYear() &&
    targetDate.getMonth() === today.getMonth() &&
    targetDate.getDate() === today.getDate()
  );
};

export const getToday = () => {
  const today = new Date();
  return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
};

export const formatDateToKorean = (dateStr: string, separator = '-') => {
  const [year, month, date] = dateStr.split(separator);
  return `${year}년 ${+month}월 ${+date}일`;
};
