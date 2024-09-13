'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import {
  AppleLogoIcon,
  GoogleLogoIcon,
  KakaoLogoIcon,
} from '@/components/atoms/icons';
import LoginMainCharacter from '@/public/images/login/login-main-character.png';
import SwimieLetterLogo from '@/public/images/login/swimie-letter-logo.png';
import { css, cva } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

import { useLoginFailDialogHandler } from '../../hook/use-login-fail-dialog-handler';

type LoginScreen = {
  isAnimate?: boolean;
};
export const LoginScreen = ({ isAnimate = true }: LoginScreen) => {
  const [isAppleLoginDisabled, setIsAppleLoginDisabled] = useState(false);
  const { openFailModal } = useLoginFailDialogHandler();

  const kakaoLogin = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code&prompt=select_account`;
  };

  const googleLogin = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&response_type=code&scope=email profile&prompt=consent&access_type=offline`;
  };

  const appleLogin = () => {
    setIsAppleLoginDisabled(true);
    window.location.href = `https://appleid.apple.com/auth/authorize?client_id=${process.env.NEXT_PUBLIC_APPLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_APPLE_REDIRECT_URI}&response_type=code id_token&scope=name email&response_mode=form_post`;

    setTimeout(() => {
      setIsAppleLoginDisabled(false);
    }, 5000);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.get('login-failed')) {
      openFailModal();
    }
  }, []);

  return (
    <div className={loginPage}>
      <motion.div
        {...(isAnimate && {
          initial: { y: 0, opacity: 0 },
          animate: {
            y: 0,
            opacity: 1,
          },
          transition: {
            ease: 'easeOut',
            duration: 0.3,
            delay: 0.5,
          },
        })}
      >
        <div className={logoStyles}>
          <div className={logoContainer}>
            <Image
              width={149}
              height={34}
              alt="swimie logo"
              src={SwimieLetterLogo}
            />
            <div className={titleStyles}>친구들의 응원과 함께하는 수영일기</div>
          </div>
          <div className={characterContainer}>
            <Image
              width={600}
              alt="swimie character"
              src={LoginMainCharacter}
              className={css({
                objectFit: 'cover',
              })}
            />
          </div>
          <div className={loginButtons}>
            <button className={buttons({ type: 'kakao' })} onClick={kakaoLogin}>
              <div className={buttonContent}>
                <KakaoLogoIcon />
                <span>카카오로 로그인</span>
              </div>
            </button>
            <button
              className={buttons({ type: 'google' })}
              onClick={googleLogin}
            >
              <div className={buttonContent}>
                <GoogleLogoIcon />
                <span>Google로 로그인</span>
              </div>
            </button>
            <button
              className={buttons({ type: 'apple' })}
              onClick={appleLogin}
              disabled={isAppleLoginDisabled}
            >
              <div className={buttonContent}>
                <AppleLogoIcon />
                <span>Apple로 로그인</span>
              </div>
            </button>
          </div>
          <p className={agreementStyles}>
            시작함으로써 <Link href="/setting/terms">이용약관</Link> 및{' '}
            <Link href="/setting/privacy-policy">개인정보 처리방침</Link>에
            동의합니다.
          </p>
        </div>
        {/* TODO: Button 리팩토링 예정 */}
      </motion.div>
    </div>
  );
};

const loginPage = flex({
  background: 'linear-gradient(180deg, #3B87F4 0%, #347FEA 100%)',
  direction: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100dvh',
  gap: '50px',
  overflow: 'hidden',
});

const logoStyles = flex({
  justifyContent: 'center',
  alignItems: 'center',
  direction: 'column',
  gap: '12px',
});

const logoContainer = flex({
  direction: 'column',
  alignItems: 'center',
  gap: '12px',
  alignSelf: 'stretch',
});

const characterContainer = flex({
  position: 'relative',
  width: 'max-content',
  height: 'auto',
  direction: 'column',
  alignItems: 'center',
  overflow: 'hidden',
});

const titleStyles = css({
  color: 'background.white',
  textStyle: 'heading6',
  fontWeight: '500',
  textAlign: 'center',
});

const loginButtons = flex({
  padding: '0px 20px',
  direction: 'column',
  alignItems: 'flex-start',
  gap: '8px',
  alignSelf: 'stretch',
  margin: '0 auto',
});

const buttonContent = flex({
  alignItems: 'center',
  justifyContent: 'center',
  gap: '6px',
});

const buttons = cva({
  base: {
    width: '335px',
    height: '48px',
    flexShrink: 0,
    borderRadius: '10px',
    cursor: 'pointer',
    '& span': {
      textStyle: 'body1.normal',
      fontWeight: 'bold',
    },
  },
  variants: {
    type: {
      kakao: {
        backgroundColor: '#FFCC00',
        '& span': { color: 'text.normal' },
      },
      google: {
        backgroundColor: 'background.white',
        borderColor: 'line.neutral',
        border: '1px solid',
        '& span': { color: 'text.neutral' },
      },
      apple: {
        backgroundColor: 'static.black',
        '& span': { color: 'static.white' },
      },
    },
  },
});

const agreementStyles = css({
  textStyle: 'caption2',
  fontWeight: 'regular',
  color: 'line.solid.normal',
  '& > a': { textDecoration: 'underline' },
});
