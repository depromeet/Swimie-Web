'use client';

import { Fragment } from 'react';

import { Image } from '@/components/atoms';
import { InfiniteScroller } from '@/components/molecules';
import { TimeLineContent, useTimeLineData } from '@/features/main';
import EmptyTimeLineCharacterImage from '@/public/images/empty-timeline-character.png';
import { css, cx } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';
import { formatDateToKorean, getFormatDate } from '@/utils';

import { CardWrapper } from '../atoms';
import { TimeLineCard } from '../molecules';
import { TimeLineSkeleton } from './time-line-skeleton';

interface GroupedTimelineContents {
  date: string;
  contents: Array<TimeLineContent>;
}

export const TimeLine = () => {
  const {
    data: timelineData,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useTimeLineData();

  if (!timelineData) return null;

  const contents = timelineData.pages.flatMap(({ data }) => data.content);
  const groupedContents = groupBySameYearAndMonth(contents);
  const isEmptyTimeLine = contents.length === 0;
  const lastGroupIndex = groupedContents.length - 1;
  const lastContentIndex =
    groupedContents[lastGroupIndex] === undefined
      ? 0
      : groupedContents[lastGroupIndex].contents.length - 1;

  if (isLoading) return <TimeLineSkeleton />;
  return (
    <>
      {isEmptyTimeLine ? (
        <div className={cx(fullspaceStyles, iconContainer)}>
          <Image
            src={EmptyTimeLineCharacterImage}
            alt="empty-timeline-character"
            width={140}
            height={140}
          />
          <p className={descriptionStyles}>아직 수영 기록이 없어요!</p>
        </div>
      ) : (
        <InfiniteScroller
          isLastPage={!hasNextPage}
          onIntersect={() => void fetchNextPage()}
        >
          <ol className={listStyles}>
            {groupedContents.map(({ date, contents }, groupIndex) => (
              <Fragment key={date}>
                <CardWrapper hasDivider={true}>
                  <p className={dateStyles}>{formatDateToKorean(date, 2)}</p>
                </CardWrapper>
                {contents.map((content, contentIndex) => (
                  <CardWrapper
                    key={content.memoryId}
                    hasDivider={
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
      )}
    </>
  );
};

const groupBySameYearAndMonth = (contents: Array<TimeLineContent>) => {
  const grouped: { [key: string]: Array<TimeLineContent> } = contents.reduce(
    (acc: { [key: string]: Array<TimeLineContent> }, item: TimeLineContent) => {
      const { year, month } = getFormatDate({ dateStr: item.recordAt });
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

const fullspaceStyles = css({ pt: '40%', width: 'full', height: 'full' });

const iconContainer = flex({
  direction: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

const descriptionStyles = css({
  textStyle: 'body1.normal',
  fontWeight: 'semibold',
});

const listStyles = flex({ direction: 'column' });

const dateStyles = css({ textStyle: 'heading4', fontWeight: 'bold' });
