import { useEffect, useRef, useState } from 'react';

import { SwimmerIcon } from '@/components/atoms/icons/swimmer-icon';
import { Waves } from '@/components/atoms/waves';
import { css, cx } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

import { MemoryType, Strokes } from '../molecules/calendar';

interface ItemContentProps {
  type: MemoryType;
  totalDistance?: number;
  strokes?: Strokes;
  isAchieved?: boolean;
}

// TODO: 로그인 이후 저장된 유저의 목표 거리로 수정 필요
const goal = 1000;

const swims: Array<{ name: keyof Strokes; color: string }> = [
  { name: 'free', color: '#3B87F4' },
  { name: 'breast', color: '#F3DD6E' },
  { name: 'back', color: '#EB5A3F' },
  { name: 'butterfly', color: '#88D4B0' },
];

export const ItemContent = ({
  type,
  totalDistance,
  strokes,
  isAchieved,
}: ItemContentProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [contentSize, setContentSize] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });
  const waves: Array<{ color: string; waveHeight: number }> = [];
  if (strokes) {
    swims.forEach(({ name, color }) => {
      const distance = strokes[name];
      console.log(distance);
      if (distance) waves.push({ color, waveHeight: distance / goal });
    });
  }

  useEffect(() => {
    if (ref.current)
      setContentSize({
        width: ref.current.offsetWidth,
        height: ref.current.offsetHeight,
      });
  }, []);

  if (type === 'NORMAL')
    return (
      <div className={wrapperStyles}>
        <div className={cx(layoutStyles, normalStyles)}>
          <SwimmerIcon />
        </div>
      </div>
    );
  else if (type === 'SINGLE')
    return (
      <div className={wrapperStyles}>
        {isAchieved ? (
          <div className={cx(layoutStyles, singleAchievedStyles)} />
        ) : (
          <div ref={ref} className={layoutStyles}>
            {ref.current && totalDistance && (
              <Waves
                width={contentSize.width}
                height={contentSize.height}
                waves={[
                  {
                    color: '#3b82f6',
                    waveHeight: totalDistance / goal,
                  },
                ]}
              />
            )}
          </div>
        )}
      </div>
    );
  return (
    <div className={wrapperStyles}>
      {isAchieved ? (
        <div className={cx(layoutStyles, multiAchievedStyles)} />
      ) : (
        <div ref={ref} className={layoutStyles}>
          {ref.current && totalDistance && (
            <Waves
              width={contentSize.width}
              height={contentSize.height}
              waves={waves}
            />
          )}
        </div>
      )}
    </div>
  );
};

const wrapperStyles = flex({
  width: 'full',
  height: 'full',
  alignItems: 'center',
  justifyContent: 'center',
});

const layoutStyles = flex({
  width: '95%',
  aspectRatio: 'auto 3/4',
  alignItems: 'center',
  justifyContent: 'center',
  rounded: '2px',
  overflow: 'hidden',
});

const normalStyles = css({ backgroundColor: 'blue.90' });
const singleAchievedStyles = css({
  backgroundColor: 'primary.swim.총거리.default',
});
const multiAchievedStyles = css({
  bgGradient:
    'linear-gradient(0deg, rgba(59,135,244,1) 0%, rgba(136,212,176,1) 80%)',
});
