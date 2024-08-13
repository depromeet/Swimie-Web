import dayjs from 'dayjs';
import { atom } from 'jotai';

export interface CalendarDate {
  year: number;
  month: number;
}

export const calendarDateAtom = atom<CalendarDate>({
  year: dayjs().get('year'),
  month: dayjs().get('month') + 1,
});

export const calendarSwimCountAtom = atom<number>(0);

export const calendarViewImageAtom = atom<boolean>(false);
