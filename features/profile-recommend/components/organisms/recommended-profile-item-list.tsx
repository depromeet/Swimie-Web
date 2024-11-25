import { useMemberFollowingState } from '@/hooks';
import { css } from '@/styled-system/css';

import { recommendedMemberIds } from '../../constants';
import { RecommendedProfileItem } from '../molecules';

interface RecommendedProfileItemListProps {
  title: string;
}

export function RecommendedProfileItemList({
  title,
}: RecommendedProfileItemListProps) {
  const { useSyncFollowingListState } = useMemberFollowingState();
  useSyncFollowingListState(recommendedMemberIds);

  return (
    <section className={RecommendedProfileItemListStyle.layout}>
      <p className={RecommendedProfileItemListStyle.title}>{title}</p>
      {recommendedMemberIds.map((memberId) => (
        <RecommendedProfileItem key={memberId} memberId={memberId} />
      ))}
    </section>
  );
}

const RecommendedProfileItemListStyle = {
  layout: css({
    p: '24px 20px 0 20px',
  }),
  title: css({
    textStyle: 'heading6',
    fontWeight: 600,
    color: 'text.normal',
    mb: '16px',
  }),
};
