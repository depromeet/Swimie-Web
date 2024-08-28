'use client';

import { useAtomValue } from 'jotai';

import { Image, LoadingArea } from '@/components/atoms';
import { useCurrentMemberInfo } from '@/hooks';
import SwimieCharacterImage from '@/public/images/swimie-character.png';
import { calendarSwimCountAtom } from '@/store';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

import { Calendar } from '../molecules';

export const UserCalendarProfile = () => {
  const { data, isLoading } = useCurrentMemberInfo();
  const totalSwimCount = useAtomValue(calendarSwimCountAtom);
  const isEmptyCount = totalSwimCount === 0;

  if (isLoading || !data) return <LoadingArea width={30} height={30} />;

  const { nickname } = data.data;

  return (
    <>
      <div className={profileContainerStyles}>
        <Image
          width={91}
          height={88}
          src={SwimieCharacterImage}
          alt="swimie character"
          priority
        />
        <div className={userInfoStyles}>
          <p className={nicknameStyles}>{nickname}님,</p>
          <p className={descriptionStyles}>
            {isEmptyCount
              ? '이번달 수영 기록을 해볼까요?'
              : `이번달 수영을 ${totalSwimCount}번 다녀왔어요!`}
          </p>
        </div>
      </div>

      <Calendar />
    </>
  );
};

const profileContainerStyles = flex({
  padding: '0px 15px',
  gap: '10px',
  alignItems: 'center',
  borderRadius: '6px',
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
