import Link from 'next/link';

import { ProfileImage } from '@/components/molecules';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

import { ProfileProps } from '../../types/profile';

export function ProfileContainer({
  profileData,
}: {
  profileData: ProfileProps['data'];
}) {
  return (
    <>
      <div className={inforWrapper}>
        <div className={imageLayoutStyles}>
          <ProfileImage
            alt="profile image"
            src={profileData.profileImageUrl}
            fill
            sizes="10vw"
            className={css({
              borderRadius: 'full',
              objectFit: 'cover',
            })}
          />
        </div>
        <div>
          <div className={nameStyles}>{profileData.nickname}</div>
          <div className={introStyles}>{profileData.introduction}</div>
        </div>
      </div>
      <div className={friendStyles.container}>
        <Link
          className={friendStyles.item}
          href={`${profileData.memberId}/follow?tab=follower`}
        >
          <div className={friendStyles.type}>팔로워</div>
          <div className={friendStyles.count}>{profileData.followerCount}</div>
        </Link>
        <Link
          className={friendStyles.item}
          href={`${profileData.memberId}/follow?tab=following`}
        >
          <div className={friendStyles.type}>팔로잉</div>
          <div className={friendStyles.count}>{profileData.followingCount}</div>
        </Link>
      </div>
    </>
  );
}

const imageLayoutStyles = css({
  width: '60px',
  height: '60px',
  position: 'relative',
  flexShrink: 0,
});

const inforWrapper = flex({
  alignItems: 'flex-start',
  gap: '21px',
  alignSelf: 'stretch',
});

const nameStyles = css({
  textStyle: 'heading3',
  fontWeight: '600',
  color: 'text.normal',
});

const introStyles = css({
  textStyle: 'body2.normal',
  fontWeight: '500',
  color: 'text.alternative',
});

const friendStyles = {
  container: flex({
    alignItems: 'center',
    gap: '40px',
    alignSelf: 'stretch',
  }),
  item: flex({
    direction: 'column',
    alignItems: 'flex-start',
    gap: '2px',
  }),
  type: css({
    textStyle: 'label2',
    fontWeight: '500',
    color: 'text.alternative',
  }),
  count: css({
    textStyle: 'body2.normal',
    fontWeight: '600',
    color: 'text.normal',
  }),
};
