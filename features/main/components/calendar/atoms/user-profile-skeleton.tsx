import { css, cx } from '@/styled-system/css';

import { profileContainerStyles } from '../organisms';

export const UserProfileSkeleton = () => {
  return (
    <div
      className={cx(
        profileContainerStyles,
        skeletonSizeStyles,
        skeletonColorStyle,
        animationStyle,
      )}
    />
  );
};

const skeletonSizeStyles = css({ width: 'full', height: '88px' });

const skeletonColorStyle = css({ backgroundColor: 'fill.normal' });

const animationStyle = css({
  animation: 'skeleton 1.5s infinite',
});
