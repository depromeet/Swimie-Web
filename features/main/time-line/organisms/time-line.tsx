/* eslint-disable */
import { SwimmerIcon } from '@/components/atoms/icons/swimmer-icon';
import { InfiniteScroller } from '@/components/molecules/infinite-scroller';
import { useTimeLineData } from '@/hooks/use-timeline';
import { css, cx } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';
import { TimeLineCard } from '../molecules';
import { CardWrapper } from '../atoms/card-wrapper';
import { TimeLineContent } from '../types';
import { formatDateToKorean } from '@/utils';
import { Fragment } from 'react';

interface GroupedTimelineContents {
  date: string;
  contents: Array<TimeLineContent>;
}

export const TimeLine = () => {
  const { data: timelineData, fetchNextPage, hasNextPage } = useTimeLineData();

  if (!timelineData) return null;

  const contents = timelineData.pages.flatMap(({ data }) => data.content);
  const groupedContents = groupBySameYearAndMonth(contents);
  const isEmptyTimeLine = contents.length === 0;
  const lastGroupIndex = groupedContents.length - 1;
  const lastContentIndex = groupedContents[lastGroupIndex].contents.length - 1;

  return (
    <>
      {isEmptyTimeLine ? (
        <div className={cx(fullspaceStyles, iconContainer)}>
          <SwimmerIcon width={96} height={96} />
          <p className={descriptionStyles}>아직 수영 기록이 없어요!</p>
        </div>
      ) : (
        <>
          <InfiniteScroller
            isLastPage={!hasNextPage}
            onIntersect={() => fetchNextPage()}
          >
            <ol className={listStyles}>
              {groupedContents.map(({ date, contents }, groupIndex) => (
                <Fragment key={date}>
                  <CardWrapper>
                    <p className={dateStyles}>{formatDateToKorean(date, 2)}</p>
                  </CardWrapper>
                  {contents.map((content, contentIndex) => (
                    <CardWrapper
                      key={content.memoryId}
                      isLast={
                        lastGroupIndex === groupIndex &&
                        lastContentIndex === contentIndex
                      }
                    >
                      <TimeLineCard content={content} />
                    </CardWrapper>
                  ))}
                </Fragment>
              ))}
            </ol>
          </InfiniteScroller>
        </>
      )}
    </>
  );
};

const groupBySameYearAndMonth = (contents: Array<TimeLineContent>) => {
  const grouped: { [key: string]: Array<TimeLineContent> } = contents.reduce(
    (acc: { [key: string]: Array<TimeLineContent> }, item: TimeLineContent) => {
      const [year, month] = item.recordAt.split('-');
      const key = `${year}-${month}`;

      if (!acc[key]) acc[key] = [];
      acc[key].push(item);

      return acc;
    },
    {},
  );

  const result: Array<GroupedTimelineContents> = [];
  Object.keys(grouped).forEach((key) => {
    result.push({ date: key, contents: grouped[key] });
  });

  return result;
};

const fullspaceStyles = css({ width: 'full', height: 'full' });

const iconContainer = flex({
  direction: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

const descriptionStyles = css({
  textStyle: 'body1.normal',
  fontWeight: 'semibold',
});

const listStyles = flex({ direction: 'column', gap: '50px' });

const dateStyles = css({ textStyle: 'heading4', fontWeight: 'bold' });
