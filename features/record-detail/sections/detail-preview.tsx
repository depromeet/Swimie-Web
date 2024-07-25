import { css } from '@/styled-system/css';
import { flex, grid } from '@/styled-system/patterns';

import { SwimStatsItem, SwimToolItem } from '../components';

export const DetailPreviewSection = () => {
  return (
    <section className={containerStyle}>
      {/* NOTE: 상단 그래프 영역 */}
      <div className={graphArea.container}>
        {/* 날짜 선택 */}
        <div>24.07.14. 수</div>

        {/* 파도 svg */}
        <div>물결이 ~~</div>

        {/* preview description */}
        <div className={graphArea.textWrapper}>
          <div className={graphText.titleContainer}>
            <h1 className={graphText.title}>2,600</h1>
            <span className={graphText.unit}>m</span>
          </div>
          <p className={graphText.detail}>22:00 ~ 22:50 / 56lap / 25m 레인</p>
        </div>
      </div>

      {/* NOTE: 통계 영역 */}
      <div className={statsContainer}>
        {new Array(5).fill(0).map((_, index) => (
          <SwimStatsItem key={index} />
        ))}
      </div>

      {/* NOTE: 수영 장비 영역 */}
      <div className={toolsContainer}>
        {new Array(5).fill(0).map((_, index) => (
          <SwimToolItem key={index} />
        ))}
      </div>
    </section>
  );
};

const containerStyle = css({
  backgroundColor: 'white',
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
