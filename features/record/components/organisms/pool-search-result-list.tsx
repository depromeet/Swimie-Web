import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

import useSearchPool from '../../apis/use-search-pool';
import { PoolSearchResultElement } from '../molecules';

interface PoolSearchResultListProps {
  poolSearchText: string;
}

export function PoolSearchResultList({
  poolSearchText,
}: PoolSearchResultListProps) {
  const { ref, isLoading, getByFarPoolData } = useSearchPool(poolSearchText);
  return (
    <ul className={resultStyles.list}>
      {!isLoading && getByFarPoolData.length === 0 && (
        <div className={textStyles.layout}>
          <p
            className={textStyles.noResult}
          >{`'${poolSearchText}' 수영장 검색 결과가 없어요`}</p>
          <p className={textStyles.subNoResult}>
            등록되지 않은 수영장일 수 있어요
          </p>
        </div>
      )}
      {!isLoading &&
        getByFarPoolData.length > 0 &&
        getByFarPoolData.map((result, i) => (
          <PoolSearchResultElement
            key={result.poolId}
            {...result}
            poolSearchText={poolSearchText}
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
    padding: '16px 0',
    marginBottom: '8px',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    scrollbarWidth: 'none',
  }),
  element: css({
    marginBottom: '8px',
  }),
};

const textStyles = {
  layout: flex({
    direction: 'column',
    alignItems: 'center',
    marginTop: '86px',
  }),
  noResult: css({
    textStyle: 'heading6',
    fontWeight: 500,
    marginBottom: '4px',
    color: 'text.normal',
  }),
  subNoResult: css({
    textStyle: 'body2.normal',
    fontWeight: 400,
    color: 'text.alternative',
  }),
};
