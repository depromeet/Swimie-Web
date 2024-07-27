'use client';

import './page-modal.css';

import { ForwardedRef, forwardRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import { css, cx } from '@/styled-system/css';

import { PageModalProps } from './type';

export const PageModal = forwardRef(
  (
    { isOpen, jumpDirection, children, className }: PageModalProps,
    ref: ForwardedRef<HTMLElement>,
  ) => {
    return (
      <CSSTransition
        nodeRef={ref}
        classNames={`page-jump-${jumpDirection}`}
        timeout={300}
        in={isOpen}
        mountOnEnter
        unmountOnExit
        className={cx(pageModalStyles, className)}
      >
        {children}
      </CSSTransition>
    );
  },
);

PageModal.displayName = 'PageModal';

const pageModalStyles = css({
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'white',
  zIndex: 1000,
});
