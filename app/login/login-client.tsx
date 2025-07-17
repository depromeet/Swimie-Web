'use client';

import { useEffect, useState } from 'react';

import { Modal } from '@/components/molecules/modal/modal';
import { LoginScreen, LogoSplash } from '@/features/login';
import { css } from '@/styled-system/css';

export default function LoginClient() {
  const [isSplashCompleted, setIsSplashCompleted] = useState(false);
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashCompleted(true);
      setIsWelcomeModalOpen(true);
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
      <Modal
        isOpen={isWelcomeModalOpen}
        onClose={() => setIsWelcomeModalOpen(false)}
        title="스위미 서비스 종료 안내"
        button={{
          text: '확인했어요',
          onClick: () => setIsWelcomeModalOpen(false),
        }}
      >
        <p className={contentStyle}>
          안녕하세요, 스위미입니다.
          <br />
          스위미를 통해 수영 기록을 남겨주신 모든분들께 감사의 말씀을 전합니다.
          <br />
          아쉽게도 스위미는 2025년 7월 19일부로 서비스 운영을 종료합니다.
          <br />
          그동안 스위미를 이용해 주시고, 함께해 주셔서 진심으로 감사드립니다!
        </p>
      </Modal>
    </div>
  );
}

const contentStyle = css({
  whiteSpace: 'pre-wrap',
  textAlign: 'center',
  textStyle: 'body2',
  color: 'text.normal',
});
