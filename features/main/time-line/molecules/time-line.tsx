import { SwimmerIcon } from '@/components/atoms/icons/swimmer-icon';
import { css, cx } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

import { TimeLineCard } from '../atoms';

const memories: Array<TimeLineMemory> = [
  {
    memoryId: 1,
    recordAt: '2024-08-03',
    startTime: '01:00',
    endTime: '01:50',
    lane: 25,
    diary: '나는 짱이야!! 내가 정말 멋져!!',
    totalMeter: 250,
    memoryDetailId: 1,
    kcal: 300,
    strokes: [
      {
        strokeId: 1,
        name: '자유형',
        laps: 3,
        meter: 150,
      },
      {
        strokeId: 2,
        name: '평형',
        laps: 2,
        meter: 100,
      },
    ],
    images: [],
  },
  {
    memoryId: 2,
    recordAt: '2024-08-10',
    startTime: '22:00',
    endTime: '23:10',
    lane: 25,
    diary:
      '1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890',
    memoryDetailId: 2,
    images: [],
  },

  {
    memoryId: 3,
    recordAt: '2024-08-10',
    startTime: '22:00',
    endTime: '23:10',
    lane: 25,
    memoryDetailId: 3,
    images: [],
  },
  {
    memoryId: 4,
    recordAt: '2024-08-28',
    startTime: '11:00',
    endTime: '11:50',
    lane: 25,
    diary: '나는 짱이야!! 내가 정말 멋져!!',
    totalMeter: 1250,
    memoryDetailId: 4,
    kcal: 300,
    strokes: [
      {
        strokeId: 1,
        name: '자유형',
        laps: 3,
        meter: 150,
      },
      {
        strokeId: 2,
        name: '평형',
        laps: 2,
        meter: 100,
      },
    ],
    images: [],
  },
];

export interface StrokeInfo {
  strokeId: number;
  name: string;
  laps: number;
  meter: number;
}

export interface TimeLineMemory {
  memoryId: number;
  recordAt: string;
  startTime?: string;
  endTime?: string;
  lane: number;
  diary?: string;
  totalMeter?: number;
  memoryDetailId: number;
  kcal?: number;
  strokes?: Array<StrokeInfo>;
  images: Array<string>;
}

export const TimeLine = () => {
  const isEmptyTimeLine = memories.length === 0;
  return (
    <>
      {isEmptyTimeLine ? (
        <div
          className={cx(
            fullspaceStyles,
            flex({
              direction: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }),
          )}
        >
          <SwimmerIcon width={96} height={96} />
          <p className={descriptionStyles}>아직 수영 기록이 없어요!</p>
        </div>
      ) : (
        <ol>
          {memories.map((memory) => (
            <TimeLineCard key={memory.memoryId} memory={memory} />
          ))}
        </ol>
      )}
    </>
  );
};

const fullspaceStyles = css({ width: 'full', height: 'full' });

const descriptionStyles = css({
  textStyle: 'body1.normal',
  fontWeight: 'semibold',
});
