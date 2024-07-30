import Link from 'next/link';
import type { PropsWithChildren } from 'react';

import { css, cx } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

import { Memory } from '../molecules/calendar';
import { ItemContent } from './calendar-item-content';

interface ItemLayoutProps {
  date: number;
  isToday: boolean;
}

interface CalendarItemProps extends ItemLayoutProps {
  memory: Memory | undefined;
  totalDistance?: number | undefined;
}

export const CalendarItem = ({ date, isToday, memory }: CalendarItemProps) => {
  if (!memory)
    return (
      <ItemLayout date={date} isToday={isToday}>
        <Link href={`/record`} className={linkContainerStyles} />
      </ItemLayout>
    );

  const { memoryId, type, totalDistance, strokes, isAchieved, imageUrl } =
    memory;

  return (
    <ItemLayout date={date} isToday={isToday}>
      <Link href={`/record-detail/${memoryId}`} className={linkContainerStyles}>
        {
          <ItemContent
            type={type}
            totalDistance={totalDistance}
            strokes={strokes}
            isAchieved={isAchieved}
            imageUrl={imageUrl}
          />
        }
      </Link>
      {totalDistance && <p>{totalDistance}</p>}{' '}
    </ItemLayout>
  );
};

const ItemLayout = ({
  date,
  isToday,
  children,
}: PropsWithChildren<ItemLayoutProps>) => {
  return (
    <li className={itemContainerStyles}>
      <p
        className={cx(
          DateStyles,
          isToday === true ? TodayDateStyles : EmptyStyles,
        )}
      >
        {date}
      </p>
      {children}
    </li>
  );
};

const itemContainerStyles = flex({
  width: 'full',
  height: 'full',
  flexDir: 'column',
  alignItems: 'center',

  '& > p': {
    height: '17px',
    textStyle: 'caption2',
    fontWeight: 'medium',
    textAlign: 'center',
  },
});

const DateStyles = css({
  padding: '2px',
  marginBottom: '5px',
  borderRadius: 'full',
});

const EmptyStyles = '';

const TodayDateStyles = css({
  backgroundColor: 'blue.60',
  color: 'white',
});

const linkContainerStyles = css({
  width: 'full',
  aspectRatio: 'auto 3 / 4',
  maxHeight: '120px',
  backgroundColor: 'background.gray',
  rounded: '2px',
});
