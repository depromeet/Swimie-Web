'use client';

import { ProfileList } from '@/components/molecules';
import { flex } from '@/styled-system/patterns';

import { useBlockedList } from '../apis';
import { EmptyBlockedList } from '../components';

export const BlockedListSection = () => {
  const {
    flattenData,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isLoading,
  } = useBlockedList();

  const fetchNextData = () => {
    if (hasNextPage && !isFetchingNextPage) {
      void fetchNextPage();
    }
  };

  if (flattenData.length === 0 && !isLoading) return <EmptyBlockedList />;
  return (
    <div className={containerStyle}>
      <ProfileList
        data={flattenData}
        fetchNextData={fetchNextData}
        isLoading={isLoading}
        isFetchingNextPage={isFetchingNextPage}
        isBlockedList={true}
      />
    </div>
  );
};

const containerStyle = flex({
  direction: 'column',
  gap: '12px',
  p: '16px 20px',
});
