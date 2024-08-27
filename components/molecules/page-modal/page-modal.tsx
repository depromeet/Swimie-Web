'use client';

import './page-modal.css';

import { ForwardedRef, forwardRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import { usePreventBodyScroll } from '@/hooks';
import { css, cx } from '@/styled-system/css';

import { PageModalProps } from './type';

/**
 * @param isOpen page-modal open 여부
 * @param jumpDirection page-modal이 나오는 방향 결정
 * @param children 자식 요소
 * @param className 외부 스타일 주입
 */
export const PageModal = forwardRef(
  (
    { isOpen, jumpDirection, children, className }: PageModalProps,
    ref: ForwardedRef<HTMLElement>,
  ) => {
    usePreventBodyScroll({ isOpen });
    return (
      <CSSTransition
        nodeRef={ref}
        classNames={`page-jump-${jumpDirection}`}
        timeout={300}
        in={isOpen}
        mountOnEnter
        unmountOnExit
        className={cx(layoutStyles, className)}
      >
        {children}
      </CSSTransition>
    );
  },
);

PageModal.displayName = 'PageModal';

const layoutStyles = css({
  position: 'fixed',
  bottom: 0,
  width: '100vw',
  maxWidth: 'maxWidth',
  height: '100dvh',
  backgroundColor: 'white',
  zIndex: 1000,
  overflow: 'auto',
});
