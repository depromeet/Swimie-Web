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

  return (
    <div style={{ overscrollBehaviorX: 'none' }}>
      {isSplashCompleted ? <LoginScreen /> : <LogoSplash />}
    </div>
  );
}
