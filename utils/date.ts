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
