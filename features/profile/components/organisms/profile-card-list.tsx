import { Suspense } from 'react';

import { useCurrentMemberInfo, useMemberFollowingState } from '@/hooks';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

import { ProfileCard } from '../molecules';

interface ProfileCardListProps {
  title: string;
}

export function ProfileCardList({ title }: ProfileCardListProps) {
  const recommendedUserIds = [64, 56, 298, 480, 397];

  const { data: myData } = useCurrentMemberInfo();
  const { useSyncFollowingListState } = useMemberFollowingState();
  useSyncFollowingListState(recommendedUserIds);

  const getIsMyProfile = (memberId: number) => {
    if (!myData?.data) return false;
    const myMemberId = myData?.data.id;
    return myMemberId === memberId;
  };

  return (
    <section className={ProfileCardListStyle.layout}>
      <p className={ProfileCardListStyle.title}>{title}</p>
      <Suspense>
        <div className={ProfileCardListStyle.slider}>
          {recommendedUserIds.map((memberId) => (
            <ProfileCard
              key={memberId}
              memberId={memberId}
              isMyProfile={getIsMyProfile(memberId)}
            />
          ))}
        </div>
      </Suspense>
    </section>
  );
}

const ProfileCardListStyle = {
  layout: css({
    w: 'full',
    padding: '0 20px',
    mt: '16px',
  }),
  title: css({
    textStyle: 'heading6',
    color: 'text.normal',
    fontWeight: 600,
    mb: '16px',
  }),
  slider: flex({
    gap: '8px',
    overflowX: 'auto',
    mb: '16px',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  }),
};
