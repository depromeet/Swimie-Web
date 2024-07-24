import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

export const SwimStatsItem = () => {
  return (
    <div className={containerStyle}>
      <h1 className={text.type}>자유형</h1>
      <h2 className={text.distance}>1500m</h2>
      <p className={text.lap}>124lap</p>
    </div>
  );
};

const containerStyle = flex({
  gap: '2px',
  flexDirection: 'column',
  w: 'full',
});

// TODO: swim type에 따른 색상 변경
const text = {
  type: css({
    textStyle: 'label1.normal',
    fontWeight: 'medium',
    color: 'primary.swim.자유형.default',
  }),

  distance: css({
    textStyle: 'label1.normal',
    fontWeight: 'bold',
    color: 'text.neutral',
  }),

  lap: css({
    textStyle: 'label1.normal',
    fontWeight: 'medium',
    color: 'text.placeHolder',
  }),
};
