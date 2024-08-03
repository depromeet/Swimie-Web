import Link from 'next/link';
import { PropsWithChildren } from 'react';

import { SwimmerIcon } from '@/components/atoms/icons/swimmer-icon';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';
import { getFormatDate, isTodayDate } from '@/utils';

import type { TimeLineMemory } from '../molecules';

interface TimeLineCardLayoutProps {
  date: string;
}

interface TimeLineCardProps {
  memory: TimeLineMemory;
}

export const TimeLineCard = ({ memory }: TimeLineCardProps) => {
  const { recordAt } = memory;
  return (
    <TimeLineCardLayout date={recordAt}>
      <TimeLineCardBody {...memory} />
    </TimeLineCardLayout>
  );
};

const TimeLineCardLayout = ({
  children,
  date,
}: PropsWithChildren<TimeLineCardLayoutProps>) => {
  const { month, day, weekday } = getFormatDate({ dateStr: date });
  return (
    <li>
      <p className={dateStyles}>
        {`${month}월 ${day}일 ${weekday}`}
        {isTodayDate(date) ? <span className={todayStyles}>Today</span> : ''}
      </p>
      {children}
    </li>
  );
};

const TimeLineCardBody = ({
  startTime,
  endTime,
  diary,
  totalMeter,
  memoryDetailId,
  kcal,
  strokes,
}: TimeLineMemory) => {
  return (
    <Link
      href={`/record-detail/${memoryDetailId}`}
      className={cardWrapperStyles}
    >
      <div className={flex()}>
        <div className={titleStyles}>
          {totalMeter ? (
            <p>{formatMeters(totalMeter)}m</p>
          ) : (
            <div className={completeStyles}>
              <p>수영 완료</p>
              <SwimmerIcon width={36} height={36} />
            </div>
          )}
          <div className={descriptionStyles}>
            {startTime && endTime && <p>{`${startTime} ~ ${endTime}`}</p>}
            {kcal && <p>{kcal}kcal</p>}
          </div>
        </div>
      </div>
      {strokes && <div>영법별 거리</div>}
      {diary && <p className={diaryStyles}>{diary}</p>}
    </Link>
  );
};

const formatMeters = (price: number) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const dateStyles = css({ textStyle: 'label1.normal', fontWeight: 'bold' });

const todayStyles = css({ paddingLeft: '6px', color: 'blue.60' });

const cardWrapperStyles = flex({
  padding: '20px',
  direction: 'column',
  gap: '12px',
  justifyContent: 'center',
  backgroundColor: 'background.gray',
  borderRadius: '6px',
});

const titleStyles = flex({
  direction: 'column',
  '& > p': { textStyle: 'heading1', fontWeight: 'bold' },
});

const completeStyles = flex({
  gap: '8px',
  textStyle: 'heading2',
  fontWeight: 'bold',
  alignItems: 'center',
});

const descriptionStyles = flex({
  gap: '14px',
  textStyle: 'label1.normal',
  fontWeight: 'medium',
  color: 'neutral.70',
});

const diaryStyles = css({
  textStyle: 'label1.normal',
  fontWeight: 'medium',
  color: 'neutral.70',
});
