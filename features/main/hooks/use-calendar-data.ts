import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';

import { calendarDateAtom } from '@/store';
import { AuthInfoAtom } from '@/store/auth';

import { CalendarResponse } from '../types';

export const getCalendarData = async (year: number, month: number) => {
  const res = await fetch(`/api/memory/calendar?year=${year}&month=${month}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return res.json();
};

export const useCalendarData = () => {
  const { year, month } = useAtomValue(calendarDateAtom);
  const { nickname } = useAtomValue(AuthInfoAtom);

  return useQuery<CalendarResponse>({
    queryKey: ['calendarData', year, month, nickname],
    queryFn: () => getCalendarData(year, month),
    placeholderData: keepPreviousData,
  });
};
