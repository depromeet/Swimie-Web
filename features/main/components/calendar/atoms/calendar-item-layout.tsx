import { PropsWithChildren } from 'react';

import { css, cx } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

interface CalendarItemLayoutProps {
  date: number;
  isToday?: boolean;
}

export const CalendarItemLayout = ({
  date,
  isToday = false,
  children,
}: PropsWithChildren<CalendarItemLayoutProps>) => {
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
  height: 'fit-content',
  flexDir: 'column',
  alignItems: 'center',

  '& > p': {
    height: '18px',
    textStyle: 'caption2',
    fontWeight: 'medium',
    textAlign: 'center',
  },
});

const DateStyles = css({
  padding: '2px',
  width: '18px',
  marginBottom: '5px',
  borderRadius: 'full',
  wordBreak: 'keep-all',
});

const EmptyStyles = '';

const TodayDateStyles = css({
  backgroundColor: 'blue.60',
  color: 'white',
});
