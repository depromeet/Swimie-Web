'use client';

import { ProfileList } from '@/components/molecules';
import { flex } from '@/styled-system/patterns';

import { useProfileSearch } from '../apis/use-profile-search';
import { EmptyKeyword, EmptySearchResult } from '../components';

export const SearchResultSection = ({ keyword }: { keyword: string }) => {
  const {
    flattenData,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isLoading,
  } = useProfileSearch(keyword);

  const fetchNextData = () => {
    if (hasNextPage && !isFetchingNextPage) {
      void fetchNextPage();
    }
  };

  if (!keyword.length) return <EmptyKeyword />;
  if (flattenData.length === 0 && !isLoading)
    return <EmptySearchResult keyword={keyword} />;
  return (
    <div className={containerStyle}>
      <ProfileList
        data={flattenData}
        fetchNextData={fetchNextData}
        isLoading={isLoading}
        isFetchingNextPage={isFetchingNextPage}
      />
    </div>
  );
};

const containerStyle = flex({
  direction: 'column',
  gap: '12px',
  p: '16px 20px',
});
