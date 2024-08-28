'use client';

import { ProfileList } from '@/components/molecules';

import { useFollowingList } from '../apis';

export const FollowingSection = ({ id }: { id: number }) => {
  const { flattenData, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useFollowingList(id);

  const fetchNextData = () => {
    if (hasNextPage && !isFetchingNextPage) {
      void fetchNextPage();
    }
  };

  return <ProfileList data={flattenData} fetchNextData={fetchNextData} />;
};
