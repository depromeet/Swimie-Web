import Link from 'next/link';

import { Button } from '@/components/atoms';
import { ProfileImage } from '@/components/molecules';
import { useProfileData } from '@/features/profile/hooks';
import { useMemberFollowingState } from '@/hooks';
import { css, cva } from '@/styled-system/css';

import { ProfileCardListProps } from '../organisms';

interface ProfileCardProps extends Pick<ProfileCardListProps, 'variant'> {
  isMyProfile: boolean;
  memberId: number;
}

export function RecommendedProfileCard({
  variant = 'vertical',
  isMyProfile,
  memberId,
}: ProfileCardProps) {
  const { data: profileData } = useProfileData(memberId);
  const { useMemberIsFollowing, toggleFollow } = useMemberFollowingState();
  const { isFollowing } = useMemberIsFollowing(memberId);

  const handleClickFollow = () => {
    void toggleFollow(memberId);
  };

  if (!profileData) return null;
  return (
    <div className={css(ProfileCardStyle.layout.raw({ variant }))}>
      <Link
        href={`/profile/${memberId}`}
        className={css(ProfileCardStyle.link.raw({ variant }))}
      >
        <div className={css(ProfileCardStyle.imageLayout.raw({ variant }))}>
          <ProfileImage
            alt="profile image"
            src={profileData.profileImageUrl}
            fill
            sizes="25vw"
            className={css({ borderRadius: 'full', objectFit: 'cover' })}
          />
        </div>
        <div className={css(ProfileCardStyle.textLayout.raw({ variant }))}>
          <p className={ProfileCardStyle.nickname}>{profileData.nickname}</p>
          <p className={css(ProfileCardStyle.introduction.raw({ variant }))}>
            {profileData.introduction ? profileData.introduction : null}
          </p>
        </div>
      </Link>
      <div className={css(ProfileCardStyle.followButton.raw({ variant }))}>
        {!isMyProfile && (
          <Button
            size="small"
            label={isFollowing ? '팔로잉' : '팔로우'}
            variant="outlined"
            buttonType={isFollowing ? 'assistive' : 'primary'}
            className={css({ w: 'full' })}
            onClick={handleClickFollow}
          />
        )}
      </div>
    </div>
  );
}

const ProfileCardStyle = {
  layout: cva({
    base: {
      position: 'relative',
      flexShrink: 0,
      backgroundColor: 'fill.normal',
      borderRadius: '10px',
      p: '16px',
    },
    variants: {
      variant: {
        vertical: { width: '146px', height: '208px' },
        horizontal: { display: 'flex', alignItems: 'center', height: '100px' },
      },
    },
  }),
  link: cva({
    base: {
      w: 'full',
      display: 'flex',
      position: 'relative',
    },
    variants: {
      variant: {
        vertical: {
          flexDirection: 'column',
          alignItems: 'center',
        },
        horizontal: {
          alignItems: 'center',
        },
      },
    },
  }),
  imageLayout: cva({
    base: {
      position: 'relative',
      w: '60px',
      h: '60px',
    },
    variants: {
      variant: {
        vertical: {
          mb: '12px',
        },
        horizontal: {},
      },
    },
  }),
  nickname: css({
    textStyle: 'body2.normal',
    fontWeight: 600,
    mb: '2px',
  }),
  introduction: cva({
    base: {
      textStyle: 'label2',
      fontWeight: 400,
      color: 'text.alternative',
      lineClamp: 2,
    },
    variants: {
      variant: {
        vertical: {
          textAlign: 'center',
        },
        horizontal: { wordBreak: 'keep-all' },
      },
    },
  }),
  textLayout: cva({
    base: {
      display: 'flex',
      flexDirection: 'column',
    },
    variants: {
      variant: {
        vertical: {
          alignItems: 'center',
        },
        horizontal: {
          justifyContent: 'center',
          ml: '12px',
          w: '50%',
        },
      },
    },
  }),
  followButton: cva({
    base: {
      position: 'absolute',
    },
    variants: {
      variant: {
        vertical: {
          w: 'full',
          p: '0 20px',
          bottom: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
        },
        horizontal: {
          right: '16px',
        },
      },
    },
  }),
};
