import { useAtomValue } from 'jotai';
import { useEffect, useRef, useState } from 'react';

import { Image } from '@/components/atoms';
import { SwimmerIcon } from '@/components/atoms/icons/swimmer-icon';
import { Waves } from '@/components/atoms/waves';
import { calendarViewImageAtom } from '@/store';
import { css, cx } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';
import { createGradient, getSwimColor } from '@/utils/visualization';

import { StrokeInfo } from '../../time-line';
import { MemoryType } from '../types';

interface ItemContentProps {
  type: MemoryType;
  totalDistance?: number;
  strokes?: Array<StrokeInfo>;
  isAchieved?: boolean;
  imageUrl?: string;
}

// TODO: 로그인 이후 저장된 유저의 목표 거리로 수정 필요
const goal = 1000;

export const ItemContent = ({
  type,
  totalDistance,
  strokes,
  isAchieved,
  imageUrl,
}: ItemContentProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isViewImage = useAtomValue(calendarViewImageAtom);
  const [contentSize, setContentSize] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });

  const waves: Array<{ color: string; waveHeight: number }> = [];
  if (strokes) {
    strokes.forEach(({ name, meter }) => {
      const color = getSwimColor(name);
      waves.push({ color, waveHeight: meter / goal });
    });
  }

  useEffect(() => {
    if (ref.current)
      setContentSize({
        width: ref.current.offsetWidth,
        height: ref.current.offsetHeight,
      });
  }, [isViewImage]);

  if (isViewImage && imageUrl)
    return (
      <div className={wrapperStyles}>
        <div className={cx(layoutStyles, css({ position: 'relative' }))}>
          <Image
            src={imageUrl}
            alt="user-image"
            fill
            className={css({
              objectFit: 'cover',
            })}
          />
        </div>
      </div>
    );

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

  const gradientProps = createGradient(waves.map(({ color }) => color));

  return (
    <div className={wrapperStyles}>
      {isAchieved ? (
        <div
          style={{ backgroundImage: `linear-gradient(0deg, ${gradientProps})` }}
          className={layoutStyles}
        />
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
