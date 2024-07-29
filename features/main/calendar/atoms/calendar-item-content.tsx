import { SwimmerIcon } from '@/components/atoms/icons/swimmer-icon';
import { css, cx } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

import { MemoryType, Strokes } from '../molecules/calendar';

interface ItemContentProps {
  type: MemoryType;
  totalDistance?: number;
  storkes?: Strokes;
  isAchieved?: boolean;
}

export const ItemContent = ({ type, isAchieved }: ItemContentProps) => {
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
          <></>
        )}
      </div>
    );
  return (
    <div className={wrapperStyles}>
      {isAchieved ? (
        <div className={cx(layoutStyles, multiAchievedStyles)} />
      ) : (
        <></>
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
});

const normalStyles = css({ backgroundColor: 'blue.90' });
const singleAchievedStyles = css({
  backgroundColor: 'primary.swim.총거리.default',
});
const multiAchievedStyles = css({
  bgGradient:
    'linear-gradient(0deg, rgba(59,135,244,1) 0%, rgba(136,212,176,1) 80%)',
});
