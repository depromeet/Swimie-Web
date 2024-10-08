'use client';

import { useAtomValue } from 'jotai';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/atoms';
import LoginSuccessCharacter from '@/public/images/login/login-success-character.png';
import { AuthInfoAtom } from '@/store/auth';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

export default function Page() {
  const router = useRouter();
  const authInfo = useAtomValue(AuthInfoAtom);

  const handleGoToMain = () => {
    router.push('/');
  };

  return (
    <div className={pageContainer}>
      <div className={contentWrapper}>
        <div className={imgContainer}>
          <Image
            width={193}
            height={164}
            src={LoginSuccessCharacter}
            alt="회원가입 성공 이미지"
            priority
          />
        </div>
        <div className={textContainer}>
          <div className={subTextStyles}>가입 완료</div>
          <div className={mainTextStyles}>{authInfo.nickname}님, 환영해요</div>
        </div>
      </div>
      <div className={buttonWrapperStyles}>
        <Button
          label="시작하기"
          variant="solid"
          buttonType="primary"
          size="large"
          className={buttonStyles}
          onClick={handleGoToMain}
        />
      </div>
    </div>
  );
}

const pageContainer = flex({
  direction: 'column',
  justifyContent: 'space-between',
  height: '100dvh',
});

const contentWrapper = flex({
  direction: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
});

const imgContainer = css({
  width: '200px',
  height: '200px',
  flexShrink: '0',
  margin: '0 auto',
});

const textContainer = flex({
  direction: 'column',
  alignItems: 'center',
  gap: '5px',
});

const subTextStyles = css({
  alignSelf: 'stretch',
  color: 'primary.swim.총거리.default',
  textStyle: 'heading5',
  textAlign: 'center',
  fontWeight: '500',
});

const mainTextStyles = css({
  alignSelf: 'stretch',
  color: 'text.strong',
  textStyle: 'heading2',
  textAlign: 'center',
  fontWeight: '700',
});

const buttonWrapperStyles = flex({
  width: '100%',
  padding: '20px',
  direction: 'column',
  alignItems: 'center',
  gap: '10px',
});

const buttonStyles = css({
  width: '100%',
});
