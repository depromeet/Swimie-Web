'use client';

import { useEffect } from 'react';
/**
 * @description body element의 scroll을 막고 싶을 때 사용합니다.
 *
 * usePreventBodyScroll({ isOpen: false or true })
 */
export const usePreventBodyScroll = ({ isOpen }: { isOpen: boolean }) => {
  useEffect(() => {
    const body = document.querySelector('body');
    if (!body) return;

    if (isOpen) {
      body.style.cssText =
        'overflow:hidden; -webkit-overflow-scrolling: none; touch-action: none; overscroll-behavior: none; height: 100vh;';
    } else {
      body.removeAttribute('style');
    }
  }, [isOpen]);
};
