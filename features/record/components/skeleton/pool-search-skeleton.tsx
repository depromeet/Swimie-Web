import { css, cva } from '@/styled-system/css';

export function PoolSearchSkeleton() {
  return (
    <div className={layoutStyles.total}>
      {Array.from({ length: 10 }, (_, i) => (
        <div key={i} className={layoutStyles.content}>
          <div className={css(barStyles.raw({ length: 'short' }))} />
          <div className={css(barStyles.raw({ length: 'long' }))} />
        </div>
      ))}
    </div>
  );
}

const layoutStyles = {
  total: css({
    padding: '16px 0',
  }),
  content: css({
    padding: '8px 0',
    marginBottom: '8px',
  }),
};

const barStyles = cva({
  base: {
    height: '24px',
    backgroundColor: 'fill.normal',
    borderRadius: '4px',
  },
  variants: {
    length: {
      long: {
        width: '85%',
      },
      short: {
        width: '35%',
        marginBottom: '4px',
      },
    },
  },
});
