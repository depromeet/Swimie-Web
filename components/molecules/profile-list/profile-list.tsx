'use client';

import React from 'react';
import { Virtuoso } from 'react-virtuoso';

import { MemberProfile } from '@/types';

import { ProfileListItem } from './profile-list-item';

type ProfileList = {
  data: MemberProfile[];
  fetchNextData: () => void;
};
export const ProfileList = ({ data, fetchNextData }: ProfileList) => {
  const handleRangeChanged = (range: { endIndex: number }) => {
    const currentContentsLastIndex = data.length - 1;
    if (range.endIndex >= currentContentsLastIndex - 3) {
      void fetchNextData();
    }
  };

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
    />
  );
};
