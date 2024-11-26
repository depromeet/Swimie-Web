import { Suspense } from 'react';

import { useCurrentMemberInfo, useMemberFollowingState } from '@/hooks';
import { css, cva } from '@/styled-system/css';

import { recommendedMemberIds } from '../../constants';
import { RecommendedProfileCard } from '../molecules';

type VariantType = 'vertical' | 'horizontal';

export interface ProfileCardListProps {
  title: string;
  variant?: VariantType;
}

export function RecommendedProfileCardList({
  title,
  variant = 'horizontal',
}: ProfileCardListProps) {
  const { data: myData } = useCurrentMemberInfo();
  const { useSyncFollowingListState } = useMemberFollowingState();
  useSyncFollowingListState(recommendedMemberIds);

  const getIsMyProfile = (memberId: number) => {
    if (!myData?.data) return false;
    const myMemberId = myData?.data.id;
    return myMemberId === memberId;
  };

  return (
    <section className={ProfileCardListStyle.layout}>
      <p className={ProfileCardListStyle.title}>{title}</p>
      <Suspense>
        <div className={css(ProfileCardListStyle.slider.raw({ variant }))}>
          {recommendedMemberIds.map((memberId) => (
            <RecommendedProfileCard
              key={memberId}
              variant={variant === 'vertical' ? 'horizontal' : 'vertical'}
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
  slider: cva({
    base: {
      display: 'flex',
      gap: '8px',
      overflowX: 'auto',
      mb: '16px',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
    variants: {
      variant: {
        vertical: {
          flexDirection: 'column',
        },
        horizontal: {},
      },
    },
  }),
};
