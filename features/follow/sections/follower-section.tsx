'use client';

import { ProfileList } from '@/components/molecules';

import { useFollowerList } from '../apis';
import { EmptyFollowList } from '../components';

export const FollowerSection = ({ id }: { id: number }) => {
  const {
    flattenData,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isLoading,
  } = useFollowerList(id);

  const fetchNextData = () => {
    if (hasNextPage && !isFetchingNextPage) {
      void fetchNextPage();
    }
  };

  if (!flattenData.length && !isLoading) {
    return <EmptyFollowList type="follower" />;
  }
  return (
    <ProfileList
      data={flattenData}
      fetchNextData={fetchNextData}
      isLoading={isLoading}
      isFetchingNextPage={isFetchingNextPage}
    />
  );
};
