import { css, cva } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

export const SwimStatsItem = () => {
  return (
    <div className={containerStyle}>
      <h1 className={css(text.stroke.raw({ type: '자유형' }))}>자유형</h1>
      <h2 className={css(text.distance.raw({ unit: 'meter' }))}>1500m</h2>
      <p className={css(text.distance.raw({ unit: 'laps' }))}>124lap</p>
    </div>
  );
};

const containerStyle = flex({
  gap: '2px',
  direction: 'column',
  w: 'full',
});

// TODO: swim type에 따른 색상 변경
const text = {
  stroke: cva({
    base: { textStyle: 'label1.normal', fontWeight: 'medium' },
    variants: {
      type: {
        자유형: { color: 'primary.swim.자유형.default' },
        배영: { color: 'primary.swim.배영.default' },
        접영: { color: 'primary.swim.접영.default' },
        평영: { color: 'primary.swim.평영.default' },
        킥판: { color: 'primary.swim.킥판.default' },
      },
    },
  }),

  distance: cva({
    base: {
      textStyle: 'label1.normal',
    },
    variants: {
      unit: {
        meter: { fontWeight: 'bold', color: 'text.neutral' },
        laps: { fontWeight: 'medium', color: 'text.placeHolder' },
      },
    },
  }),
};
