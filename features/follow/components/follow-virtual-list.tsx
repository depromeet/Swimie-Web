import React from 'react';
import { Virtuoso } from 'react-virtuoso';

import { ProfileListItem } from '@/components/molecules';

import { ProfileFollowContent } from '../types';

type FollowVirtualList = {
  data: ProfileFollowContent[];
  fetchNextData: () => void;
};
export const FollowVirtualList = ({
  data,
  fetchNextData,
}: FollowVirtualList) => {
  const handleRangeChanged = (range: { endIndex: number }) => {
    const currentContentsLastIndex = data.length - 1;
    if (range.endIndex >= currentContentsLastIndex - 3) {
      void fetchNextData();
    }
  };

  return (
    <Virtuoso
      data={data}
      overscan={300}
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
