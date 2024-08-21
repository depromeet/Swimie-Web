import Link from 'next/link';
import { PropsWithChildren, useEffect, useRef, useState } from 'react';

import { Image, SwimmerIcon } from '@/components/atoms';
import { TimeLineContent } from '@/features/main/types';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';
import { formatMeters, getFormatDate, isTodayDate } from '@/utils';

import { SwimRecordChart } from '../atoms/swim-record-chart';

interface TimeLineCardLayoutProps {
  date: string;
}

interface TimeLineCardProps {
  isViewDate?: boolean;
  content: TimeLineContent;
}

export const TimeLineCard = ({
  isViewDate = true,
  content,
}: TimeLineCardProps) => {
  const { recordAt } = content;

  if (isViewDate)
    return (
      <TimeLineCardLayout date={recordAt}>
        <TimeLineCardBody {...content} />
      </TimeLineCardLayout>
    );

  return <TimeLineCardBody {...content} />;
};

const TimeLineCardLayout = ({
  children,
  date,
}: PropsWithChildren<TimeLineCardLayoutProps>) => {
  const { day, weekday } = getFormatDate({ dateStr: date });
  return (
    <div className={flex({ direction: 'column', gap: '10px' })}>
      <p className={dateStyles}>
        {`${day}일 ${weekday}`}
        {isTodayDate(date) ? <span className={todayStyles}>Today</span> : ''}
      </p>
      {children}
    </div>
  );
};

const TimeLineCardBody = ({
  type,
  startTime,
  endTime,
  diary,
  totalDistance,
  memoryId,
  kcal,
  strokes,
  isAchieved,
  imageUrl,
}: TimeLineContent) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [currentWidth, setCurrentWidth] = useState<number>(0);

  useEffect(() => {
    if (ref.current) setCurrentWidth(ref.current.offsetWidth);
  }, []);

  return (
    <Link href={`/record-detail/${memoryId}`} className={cardWrapperStyles}>
      <div className={cardInfoStyles} ref={ref}>
        <div className={titleStyles}>
          {type !== 'NORMAL' && totalDistance ? (
            <p>{formatMeters(totalDistance)}m</p>
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
        {imageUrl && (
          <div className={imageWrapperStyles}>
            <Image src={imageUrl} alt="recorded image" fill />
          </div>
        )}
      </div>
      {strokes && totalDistance && isAchieved !== undefined && (
        <SwimRecordChart
          width={currentWidth}
          isAchieved={isAchieved}
          totalDistance={totalDistance}
          strokes={strokes}
        />
      )}
      {diary && (
        <p className={diaryStyles} style={{ WebkitBoxOrient: 'vertical' }}>
          {diary}
        </p>
      )}
    </Link>
  );
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

const cardInfoStyles = flex({
  height: '100%',
  justifyContent: 'space-between',
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

const imageWrapperStyles = flex({
  position: 'relative',
  width: '48px',
  height: '60px',
  alignItems: 'center',
  justifyContent: 'center',
  rounded: '2px',
  overflow: 'hidden',
});

const diaryStyles = css({
  maxHeight: '2.5rem',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  wordBreak: 'break-word',
  display: '-webkit-box',
  WebkitLineClamp: '2',
  textStyle: 'label1.normal',
  fontWeight: 'medium',
  color: 'neutral.70',
});
