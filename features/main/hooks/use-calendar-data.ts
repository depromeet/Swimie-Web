import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';

import { calendarDateAtom } from '@/store';
import { AuthInfoAtom } from '@/store/auth';

import { CalendarResponse } from '../types';

export const getCalendarData = async (
  year: number,
  month: number,
  targetId?: number,
) => {
  const res = await fetch(
    `/api/memory/calendar?year=${year}&month=${month}&targetId=${targetId || ''}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  return res.json();
};

export const useCalendarData = (targetId?: number) => {
  const { year, month } = useAtomValue(calendarDateAtom);
  const { nickname } = useAtomValue(AuthInfoAtom);

  return useQuery<CalendarResponse>({
    queryKey: ['calendarData', year, month, nickname, targetId],
    queryFn: () => getCalendarData(year, month, targetId),
    placeholderData: keepPreviousData,
    retry: 3,
  });
};
