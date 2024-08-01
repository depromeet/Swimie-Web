import { SwimmerIcon } from '@/components/atoms/icons/swimmer-icon';
import { css, cx } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

const memories = [];

export interface TimeLineData {
  memoryId: number;
  recordAt: string;
  startTime: string;
  endTime: string;
  lane: number;
  diary: string;
  totalMeter: number;
  memoryDetailId: number;
  item: string;
  heartRate: number;
  pace: string;
  kcal: number;
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
        <></>
      )}
    </>
  );
};

const fullspaceStyles = css({ width: 'full', height: 'full' });

const descriptionStyles = css({
  textStyle: 'body1.normal',
  fontWeight: 'semibold',
});

/*
{
  "memoryId": 1,
  "recordAt": "2024-07-21",
  "startTime": "11:00",
  "endTime": "11:50",
  "lane": 25,
  "diary": "나는 짱이야!! 내가 정말 멋져!!",
  "totalMeter": 250,
  "memoryDetailId": 1,
  "item": "오리발",
  "heartRate": 129,
  "pace": "05:00",
  "kcal": 300,
  "strokes": [
      {
          "strokeId": 1,
          "name": "자유형",
          "laps": 3,
          "meter": 150
      },
      {
          "strokeId": 2,
          "name": "평형",
          "laps": 2,
          "meter": 100
      }
  ],
  "images": []
}
*/
