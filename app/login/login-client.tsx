'use client';

import { AppleLogoIcon } from '@/components/atoms/icons/apple-logo-icon';
import { GoogleLogoIcon } from '@/components/atoms/icons/google-logo-icon';
import { KakaoLogoIcon } from '@/components/atoms/icons/kakao-logo-icon';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

export default function LoginClient() {
  const kakaoLogin = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code`;
  };

  const googleLogin = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&response_type=code&scope=email profile`;
  };

  return (
    <div className={loginPage}>
      <div className={logo}>Swimie</div>
      <div className={loginButtons}>
        <button className={kakaoLoginButton} onClick={kakaoLogin}>
          <div className={buttonContent}>
            <KakaoLogoIcon />
            <span>카카오로 로그인</span>
          </div>
        </button>
        <button className={googleLoginButton} onClick={googleLogin}>
          <div className={buttonContent}>
            <GoogleLogoIcon />
            <span>Google로 로그인</span>
          </div>
        </button>
        <button className={appleLoginButton}>
          <div className={buttonContent}>
            <AppleLogoIcon />
            <span>Apple ID로 로그인</span>
          </div>
        </button>
      </div>
    </div>
  );
}
const loginPage = flex({
  direction: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  gap: '10px',
});

const logo = flex({
  height: '65vh',
  width: '335px',
  justifyContent: 'center',
  alignItems: 'center',
  fontWeight: '700',
  fontSize: '24px',
});

const loginButtons = flex({
  direction: 'column',
  gap: '5px',
});

const buttonContent = flex({
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
});

const buttonTextStyles = {
  textStyle: 'body1.normal',
  fontWeight: 'bold',
};

const buttonStyles = {
  width: '335px',
  height: '48px',
  borderRadius: '10px',
  padding: '12px 28px',
  cursor: 'pointer',
};

const kakaoLoginButton = css({
  ...buttonStyles,
  backgroundColor: '#FFCC00',
  '& span': { ...buttonTextStyles, color: 'text.normal' },
});

const googleLoginButton = css({
  ...buttonStyles,
  backgroundColor: 'background.white',
  borderColor: 'line.neutral',
  border: '1px solid',
  '& span': { ...buttonTextStyles, color: 'text.neutral' },
});

const appleLoginButton = css({
  ...buttonStyles,
  backgroundColor: 'static.black',
  '& span': { ...buttonTextStyles, color: 'static.white' },
});
