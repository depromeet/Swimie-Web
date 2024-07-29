import { css } from '@/styled-system/css';

import { StrokeProps } from '../../types';
import { DistanceFieldWithBadge } from '../molecules';

export interface StrokeDistanceFieldsProps {
  assistiveTabIndex: number;
  strokes: StrokeProps[];
  onChangeStroke?: (index: number, text: string) => void;
}

export const strokeOptions = ['자유형', '배영', '평영', '접영', '킥판'];

/**
 * @param assistiveTabIndex 현재 assistiveTabIndex 값
 */
export function StrokeDistanceFields({
  assistiveTabIndex,
  strokes,
  onChangeStroke,
}: StrokeDistanceFieldsProps) {
  return (
    <>
      {strokeOptions.map((option, i) => (
        <DistanceFieldWithBadge
          key={option}
          index={i}
          value={assistiveTabIndex === 0 ? strokes[i].meter : strokes[i].laps}
          label={option}
          strokes={strokes}
          assistiveTabIndex={assistiveTabIndex}
          onChangeStroke={onChangeStroke}
          className={css({ marginTop: '16px' })}
        />
      ))}
    </>
  );
}
