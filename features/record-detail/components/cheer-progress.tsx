'use client';

import { useEffect, useState } from 'react';

import { css, cx } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

import { DetailCheerItem } from '../types';

type CheerProgress = {
  isOpen: boolean;
  onChangeOpen: (isOpen: boolean) => void;
  authorName: string;
  cheerItem?: DetailCheerItem;
};
export const CheerProgress = ({
  isOpen,
  onChangeOpen,
  authorName,
  cheerItem,
}: CheerProgress) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsFadingOut(false);

      const hideTimeout = setTimeout(() => {
        setIsFadingOut(true);
      }, 1200);

      const removeTimeout = setTimeout(() => {
        setIsVisible(false);
        onChangeOpen(false);
      }, 1500);

      return () => {
        clearTimeout(hideTimeout);
        clearTimeout(removeTimeout);
      };
    }
  }, [isOpen, onChangeOpen]);

  if (!isVisible || !cheerItem) return null;
  return (
    <div className={cx(containerStyle, isFadingOut && 'fade-out')}>
      <div className={content.wrapperStyle}>
        <h1 className={content.titleStyle}>
          {authorName}님에게
          <br />
          응원을 보내고 있어요!
        </h1>
        <div className={content.badgeStyle}>
          <p className={content.descriptionStyle}>
            {cheerItem.emoji}{' '}
            {Boolean(cheerItem.comment?.length) && (
              <span>{cheerItem.comment}</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

const containerStyle = css({
  position: 'fixed',
  top: '50%',
  left: '50%',
  translate: 'auto',
  translateX: '-1/2',
  translateY: '-1/2',
  width: 'full',
  maxWidth: 'maxWidth',
  m: '0 auto',
  height: 'full',
  backgroundColor: '#171719',
  zIndex: '200',

  opacity: 1,
  transition: 'opacity 300ms ease-out',
  '&.fade-out': {
    opacity: 0,
  },
});

const content = {
  wrapperStyle: flex({
    direction: 'column',
    alignItems: 'center',
    gap: '20px',
    position: 'fixed',
    top: '50%',
    left: '50%',
    translate: 'auto',
    translateX: '-1/2',
    translateY: '-1/2',
  }),

  titleStyle: css({
    textStyle: 'body1.normal',
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  }),

  badgeStyle: css({
    width: 'fit-content',
    p: '10px 18px',
    backgroundColor: 'white',
    rounded: '8px',
  }),

  descriptionStyle: css({
    textStyle: 'heading4',
    fontWeight: 'bold',
    color: 'text.normal',

    '& > span': {
      ml: '8px',
    },
  }),
};
