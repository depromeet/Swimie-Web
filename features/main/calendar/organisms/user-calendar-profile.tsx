'use client';

import { useAtomValue } from 'jotai';

import { Image } from '@/components/atoms';
import { calendarSwimCountAtom } from '@/store';
import { AuthInfoAtom } from '@/store/auth';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

import { Calendar } from '../molecules';

export const UserCalendarProfile = () => {
  const { nickname } = useAtomValue(AuthInfoAtom);
  const totalSwimCount = useAtomValue(calendarSwimCountAtom);
  const isEmptyCount = totalSwimCount === 0;

  return (
    <>
      <div className={profileContainerStyles}>
        <Image
          className={characterImageStyles}
          width={70}
          height={75}
          src="/images/swimie-character.svg"
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
  padding: '14px 11px',
  gap: '4px',
  alignItems: 'center',
  borderRadius: '6px',
  backgroundColor: 'primary.swim.총거리.default',
});

const characterImageStyles = css({ margin: '0 10px' });

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
