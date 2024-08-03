'use client';

import { useMemo } from 'react';

import { css } from '@/styled-system/css';
import { flex, grid } from '@/styled-system/patterns';
import { getFormatTime } from '@/utils';

import { DatePicker, SwimStatsItem, SwimToolItem } from '../components';
import { type RecordDetailType } from '../types';

export const DetailPreviewSection = ({ data }: { data: RecordDetailType }) => {
  const toolArr = useMemo(() => {
    return data.memoryDetail.item.split(',');
  }, [data.memoryDetail.item]);

  const handleClickPreviousDate = () => {
    console.log('prev');
  };

  const handleClickNextDate = () => {
    console.log('next');
  };

  const { startTime, endTime, lane, strokes, totalLap, totalMeter, recordAt } =
    data;
  const { hour: startHour, minute: startMinute } = getFormatTime({
    timeStr: startTime,
    type: 'string',
  });
  const { hour: endHour, minute: endMinute } = getFormatTime({
    timeStr: endTime,
    type: 'string',
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
        <div className={wavesStyle}>물결이 ~~</div>

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

const wavesStyle = css({
  height: '270px',
  width: 'full',
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
