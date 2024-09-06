'use client';

import { Virtuoso } from 'react-virtuoso';

import { LoadingArea } from '@/components/atoms';
import { useCurrentMemberInfo } from '@/hooks';
import { MemberProfile } from '@/types';

import { ProfileBlockedListItem } from './profile-blocked-list-item';
import { ProfileListItem } from './profile-list-item';
import { ProfileListSkeleton } from './profile-list-skeleton';

type ProfileList = {
  data: MemberProfile[];
  fetchNextData: () => void;
  isLoading?: boolean;
  isFetchingNextPage?: boolean;
  isBlockedList?: boolean;
};
export const ProfileList = ({
  data,
  fetchNextData,
  isLoading,
  isFetchingNextPage,
  isBlockedList = false,
}: ProfileList) => {
  const { data: myData } = useCurrentMemberInfo();

  const handleRangeChanged = (range: { endIndex: number }) => {
    const currentContentsLastIndex = data.length - 1;
    if (range.endIndex >= currentContentsLastIndex - 3) {
      void fetchNextData();
    }
  };

  const getIsMyProfile = (memberId: number) => {
    if (!myData?.data) return false;
    const myMemberId = myData?.data.id;
    return myMemberId === memberId;
  };

  if (isLoading) {
    return <ProfileListSkeleton />;
  }
  return (
    <Virtuoso
      data={data}
      overscan={500}
      useWindowScroll
      rangeChanged={handleRangeChanged}
      itemContent={(_, item) => (
        <>
          {isBlockedList ? (
            <ProfileBlockedListItem {...item} />
          ) : (
            <ProfileListItem
              {...item}
              isMyProfile={getIsMyProfile(item.memberId)}
            />
          )}
        </>
      )}
      style={{
        width: '100%',
        height: '100%',
      }}
      components={{
        Footer: () =>
          isFetchingNextPage ? <LoadingArea width={30} height={30} /> : <></>,
      }}
    />
  );
};
