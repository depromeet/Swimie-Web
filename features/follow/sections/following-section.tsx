'use client';

import { useFollowingList } from '../apis';
import { FollowVirtualList } from '../components';

export const FollowingSection = ({ id }: { id: number }) => {
  const { flattenData, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useFollowingList(id);

  const fetchNextData = () => {
    if (hasNextPage && !isFetchingNextPage) {
      void fetchNextPage();
    }
  };

  return <FollowVirtualList data={flattenData} fetchNextData={fetchNextData} />;
};
