import Link from 'next/link';

import { Button } from '@/components/atoms';
import { useMemberFollowingState } from '@/hooks';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';
import { MemberProfile } from '@/types';

import { ProfileImage } from '../profile-image';

type FollowListItem = {
  isMyProfile?: boolean;
  onClick?: () => void;
  onClickFollow?: () => void;
} & MemberProfile;
export const ProfileListItem = ({
  memberId,
  nickname,
  introduction,
  profileImageUrl,
  isMyProfile,
}: FollowListItem) => {
  const { useMemberIsFollowing, toggleFollow } = useMemberFollowingState();
  const { isFollowing } = useMemberIsFollowing(memberId);

  const handleClickFollow = () => {
    void toggleFollow(memberId);
  };

  return (
    <div className={containerStyle}>
      <Link href={`/profile/${memberId}`} className={linkStyle}>
        <div className={profileImageStyle}>
          <ProfileImage
            src={profileImageUrl ?? ''}
            alt="profile image"
            width={40}
            height={40}
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className={text.wrapperStyle}>
          <h1 className={text.nicknameStyle}>{nickname}</h1>
          {introduction && <p className={text.summaryStyle}>{introduction}</p>}
        </div>
      </Link>

      {!isMyProfile && (
        <>
          {isFollowing ? (
            <Button
              size="small"
              label="팔로잉"
              variant="outlined"
              buttonType="assistive"
              className={followButtonStyle}
              onClick={handleClickFollow}
            />
          ) : (
            <Button
              size="small"
              label="팔로우"
              variant="outlined"
              buttonType="primary"
              className={followButtonStyle}
              onClick={handleClickFollow}
            />
          )}
        </>
      )}
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
  width: '40px',
  height: '40px',
  align: 'stretch',
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

const followButtonStyle = css({
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
