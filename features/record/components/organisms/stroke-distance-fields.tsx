import { css } from '@/styled-system/css';

import { DistanceFieldWithBadge } from '../molecules';

interface StrokeDistanceFieldsProps {
  assistiveTabIndex: number;
}

/**
 * @param assistiveTabIndex 현재 assistiveTabIndex 값
 */
export function StrokeDistanceFields({
  assistiveTabIndex,
}: StrokeDistanceFieldsProps) {
  const strokeOptions = ['자유형', '배영', '평영', '접영', '킥판'];

  return (
    <>
      {strokeOptions.map((option) => (
        <DistanceFieldWithBadge
          key={option}
          label={option}
          assistiveTabIndex={assistiveTabIndex}
          className={css({ marginTop: '16px' })}
        />
      ))}
    </>
  );
}
