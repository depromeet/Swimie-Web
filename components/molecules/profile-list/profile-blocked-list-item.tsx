import Link from 'next/link';

import { Button } from '@/components/atoms';
import { useBlockedList, useUnblocked } from '@/features/setting-blocked/apis';
import { useToast } from '@/hooks';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';
import { MemberProfile } from '@/types';

import { ProfileImage } from '../profile-image';

type FollowListItem = {
  isMyProfile?: boolean;
  onClick?: () => void;
} & MemberProfile;
export const ProfileBlockedListItem = ({
  memberId,
  nickname,
  introduction,
  profileImageUrl,
}: FollowListItem) => {
  const { refetch } = useBlockedList();
  const { mutate } = useUnblocked();
  const { toast } = useToast();

  const handleClickBlockedItem = () => {
    mutate(memberId, {
      onSuccess: () => {
        toast(`${nickname}님이 차단 헤제 되었어요`);
        void refetch();
      },
    });
  };

  return (
    <div className={containerStyle}>
      <Link href={`/profile/${memberId}`} className={linkStyle}>
        <div className={profileImageStyle}>
          <ProfileImage
            src={profileImageUrl ?? ''}
            alt="profile image"
            sizes="30vw"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className={text.wrapperStyle}>
          <h1 className={text.nicknameStyle}>{nickname}</h1>
          {introduction && <p className={text.summaryStyle}>{introduction}</p>}
        </div>
      </Link>

      <Button
        size="small"
        label="차단 해제"
        variant="outlined"
        buttonType="assistive"
        className={blockedButtonStyle}
        onClick={handleClickBlockedItem}
      />
    </div>
  );
};

const containerStyle = flex({
  py: '8px',
  align: 'center',
  maxWidth: '100%',
  justify: 'space-between',
});

const profileImageStyle = flex({
  position: 'relative',
  width: '40px',
  height: '40px',
  align: 'center',
  rounded: 'full',
  overflow: 'hidden',
  flexShrink: 0,
});

const linkStyle = flex({
  // button, gap
  maxWidth: 'calc(100% - 70px - 16px)',
  gap: '16px',
  align: 'center',
  mr: '16px',
});

const blockedButtonStyle = css({
  flexShrink: 0,
});

const text = {
  wrapperStyle: flex({
    gap: '2px',
    direction: 'column',
    flexGrow: 1,
    overflow: 'hidden',
  }),

  nicknameStyle: css({
    textStyle: 'heading6',
    fontWeight: 'bold',
  }),

  summaryStyle: css({
    width: '100%',
    textStyle: 'body2.normal',
    fontWeight: 'regular',
    color: 'text.alternative',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  }),
};
