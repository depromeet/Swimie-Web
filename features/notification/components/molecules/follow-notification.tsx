import Link from 'next/link';
import React, { forwardRef } from 'react';

import { Button } from '@/components/atoms';
import { ProfileImage } from '@/components/molecules';
import { useMemberFollowingState } from '@/hooks';
import { css, cva } from '@/styled-system/css';
import { convertTimeToElapsedTime } from '@/utils';

import { useReadNotification } from '../../apis/use-read-notification';
import { FollowNotificationProps } from '../../types';

export const FollowNotification = forwardRef<
  HTMLLIElement,
  FollowNotificationProps
>(
  (
    {
      type,
      notificationId,
      nickname,
      profileImageUrl,
      memberId,
      createdAt,
      hasRead,
    },
    ref,
  ) => {
    const { useMemberIsFollowing, toggleFollow } = useMemberFollowingState();
    const { isFollowing } = useMemberIsFollowing(memberId);
    const { mutate: readNotification } = useReadNotification();

    const handleListElementClick = () => {
      readNotification({ notificationId, type });
    };

    const handleFollowButtonClick = () => {
      void toggleFollow(memberId);
    };

    return (
      <li ref={ref} className={css(layoutStyles.total.raw({ hasRead }))}>
        <Link
          href={`/profile/${memberId}`}
          onClick={handleListElementClick}
          className={css({ display: 'flex' })}
        >
          <div className={layoutStyles.profileImage}>
            <ProfileImage
              alt="프로필 사진"
              src={profileImageUrl ?? ''}
              fill
              sizes="20vw"
              className={css({ borderRadius: 'full', objectFit: 'cover' })}
            />
          </div>
          <div className={css(layoutStyles.text.raw({ type }))}>
            {type === 'FRIEND' && (
              <p className={textStyles.main}>
                <span className={textStyles.userName}>{nickname}</span>님과
                친구가 되었어요!
              </p>
            )}
            {type === 'FOLLOW' && (
              <p className={textStyles.main}>
                <span className={textStyles.userName}>{nickname}</span>님을
                아시나요?{' '}
                <span className={textStyles.userName}>{nickname}</span>
                님이 나를 팔로우했어요.
              </p>
            )}
            <span className={textStyles.time}>
              {convertTimeToElapsedTime(createdAt)}
            </span>
          </div>
        </Link>

        {type === 'FOLLOW' &&
          (isFollowing ? (
            <div>
              <Button
                size="small"
                label="팔로잉"
                variant="outlined"
                buttonType="assistive"
                className={layoutStyles.button}
                onClick={handleFollowButtonClick}
              />
            </div>
          ) : (
            <Button
              size="small"
              label="팔로우"
              variant="outlined"
              buttonType="primary"
              className={layoutStyles.button}
              onClick={handleFollowButtonClick}
            />
          ))}
      </li>
    );
  },
);

FollowNotification.displayName = 'FollowNotification';

const layoutStyles = {
  total: cva({
    base: { position: 'relative', padding: '16px 20px' },
    variants: {
      hasRead: {
        true: {},
        false: {
          backgroundColor: '#F7FBFF',
        },
      },
    },
  }),
  text: cva({
    base: {
      marginLeft: '16px',
      gap: '4px',
      wordBreak: 'keep-all',
    },
    variants: {
      type: {
        FOLLOW: {
          width: '60%',
        },
        FRIEND: {
          width: '60%',
        },
        CHEER: {},
      },
    },
  }),
  button: css({
    position: 'absolute',
    top: '16px',
    right: '20px',
    backgroundColor: 'transparent',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#3B87F4',
      opacity: 0.05,
    },
  }),
  profileImage: css({
    position: 'relative',
    width: '40px',
    height: '40px',
  }),
};

const textStyles = {
  main: css({
    textStyle: 'body2.normal',
    fontWeight: 400,
    color: 'text.normal',
  }),
  userName: css({
    textStyle: 'body2.normal',
    fontWeight: 600,
    color: 'text.normal',
  }),
  time: css({
    textStyle: 'label2',
    color: 'text.alternative',
    fontWeight: 400,
  }),
  description: css({
    textStyle: 'body2.normal',
    fontWeight: 400,
    color: 'text.alternative',
  }),
};
