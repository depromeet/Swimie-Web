'use client';

import { useCalendarRendaringData } from '@/hooks/use-calendar-rendering-data';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

import { CalendarItem, DayLabels } from '../atoms';
import { CalendarHeader } from './calendar-header';

export type MemoryType = 'NORMAL' | 'SINGLE' | 'MULTI';

export interface Strokes {
  자유형?: number;
  평영?: number;
  배영?: number;
  접영?: number;
  킥판?: number;
}

export interface Memory {
  memoryId: number;
  memoryDate: number;
  type: MemoryType;
  totalDistance?: number;
  isAchieved?: boolean;
  strokes?: Strokes;
  imageUrl?: string;
}

// TODO: 테스트용 임시 데이터이므로 API 연동 후 위의 타입 정의와 함께 제거 필요
const memories: Array<Memory> = [
  { memoryId: 1, memoryDate: 2, type: 'NORMAL' },
  {
    memoryId: 2,
    memoryDate: 3,
    type: 'SINGLE',
    totalDistance: 1000,
    isAchieved: true,
    imageUrl:
      'https://github.com/user-attachments/assets/2188e166-b34f-47c7-b978-30bd0f39df3a',
  },
  {
    memoryId: 3,
    memoryDate: 6,
    type: 'MULTI',
    totalDistance: 1000,
    strokes: { 자유형: 200, 평영: 200, 배영: 200, 접영: 400 },
    isAchieved: true,
  },
  {
    memoryId: 4,
    memoryDate: 8,
    type: 'MULTI',
    totalDistance: 900,
    strokes: { 자유형: 300, 평영: 200, 배영: 200, 접영: 200 },
    isAchieved: false,
    imageUrl:
      'https://github.com/user-attachments/assets/2188e166-b34f-47c7-b978-30bd0f39df3a',
  },
  {
    memoryId: 5,
    memoryDate: 11,
    type: 'SINGLE',
    totalDistance: 700,
    isAchieved: false,
  },
  {
    memoryId: 6,
    memoryDate: 15,
    type: 'MULTI',
    totalDistance: 500,
    strokes: { 자유형: 300, 접영: 200 },
    isAchieved: false,
    imageUrl:
      'https://github.com/user-attachments/assets/2188e166-b34f-47c7-b978-30bd0f39df3a',
  },
  {
    memoryId: 7,
    memoryDate: 17,
    type: 'MULTI',
    totalDistance: 1000,
    strokes: { 자유형: 600, 평영: 200, 배영: 200 },
    isAchieved: true,
    imageUrl:
      'https://github.com/user-attachments/assets/2188e166-b34f-47c7-b978-30bd0f39df3a',
  },
  {
    memoryId: 8,
    memoryDate: 21,
    type: 'MULTI',
    totalDistance: 1000,
    strokes: { 자유형: 600, 배영: 400 },
    isAchieved: true,
    imageUrl:
      'https://github.com/user-attachments/assets/2188e166-b34f-47c7-b978-30bd0f39df3a',
  },
  {
    memoryId: 9,
    memoryDate: 22,
    type: 'MULTI',
    totalDistance: 1000,
    strokes: { 자유형: 600, 접영: 400 },
    isAchieved: true,
    imageUrl:
      'https://github.com/user-attachments/assets/2188e166-b34f-47c7-b978-30bd0f39df3a',
  },
];

export const Calendar = () => {
  const [squares, startPoint, endPoint, isDateToday] =
    useCalendarRendaringData();
  let memoryIndex = 0;

  return (
    <div className={calendarContainerStyles}>
      <CalendarHeader />
      <DayLabels />
      <ul className={CalendarGridStyles}>
        {squares.map((squareNumber, index) => {
          const isInRenderingRange = index >= startPoint && index <= endPoint;
          const date = squareNumber - startPoint;
          const isValidMemory =
            memoryIndex < memories.length &&
            memories[memoryIndex].memoryDate === date;
          const currentMemory = isValidMemory
            ? memories[memoryIndex++]
            : undefined;

          return isInRenderingRange ? (
            <CalendarItem
              key={squareNumber}
              date={date}
              isToday={isDateToday(date)}
              memory={currentMemory}
            />
          ) : (
            <div key={`out-of-range-${index}`} />
          );
        })}
      </ul>
    </div>
  );
};

const calendarContainerStyles = flex({
  width: 'full',
  height: 'full',
  flexDir: 'column',
  gap: '16px',
});

const CalendarGridStyles = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  gridRowGap: '10px',
  gridColumnGap: '3px',
  color: 'text.alternative',
});
