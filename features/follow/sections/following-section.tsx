'use client';

import { ProfileList } from '@/components/molecules';

import { useFollowingList } from '../apis';
import { EmptyFollowList } from '../components';

export const FollowingSection = ({ id }: { id: number }) => {
  const {
    flattenData,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isFetching,
  } = useFollowingList(id);

  const fetchNextData = () => {
    if (hasNextPage && !isFetchingNextPage) {
      void fetchNextPage();
    }
  };

  if (!flattenData.length && !isFetching) {
    return <EmptyFollowList type="following" />;
  }
  return <ProfileList data={flattenData} fetchNextData={fetchNextData} />;
};
