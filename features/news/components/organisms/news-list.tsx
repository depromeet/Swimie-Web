'use client';

import { useRef } from 'react';

import { PullToRefresh } from '@/components/atoms';
import { HeaderBar } from '@/components/molecules';
import { TimeLineCard, TimeLineContent } from '@/features/main';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

import { NewsItem } from '../../types';
import { FindMemberButton, FollowingListLinkButton } from '../atoms';
import { EmptyNews, NewsItemWrapper, NewsItemWrapperProps } from '../molecules';

export const NewsList = () => {
  const ptrRef = useRef(null);
  const data: Array<NewsItem> = [];
  const isEmpty = data.length === 0;
  const lastItemIndex = data.length - 1;

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
        <PullToRefresh
          ref={ptrRef}
          onRefresh={() => console.log('refreshing')}
        />
        <ol className={listStyles}>
          {data.map((content, index) => {
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
      </div>
    </>
  );
};

const getPropsObjects = (content: NewsItem) => {
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
