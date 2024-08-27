import {
  HOURS_PER_DAY,
  MINUTES_PER_HOUR,
  nameOfDays,
  SECONDS_PER_MINUTE,
} from '@/constants/date';

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

export const formatDateToKorean = (
  dateStr: string,
  maxLength = 4,
  separator = '-',
) => {
  const [year, month, date] = dateStr.split(separator);
  return `${+year.slice(-maxLength)}년 ${+month}월${date ? ` ${+date}일` : ''} `;
};

export const formatDateToKoreanExceptYear = (
  dateStr: string,
  separator = '-',
) => {
  const [, month, date] = dateStr.split(separator);
  return `${+month}월${date ? ` ${+date}일` : ''} `;
};

export const formatDateToDash = (dateStr: string) => {
  const [year, month, date] = dateStr.split(' ');

  const formattedMonth = month.replace('월', '').padStart(2, '0');
  const formattedDate = date.replace('일', '').padStart(2, '0');

  return `${year.replace('년', '')}-${formattedMonth}-${formattedDate}`;
};

export const convertTimeToElapsedTime = (time: string) => {
  const start = new Date(time);
  const end = new Date();

  const seconds = Math.floor((end.getTime() - start.getTime()) / 1000);
  if (seconds < SECONDS_PER_MINUTE) return '방금 전';

  const minutes = seconds / SECONDS_PER_MINUTE;
  if (minutes < MINUTES_PER_HOUR) return `${Math.floor(minutes)}분 전`;

  const hours = minutes / MINUTES_PER_HOUR;
  if (hours < HOURS_PER_DAY) return `${Math.floor(hours)}시간 전`;

  const days = hours / HOURS_PER_DAY;

  return `${Math.floor(days)}일 전`;
};
