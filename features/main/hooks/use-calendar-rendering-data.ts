'use client';

import dayjs from 'dayjs';
import { useAtomValue } from 'jotai';

import { calendarDateAtom } from '@/store';

/**
 * ex) CALENDAR_FORMAT_6_COLUMNS  | ex) CALENDAR_FORMAT_5_COLUMNS
 * [2024.06]                      | [2024.07]
 *   S   M   T   W   T   F   S    |   S   M   T   W   T   F   S
 *                           1    |       1   2   3   4   5   6
 *   2   3   4   5   6   7   8    |   7   8   9  10  11  12  13
 *   9  10  11  12  13  14  15    |  14  15  16  17  18  19  20
 *  16  17  18  19  20  21  22    |  21  22  23  24  25  26  27
 *  23  24  25  26  27  28  29    |  28  29  30  31
 *  30                            |
 */
const CALENDAR_FORMAT_5_COLUMNS = 35;
const CALENDAR_FORMAT_6_COLUMNS = 42;

/**
 * @description 달력을 그리는데 필요한 정보를 제공하기 위해 사용합니다.
 */
export const useCalendarRendaringData = () => {
  const currentDate = useAtomValue(calendarDateAtom);

  const { year, month } = currentDate;
  const targetDate = dayjs(`${year}-${month}-01`);
  const startPoint = targetDate.get('day');
  const totalDays = targetDate.add(1, 'month').subtract(1, 'day').get('date');
  const endPoint = startPoint + totalDays - 1;
  const squares = Array.from(
    {
      length:
        endPoint >= CALENDAR_FORMAT_5_COLUMNS
          ? CALENDAR_FORMAT_6_COLUMNS
          : CALENDAR_FORMAT_5_COLUMNS,
    },
    (_, i) => i + 1,
  );

  const today = dayjs();
  const todayYear = today.get('year');
  const todayMonth = today.get('month') + 1;
  const todayDate = today.get('date');

  const isDateToday = (targetDate: number) => {
    if (todayYear !== year) return false;
    else if (todayMonth !== month) return false;
    else if (todayDate !== targetDate) return false;
    return true;
  };

  const isDateFuture = (targetDate: number) => {
    if (todayYear < year) return true;
    else if (todayYear > year) return false;

    if (todayMonth < month) return true;
    else if (todayMonth > month) return false;

    if (todayDate >= targetDate) return false;
    return true;
  };

  return [squares, startPoint, endPoint, isDateToday, isDateFuture] as const;
};
