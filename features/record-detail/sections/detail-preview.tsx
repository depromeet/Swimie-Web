'use client';

import { useRouter } from 'next/navigation';

import { Image } from '@/components/atoms';
import { RecordMark } from '@/components/molecules';
import placeholderImage from '@/public/images/fallbackImage.png';
import { SwimToolName } from '@/public/images/swim-tools';
import { css } from '@/styled-system/css';
import { flex, grid } from '@/styled-system/patterns';
import { getFormatTime } from '@/utils';

import { DatePicker, SwimStatsItem, SwimToolItem } from '../components';
import { type RecordDetailType } from '../types';

export const DetailPreviewSection = ({ data }: { data: RecordDetailType }) => {
  const router = useRouter();

  const handleClickPreviousDate = () => {
    if (!data.prevId) return;
    router.replace(`/record-detail/${data.prevId}`);
  };

  const handleClickNextDate = () => {
    if (!data.nextId) return;
    router.replace(`/record-detail/${data.nextId}`);
  };

  const {
    startTime,
    endTime,
    lane,
    strokes,
    totalLap,
    totalMeter,
    recordAt,
    member,
    memoryDetail,
    type,
  } = data;

  const { hour: startHour, minute: startMinute } = getFormatTime({
    timeStr: startTime,
    type: 'string',
  });
  const { hour: endHour, minute: endMinute } = getFormatTime({
    timeStr: endTime,
    type: 'string',
  });

  const swimToolArr = (memoryDetail?.item?.split(',') ?? []) as SwimToolName[];
  return (
    <section className={containerStyle}>
      {/* NOTE: 상단 그래프 영역 */}
      <div className={graphArea.container}>
        {/* 날짜 선택 */}
        <DatePicker
          recordDateStr={recordAt}
          onClickPrevious={data.prevId ? handleClickPreviousDate : undefined}
          onClickNext={data.nextId ? handleClickNextDate : undefined}
        />

        {/* 파도 svg */}
        <div className={wavesStyle}>
          {strokes?.length && member?.goal ? (
            <RecordMark
              isAchieved={Boolean(
                member?.goal && totalMeter && totalMeter > member?.goal,
              )}
              strokes={strokes}
              totalDistance={totalMeter}
              type={type}
              renderType="detail"
              goal={member.goal}
            />
          ) : (
            <Image
              src={placeholderImage}
              alt="placeholder"
              fill
              style={{
                objectFit: 'cover',
              }}
            />
          )}
          {member?.goal && (
            <p className={goalText}>목표 {member.goal.toLocaleString()}m</p>
          )}
        </div>

        {/* preview description */}
        <div className={graphArea.textWrapper}>
          <div className={graphText.titleContainer}>
            {!totalMeter ? (
              <h1 className={graphText.placeholder}>{'오늘 수영 완료'}</h1>
            ) : (
              <>
                <h1 className={graphText.title}>
                  {totalMeter.toLocaleString()}
                </h1>
                <span className={graphText.unit}>m</span>
              </>
            )}
          </div>
          <p className={graphText.detail}>
            <span>
              {`${startHour}:${startMinute}`} ~ {`${endHour}:${endMinute}`}
            </span>
            {totalLap && <span>{totalLap} lap</span>}
            {lane && <span>{lane}m 레인</span>}
          </p>
        </div>
      </div>

      {/* NOTE: 통계 영역 */}
      {Boolean(strokes?.length) && (
        <div className={statsContainer}>
          {strokes.map((item) => (
            <SwimStatsItem key={item.strokeId} item={item} />
          ))}
        </div>
      )}

      {/* NOTE: 수영 장비 영역 */}
      {Boolean(swimToolArr.length) && (
        <div className={toolsContainer}>
          {swimToolArr.map((tool, index) => (
            <SwimToolItem key={index} name={tool} />
          ))}
        </div>
      )}
    </section>
  );
};

const containerStyle = css({
  backgroundColor: 'white',
});

const wavesStyle = flex({
  position: 'relative',
  width: 'full',
  aspectRatio: '335 / 270',
  overflow: 'hidden',
  justifyContent: 'center',
  borderRadius: '3px',
  backgroundColor: 'coolNeutral.99',
});

const goalText = css({
  position: 'absolute',
  right: '8px',
  bottom: '8px',
  textStyle: 'label2.normal',
  fontWeight: 'medium',
  color: 'white',
});

const graphArea = {
  container: flex({
    p: '20px',
    direction: 'column',
    gap: '16px',
  }),
  textWrapper: flex({
    direction: 'column',
    gap: '4px',
    px: '4px',
  }),
};

const graphText = {
  titleContainer: flex({
    gap: '2px',
    align: 'center',
  }),
  placeholder: css({
    textStyle: 'heading1',
    fontWeight: 'bold',
  }),
  title: css({
    textStyle: 'display2',
    fontWeight: 'bold',
  }),
  unit: css({
    textStyle: 'display3',
    fontWeight: 'bold',
    color: 'primary.swim.총거리.default',
  }),
  detail: css({
    textStyle: 'label1.normal',
    fontWeight: 'medium',
    color: 'text.placeHolder',

    '& > span:not(:last-child)': {
      '&:after': {
        content: "'/'",
        px: '4px',
      },
    },
  }),
};

const statsContainer = grid({
  px: '24px',
  pb: '20px',
  columns: 4,
  rowGap: '20px',
});

const toolsContainer = flex({
  p: '20px',
  gap: '8px',
  borderTop: '1px solid',
  color: 'background.gray',
});
