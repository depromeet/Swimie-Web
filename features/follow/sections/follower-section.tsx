'use client';

import { ProfileList } from '@/components/molecules';

import { useFollowerList } from '../apis';

export const FollowerSection = ({ id }: { id: number }) => {
  const { flattenData, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useFollowerList(id);

  const fetchNextData = () => {
    if (hasNextPage && !isFetchingNextPage) {
      void fetchNextPage();
    }
  };

  return <ProfileList data={flattenData} fetchNextData={fetchNextData} />;
};
