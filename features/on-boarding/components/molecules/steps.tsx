import Image from 'next/image';
import { Fragment, TouchEvent } from 'react';

import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

import { stepsIntroduce } from '../../constants';

interface StepsProps {
  onTouchStart: (e: TouchEvent<HTMLDivElement>) => void;
  onTouchEnd: (e: TouchEvent<HTMLDivElement>) => void;
  current: number;
}

export function Steps({ onTouchStart, onTouchEnd, current }: StepsProps) {
  const getHighlightedText = (text: string, highlightTexts: string[]) => {
    const regex = new RegExp(`(${highlightTexts.join('|')})`, 'g');
    const parts = text.split(regex);

    return parts.map((part, index) =>
      highlightTexts.includes(part) ? (
        <span key={index} className={textStyles.highlight}>
          {part}
        </span>
      ) : (
        <Fragment key={index}>{part}</Fragment>
      ),
    );
  };

  return (
    <div
      className={layout.total}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <p className={textStyles.total}>
        {getHighlightedText(
          stepsIntroduce[current].total,
          stepsIntroduce[current].highlight,
        )}
      </p>
      <div className={layout.image}>
        <Image
          key={current}
          src={stepsIntroduce[current].image}
          alt="온보딩 이미지"
          fill
          style={{ objectFit: 'contain' }}
          loading="eager"
        />
      </div>
    </div>
  );
}

const layout = {
  total: flex({
    direction: 'column',
    top: '87px',
    height: 'calc(100dvh - 87px)',
    position: 'absolute',
  }),
  image: css({
    position: 'relative',
    w: 'full',
    height: '68dvh',
  }),
};

const textStyles = {
  total: css({
    textStyle: 'heading3',
    padding: '0 30px',
    fontWeight: 600,
    textAlign: 'center',
    wordBreak: 'keep-all',
    marginBottom: '6px',
  }),
  highlight: css({
    color: 'primary.swim.총거리.default',
  }),
};
