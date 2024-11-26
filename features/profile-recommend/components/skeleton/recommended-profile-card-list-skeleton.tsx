import { css, cva } from '@/styled-system/css';

import { ProfileCardListProps } from '../organisms';

export function RecommendedProfileCardListSkeleton({
  variant = 'horizontal',
  itemStyle,
}: Pick<ProfileCardListProps, 'variant'> & { itemStyle?: object }) {
  return (
    <>
      <div className={RecommendedProfileCardListSkeletonStyle.title} />
      <div
        className={css(
          RecommendedProfileCardListSkeletonStyle.itemLayout.raw({ variant }),
        )}
      >
        {Array.from({ length: 5 }, (_, i) => (
          <div
            key={i}
            className={css(
              RecommendedProfileCardListSkeletonStyle.item.raw({
                variant: variant === 'horizontal' ? 'vertical' : 'horizontal',
              }),
            )}
            style={itemStyle}
          />
        ))}
      </div>
    </>
  );
}

const RecommendedProfileCardListSkeletonStyle = {
  itemLayout: cva({
    base: {
      display: 'flex',
      gap: '8px',
      p: '16px 20px',
    },
    variants: {
      variant: {
        vertical: {
          flexDirection: 'column',
        },
        horizontal: {},
      },
    },
  }),
  title: css({
    m: '20px 0 0 20px',
    width: '240px',
    height: '24px',
    backgroundColor: 'fill.normal',
    borderRadius: '4px',
    animation: 'skeleton 1.5s infinite',
  }),
  item: cva({
    base: {
      backgroundColor: 'fill.normal',
      borderRadius: '10px',
      flexShrink: 0,
      animation: 'skeleton 1.5s infinite',
    },
    variants: {
      variant: {
        vertical: { width: '146px', height: '208px' },
        horizontal: { w: 'full', height: '100px' },
      },
    },
  }),
};
