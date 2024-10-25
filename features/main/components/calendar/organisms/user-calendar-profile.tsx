'use client';

import { Image } from '@/components/atoms';
import { useCurrentMemberInfo, useGreetingText } from '@/hooks';
import SwimieCharacterImage from '@/public/images/swimie-character.png';
import { css, cx } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

import { UserProfileSkeleton } from '../atoms/user-profile-skeleton';
import { Calendar } from '../molecules';

export const UserCalendarProfile = () => {
  const { data, isLoading } = useCurrentMemberInfo();
  const { data: greetingTextData } = useGreetingText();

  return (
    <>
      {isLoading ? (
        <UserProfileSkeleton />
      ) : (
        <div className={cx(profileContainerStyles, profileColorStyle)}>
          <Image
            width={91}
            height={88}
            src={SwimieCharacterImage}
            alt="swimie character"
            priority
          />
          <div className={userInfoStyles}>
            <p className={nicknameStyles}>{data?.data.nickname}님,</p>
            <p className={descriptionStyles}>
              {greetingTextData?.data.message}
            </p>
          </div>
        </div>
      )}

      <Calendar />
    </>
  );
};

export const profileContainerStyles = flex({
  padding: '0px 15px',
  gap: '10px',
  alignItems: 'center',
  borderRadius: '6px',
});

const profileColorStyle = css({
  backgroundColor: 'primary.swim.총거리.default',
});

const userInfoStyles = flex({
  height: 'full',
  direction: 'column',
  justifyContent: 'center',
});

const nicknameStyles = css({
  textStyle: 'heading6',
  fontWeight: 'bold',
  color: 'background.white',
});

const descriptionStyles = css({
  textStyle: 'label1.normal',
  fontWeight: 'medium',
  color: 'line.solid.neutral',
});
