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

  const toolArr = useMemo(() => {
    return data.memoryDetail.item.split(',');
  }, [data.memoryDetail.item]);

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
  } = data;

  const { hour: startHour, minute: startMinute } = getFormatTime({
    timeStr: startTime,
    type: 'string',
  });
  const { hour: endHour, minute: endMinute } = getFormatTime({
    timeStr: endTime,
    type: 'string',
  });

  const strokesMap: StrokeMapType = strokes.reduce((acc, stroke) => {
    acc[stroke.name] = stroke;
    return acc;
  }, {} as StrokeMapType);
  const wavesData = swims.map(({ name, color }) => {
    const stroke: DetailStroke = strokesMap[name];
    return {
      color,
      waveHeight: stroke.meter / member.goal,
    };
  });

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
          {strokes?.length ? (
            <>
              {containerRef.current && (
                <Waves
                  waves={wavesData}
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
        </div>

        {/* preview description */}
        <div className={graphArea.textWrapper}>
          <div className={graphText.titleContainer}>
            <h1 className={graphText.title}>{totalMeter.toLocaleString()}</h1>
            <span className={graphText.unit}>m</span>
          </div>
          <p className={graphText.detail}>
            {`${startHour}:${startMinute}`} ~ {`${endHour}:${endMinute}`} /{' '}
            {totalLap}
            lap / {lane}m 레인
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
      {Boolean(toolArr?.length) && (
        <div className={toolsContainer}>
          {toolArr.map((tool, index) => (
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
  height: '270px',
  width: 'full',
  overflow: 'hidden',
  justifyContent: 'center',
  borderRadius: '3px',
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
