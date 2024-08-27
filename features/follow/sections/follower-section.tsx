'use client';

import { useFollowerList } from '../apis';
import { FollowVirtualList } from '../components';

export const FollowerSection = ({ id }: { id: number }) => {
  const { flattenData, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useFollowerList(id);

  const fetchNextData = () => {
    if (hasNextPage && !isFetchingNextPage) {
      void fetchNextPage();
    }
  };

  return <FollowVirtualList data={flattenData} fetchNextData={fetchNextData} />;
};
