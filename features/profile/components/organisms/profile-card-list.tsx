import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

import { ProfileCard } from '../molecules';

interface ProfileCardListProps {
  title: string;
}

export function ProfileCardList({ title }: ProfileCardListProps) {
  const recommendedUserIds = [64, 56, 298, 480, 397];
  return (
    <section className={ProfileCardListStyle.layout}>
      <p className={ProfileCardListStyle.title}>{title}</p>
      <div className={ProfileCardListStyle.slider}>
        {recommendedUserIds.map((id) => (
          <ProfileCard key={id} id={id} />
        ))}
      </div>
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
