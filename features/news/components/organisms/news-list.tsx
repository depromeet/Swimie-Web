'use client';

import { useRef } from 'react';

import { PullToRefresh } from '@/components/atoms';
import { HeaderBar, InfiniteScroller } from '@/components/molecules';
import { TimeLineCard, TimeLineContent } from '@/features/main';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

import { NewsContent } from '../../types';
import { EmptyNews, NewsItemWrapper, NewsItemWrapperProps } from '../molecules';
import { FindMemberButton, FollowingListLinkButton } from '../atoms';
import { useNewsData } from '../../hooks';
import { useQueryClient } from '@tanstack/react-query';
  
export const NewsList = () => {
  const ptrRef = useRef(null);
  const queryClient = useQueryClient();
  const { data: newsData, fetchNextPage, hasNextPage } = useNewsData();

  if (!newsData) return null;

  let contents = newsData.pages.flatMap(({ data }) => data.content);
  const isEmpty = contents.length === 0;
  const lastItemIndex = contents.length - 1;

  const handlePullToRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ['newsData'] });
    queryClient.refetchQueries({ queryKey: ['newsData'], type: 'active' });
  };

  return isEmpty ? (
    <section className={emptySectionStyle}>
      <EmptyNews />
    </section>
  ) : (
    <>
      <HeaderBar>
        <HeaderBar.LeftContent>
          <FollowingListLinkButton />
        </HeaderBar.LeftContent>
        <HeaderBar.RightContent>
          {[{ component: <FindMemberButton />, key: 'findMember' }]}
        </HeaderBar.RightContent>
      </HeaderBar>

      <div className={sectionStyle} ref={ptrRef}>
        <PullToRefresh ref={ptrRef} onRefresh={handlePullToRefresh} />
        <InfiniteScroller
          isLastPage={!hasNextPage}
          onIntersect={() => void fetchNextPage()}
        >
          <ol className={listStyles}>
            {contents.map((content, index) => {
              const { wrapperProps, cardContent } = getPropsObjects(content);
              return (
                <NewsItemWrapper
                  key={cardContent.memoryId}
                  {...wrapperProps}
                  isLast={lastItemIndex === index}
                >
                  <TimeLineCard content={cardContent} isViewDate={false} />
                </NewsItemWrapper>
              );
            })}
          </ol>
        </InfiniteScroller>
      </div>
    </>
  );
};

const getPropsObjects = (content: NewsContent) => {
  const {
    memberId,
    memberNickName,
    createdAt,
    isRecentNews,
    memoryId,
    recordAt,
    startTime,
    endTime,
    lane,
    totalDistance,
    isAchieved,
    type,
    diary,
    strokes,
    imageUrl,
  } = content;

  const wrapperProps: NewsItemWrapperProps = {
    memberId,
    memberNickName,
    createdAt,
    isRecentNews,
    recordAt,
  };
  const cardContent: TimeLineContent = {
    memoryId,
    recordAt,
    startTime,
    endTime,
    lane,
    totalDistance,
    isAchieved,
    type,
    diary,
    strokes,
    imageUrl,
  };
  return { wrapperProps, cardContent };
};

const emptySectionStyle = css({
  px: '20px',
  h: '90dvh',
});

const sectionStyle = css({
  px: '20px',
});

const listStyles = flex({ direction: 'column' });
