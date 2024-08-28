'use client';

import React from 'react';
import { Virtuoso } from 'react-virtuoso';

import { LoadingArea } from '@/components/atoms';
import { MemberProfile } from '@/types';

import { ProfileListItem } from './profile-list-item';
import { ProfileListSkeleton } from './profile-list-skeleton';

type ProfileList = {
  data: MemberProfile[];
  fetchNextData: () => void;
  isLoading?: boolean;
  isFetchingNextData?: boolean;
};
export const ProfileList = ({
  data,
  fetchNextData,
  isLoading,
  isFetchingNextData,
}: ProfileList) => {
  const handleRangeChanged = (range: { endIndex: number }) => {
    const currentContentsLastIndex = data.length - 1;
    if (range.endIndex >= currentContentsLastIndex - 3) {
      void fetchNextData();
    }
  };

  if (isLoading) {
    return <ProfileListSkeleton />;
  }
  return (
    <Virtuoso
      data={data}
      overscan={500}
      useWindowScroll
      rangeChanged={handleRangeChanged}
      itemContent={(_, item) => <ProfileListItem isFollow={true} {...item} />}
      style={{
        width: '100%',
        height: '100%',
      }}
      components={{
        Footer: () => (isFetchingNextData ? <LoadingArea /> : <></>),
      }}
    />
  );
};
