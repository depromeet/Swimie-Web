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
 * @param strokes 현재 strokes 배열 상태
 * @param onChangeStroke strokes 배열 값 handling function
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
          assistiveTabIndex={assistiveTabIndex}
          onChangeStroke={onChangeStroke}
          className={css({ marginTop: '16px' })}
        />
      ))}
    </>
  );
}
