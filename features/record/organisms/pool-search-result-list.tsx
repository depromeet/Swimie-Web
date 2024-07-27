import { css, cva } from '@/styled-system/css';

import { PoolSearchResultElement } from '../molecules';

interface PoolSearchResultListProps {
  poolSearchText: string;
}

export function PoolSearchResultList({
  poolSearchText,
}: PoolSearchResultListProps) {
  // 임시 dummy data
  const dummyResult = {
    status: 200,
    code: '',
    message: '',
    data: [
      {
        poolId: 0,
        name: `${poolSearchText} 수영장`,
        address: `${poolSearchText} 특별시`,
        isFavorite: true,
      },
      {
        poolId: 1,
        name: `${poolSearchText} 수영장2`,
        address: `${poolSearchText} 특별시2`,
        isFavorite: false,
      },
      {
        poolId: 2,
        name: `${poolSearchText} 수영장3`,
        address: `${poolSearchText} 특별시3`,
        isFavorite: false,
      },
    ],
  };

  return (
    <ul className={resultStyles.list}>
      {/* //api 연결로 추후 수정(enable: !!poolSearchText) */}
      {poolSearchText &&
        dummyResult.data.map((result, i) => (
          <PoolSearchResultElement
            key={result.poolId}
            {...result}
            className={
              i === dummyResult.data.length - 1
                ? css(resultStyles.element.raw({ isLast: true }))
                : css(resultStyles.element.raw({}))
            }
          />
        ))}
    </ul>
  );
}

const resultStyles = {
  list: css({
    padding: '8px 0',
    marginBottom: '8px',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    scrollbarWidth: 'none',
  }),
  element: cva({
    base: {
      padding: '6px 10px',
    },
    variants: {
      isLast: {
        true: {},
        false: { marginBottom: '8px' },
      },
    },
  }),
};
