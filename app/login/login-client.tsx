'use client';

import { useEffect, useState } from 'react';

import { LoginScreen, LogoSplash } from '@/features/login';

export default function LoginClient() {
  const [isSplashCompleted, setIsSplashCompleted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashCompleted(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // 뒤로가기 스와이프 방지
  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
    };
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    return () => document.removeEventListener('touchmove', handleTouchMove);
  }, []);

  return (
    <div style={{ overscrollBehaviorX: 'none' }}>
      {isSplashCompleted ? <LoginScreen /> : <LogoSplash />}
    </div>
  );
}
