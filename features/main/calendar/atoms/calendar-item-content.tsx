import { useAtomValue } from 'jotai';

import { Image } from '@/components/atoms';
import { RecordMark } from '@/components/molecules/record-mark';
import { calendarViewImageAtom } from '@/store';
import { css, cx } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

import { StrokeInfo } from '../../time-line';
import { MemoryType } from '../types';

interface ItemContentProps {
  type: MemoryType;
  totalDistance?: number;
  strokes?: Array<StrokeInfo>;
  isAchieved?: boolean;
  imageUrl?: string;
}

export const ItemContent = ({
  type,
  totalDistance,
  strokes,
  isAchieved,
  imageUrl,
}: ItemContentProps) => {
  const isViewImage = useAtomValue(calendarViewImageAtom);

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

  return (
    <RecordMark
      type={type}
      totalDistance={totalDistance}
      isAchieved={isAchieved}
      strokes={strokes}
    />
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
