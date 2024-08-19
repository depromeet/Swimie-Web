import { StrokeInfo } from '@/features/main/types';
import { StrokeName } from '@/features/record-detail';
import { css, cva } from '@/styled-system/css';
import { flex, grid } from '@/styled-system/patterns';
import { getSwimColor } from '@/utils';

interface SwimRecordChartProps {
  width: number;
  isAchieved: boolean;
  totalDistance: number;
  strokes: Array<StrokeInfo>;
}

interface SwimChartData {
  strokeId: number;
  name: StrokeName;
  ratio: number;
  color: string;
}

const goal = 1000;

export const SwimRecordChart = ({
  width,
  isAchieved,
  totalDistance,
  strokes,
}: SwimRecordChartProps) => {
  const chartData: Array<SwimChartData> = strokes
    .map(({ strokeId, name, meter }) => {
      const color = getSwimColor(name);
      return {
        strokeId,
        name,
        ratio: (meter / (isAchieved ? totalDistance : goal)) * 100 - 1,
        color,
      };
    })
    .sort((a, b) => b.ratio - a.ratio);

  return (
    <>
      <div className={chartContainerStyles} style={{ width }}>
        {chartData.map(({ name, ratio, color }) => (
          <div
            key={name}
            style={{
              width: `${ratio}%`,
              height: '20px',
              backgroundColor: color,
            }}
            className={css({ borderRadius: '2px' })}
          />
        ))}
      </div>
      {strokes.length > 1 && (
        <ul className={statsContainerStyles}>
          {strokes.map(({ strokeId, name, meter }) => (
            <li key={strokeId} className={itemStyles}>
              <p className={nameStyles({ type: name })}>{name}</p>
              <p className={distanceStyles}>{meter}m</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

const chartContainerStyles = flex({
  w: 'full',
  gap: '2px',
});

const statsContainerStyles = grid({
  columns: 4,
  rowGap: '10px',
});

const itemStyles = flex({ direction: 'column', gap: '2px' });

const nameStyles = cva({
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
});

const distanceStyles = css({
  textStyle: 'label1.normal',
  fontWeight: 'semibold',
});
