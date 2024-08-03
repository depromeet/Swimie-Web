import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';
import { getSwimColor } from '@/utils';

import { StrokeInfo } from '../molecules';

interface SwimRecordChartProps {
  width: number;
  isAchieved: boolean;
  totalDistance: number;
  strokes: Array<StrokeInfo>;
}

interface SwimChartData {
  strokeId: number;
  name: string;
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
    <div className={chartContainerStyles} style={{ width }}>
      {chartData.map(({ name, ratio, color }) => (
        <div
          key={name}
          style={{ width: `${ratio}%`, height: '20px', backgroundColor: color }}
          className={css({ borderRadius: '2px' })}
        />
      ))}
    </div>
  );
};

const chartContainerStyles = flex({
  w: 'full',
  gap: '2px',
});
