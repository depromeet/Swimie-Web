import Link from 'next/link';

import { ProfileImage } from '@/components/molecules';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

import { useProfileData } from '../../hooks';
import { FollowButton } from '../atoms';

interface ProfileCardProps {
  id: number;
}

export function ProfileCard({ id }: ProfileCardProps) {
  const { data: profileData } = useProfileData(id);
  if (!profileData) return null;
  return (
    <Link href={`/profile/${id}`} className={ProfileCardStyle.layout}>
      <div className={ProfileCardStyle.image}>
        <ProfileImage
          alt="profile image"
          src={profileData.profileImageUrl}
          fill
          sizes="25vw"
          className={css({ borderRadius: 'full', objectFit: 'cover' })}
        />
      </div>
      <p className={ProfileCardStyle.nickname}>{profileData.nickname}</p>
      <p className={ProfileCardStyle.introduction}>
        {profileData.introduction
          ? profileData.introduction.length > 22
            ? profileData.introduction.slice(0, 22) + '...'
            : profileData.introduction
          : null}
      </p>
      <div className={ProfileCardStyle.followButton}>
        <FollowButton followingId={id} />
      </div>
    </Link>
  );
}

const ProfileCardStyle = {
  layout: flex({
    position: 'relative',
    direction: 'column',
    alignItems: 'center',
    width: '146px',
    height: '208px',
    backgroundColor: 'fill.normal',
    borderRadius: '10px',
    shrink: 0,
    p: '16px',
  }),
  image: css({
    position: 'relative',
    w: '60px',
    h: '60px',
    mb: '12px',
  }),
  nickname: css({
    textStyle: 'body2.normal',
    fontWeight: 600,
    mb: '2px',
  }),
  introduction: css({
    textStyle: 'label2',
    fontWeight: 400,
    color: 'text.alternative',
    textAlign: 'center',
  }),
  followButton: css({
    w: 'full',
    p: '0 20px',
    position: 'absolute',
    bottom: '16px',
  }),
};
