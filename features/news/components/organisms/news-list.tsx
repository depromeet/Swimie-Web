'use client';

import { useRef } from 'react';

import { PullToRefresh } from '@/components/atoms/pull-to-refresh';
import { TimeLineCard, TimeLineContent } from '@/features/main';
import { flex } from '@/styled-system/patterns';

import { NewsItem } from '../../types';
import { NewsItemWrapper, NewsItemWrapperProps } from '../molecules';

const dummys: Array<NewsItem> = [
  {
    memberId: 3,
    memberNickName: 'heojoooon',
    createdAt: '2024-08-21 00:00:00',
    isRecentNews: true,
    memoryId: 38,
    recordAt: '2024-08-14',
    startTime: '14:00',
    endTime: '15:00',
    lane: 25,
    totalDistance: 750,
    isAchieved: false,
    type: 'MULTI',
    diary: 'SWIMIE 화이팅~!~!~!~!!~!!~!~!~!~!~!~!',
    strokes: [
      {
        strokeId: 108,
        name: '자유형',
        laps: 3,
        meter: 150,
      },
      {
        strokeId: 109,
        name: '배영',
        laps: 3,
        meter: 150,
      },
      {
        strokeId: 110,
        name: '평영',
        laps: 3,
        meter: 150,
      },
      {
        strokeId: 111,
        name: '접영',
        laps: 3,
        meter: 150,
      },
      {
        strokeId: 112,
        name: '킥판',
        laps: 3,
        meter: 150,
      },
    ],
    imageUrl: '',
  },
  {
    memberId: 3,
    memberNickName: 'heojoooon',
    createdAt: '2024-08-20 18:00:00',
    isRecentNews: true,
    memoryId: 37,
    recordAt: '2024-08-13',
    startTime: '14:00',
    endTime: '15:00',
    lane: 25,
    totalDistance: 800,
    isAchieved: false,
    type: 'MULTI',
    diary: 'SWIMIE 화이팅~!~!~!~!!~!!~!~!~!~!~!~!',
    strokes: [
      {
        strokeId: 108,
        name: '자유형',
        laps: 10,
        meter: 500,
      },
      {
        strokeId: 111,
        name: '접영',
        laps: 6,
        meter: 300,
      },
    ],
    imageUrl: '',
  },
  {
    memberId: 3,
    memberNickName: 'heojoooon',
    createdAt: '2024-08-20 18:00:00',
    isRecentNews: true,
    memoryId: 371,
    recordAt: '2024-08-13',
    startTime: '14:00',
    endTime: '15:00',
    lane: 25,
    totalDistance: 800,
    isAchieved: false,
    type: 'MULTI',
    diary: 'SWIMIE 화이팅~!~!~!~!!~!!~!~!~!~!~!~!',
    strokes: [
      {
        strokeId: 108,
        name: '자유형',
        laps: 10,
        meter: 500,
      },
      {
        strokeId: 111,
        name: '접영',
        laps: 6,
        meter: 300,
      },
    ],
    imageUrl: '',
  },
  {
    memberId: 3,
    memberNickName: 'heojoooon',
    createdAt: '2024-08-20 18:00:00',
    isRecentNews: true,
    memoryId: 372,
    recordAt: '2024-08-13',
    startTime: '14:00',
    endTime: '15:00',
    lane: 25,
    totalDistance: 800,
    isAchieved: false,
    type: 'MULTI',
    diary: 'SWIMIE 화이팅~!~!~!~!!~!!~!~!~!~!~!~!',
    strokes: [
      {
        strokeId: 108,
        name: '자유형',
        laps: 10,
        meter: 500,
      },
      {
        strokeId: 111,
        name: '접영',
        laps: 6,
        meter: 300,
      },
    ],
    imageUrl: '',
  },
  {
    memberId: 3,
    memberNickName: 'heojoooon',
    createdAt: '2024-08-20 18:00:00',
    isRecentNews: true,
    memoryId: 373,
    recordAt: '2024-08-13',
    startTime: '14:00',
    endTime: '15:00',
    lane: 25,
    totalDistance: 800,
    isAchieved: false,
    type: 'MULTI',
    diary: 'SWIMIE 화이팅~!~!~!~!!~!!~!~!~!~!~!~!',
    strokes: [
      {
        strokeId: 108,
        name: '자유형',
        laps: 10,
        meter: 500,
      },
      {
        strokeId: 111,
        name: '접영',
        laps: 6,
        meter: 300,
      },
    ],
    imageUrl: '',
  },
];

export const NewsList = () => {
  const ptrRef = useRef(null);
  const lastItemIndex = dummys.length - 1;

  return (
    <div ref={ptrRef}>
      <PullToRefresh ref={ptrRef} onRefresh={() => console.log('refreshing')} />
      <ol className={listStyles}>
        {dummys.map((content, index) => {
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

const listStyles = flex({ direction: 'column' });
