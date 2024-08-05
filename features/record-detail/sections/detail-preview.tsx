'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import { Image, Waves } from '@/components/atoms';
import { swims } from '@/constants/visualization';
import placeholderImage from '@/public/images/fallbackImage.png';
import { css } from '@/styled-system/css';
import { flex, grid } from '@/styled-system/patterns';
import { getFormatTime } from '@/utils';

import { DatePicker, SwimStatsItem, SwimToolItem } from '../components';
import {
  type DetailStroke,
  type RecordDetailType,
  type StrokeMapType,
} from '../types';

export const DetailPreviewSection = ({ data }: { data: RecordDetailType }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    setContainerSize({
      width: containerRef.current.offsetWidth,
      height: containerRef.current.offsetHeight,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef.current]);

  const handleClickPreviousDate = () => {
    console.log('prev');
  };

  const handleClickNextDate = () => {
    console.log('next');
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
  } = data;

  const { hour: startHour, minute: startMinute } = getFormatTime({
    timeStr: startTime,
    type: 'string',
  });
  const { hour: endHour, minute: endMinute } = getFormatTime({
    timeStr: endTime,
    type: 'string',
  });

  const wavesArr = useMemo(() => {
    if (!strokes.length || !member?.goal) {
      return null;
    }

    const strokesMap = strokes.reduce((acc, stroke) => {
      acc[stroke.name] = stroke;
      return acc;
    }, {} as StrokeMapType);

    return swims.map(({ name, color }) => {
      const stroke: DetailStroke = strokesMap[name];
      return {
        color,
        waveHeight: stroke?.meter / member.goal ?? 0,
      };
    });
  }, [member?.goal, strokes]);

  return (
    <section className={containerStyle}>
      {/* NOTE: 상단 그래프 영역 */}
      <div className={graphArea.container}>
        {/* 날짜 선택 */}
        <DatePicker
          recordDateStr={recordAt}
          onClickPrevious={handleClickPreviousDate}
          onClickNext={handleClickNextDate}
        />

        {/* 파도 svg */}
        <div className={wavesStyle} ref={containerRef}>
          {wavesArr ? (
            <>
              {containerRef.current && (
                <Waves
                  waves={wavesArr}
                  width={containerSize.width}
                  height={containerSize.height}
                />
              )}
            </>
          ) : (
            <Image
              src={placeholderImage}
              alt="placeholder"
              width={containerSize.width}
              height={containerSize.height}
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
      {Boolean(memoryDetail?.item.length) && (
        <div className={toolsContainer}>
          {memoryDetail?.item
            .split(',')
            .map((tool, index) => <SwimToolItem key={index} name={tool} />)}
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
  color: 'line.solid.neutral',
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
