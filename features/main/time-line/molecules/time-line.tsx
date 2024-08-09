/* eslint-disable */
import { SwimmerIcon } from '@/components/atoms/icons/swimmer-icon';
import { InfiniteScroller } from '@/components/molecules/infinite-scroller';
import { useTimeLineData } from '@/hooks/use-timeline';
import { css, cx } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

import { TimeLineCard } from '../atoms';

export const TimeLine = () => {
  const { data: timelineData, fetchNextPage, hasNextPage } = useTimeLineData();

  if (!timelineData) return null;

  const contents = timelineData.pages.flatMap(({ data }) => data.content);
  const isEmptyTimeLine = contents.length === 0;

  return (
    <>
      {isEmptyTimeLine ? (
        <div
          className={cx(
            fullspaceStyles,
            flex({
              direction: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }),
          )}
        >
          <SwimmerIcon width={96} height={96} />
          <p className={descriptionStyles}>아직 수영 기록이 없어요!</p>
        </div>
      ) : (
        <>
          <InfiniteScroller
            isLastPage={!hasNextPage}
            onIntersect={() => fetchNextPage()}
          >
            <ol className={flex({ direction: 'column', gap: '50px' })}>
              {contents.map((content) => (
                <TimeLineCard key={content.memoryId} content={content} />
              ))}
            </ol>
          </InfiniteScroller>
        </>
      )}
    </>
  );
};

const fullspaceStyles = css({ width: 'full', height: 'full' });

const descriptionStyles = css({
  textStyle: 'body1.normal',
  fontWeight: 'semibold',
});
