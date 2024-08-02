import { css } from '@/styled-system/css';

import useSearchPool from '../../apis/use-search-pool';
import { PoolSearchResultElement } from '../molecules';

interface PoolSearchResultListProps {
  poolSearchText: string;
}

export function PoolSearchResultList({
  poolSearchText,
}: PoolSearchResultListProps) {
  const { ref, getByFarPoolData } = useSearchPool(poolSearchText);

  return (
    <ul className={resultStyles.list}>
      {/* //api 연결로 추후 수정(enable: !!poolSearchText) */}
      {getByFarPoolData.map((result, i) => (
        <PoolSearchResultElement
          key={result.poolId}
          {...result}
          assignRef={i === getByFarPoolData.length - 1}
          ref={ref}
          className={resultStyles.element}
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
  element: css({
    padding: '6px 10px',
    marginBottom: '8px',
  }),
};
