'use client';

import NextImage, { ImageProps } from 'next/image';
import React, { useState } from 'react';

import fallbackImage from '@/public/images/fallback.png';
import { css, cva, cx } from '@/styled-system/css';

export const Image = ({ src, alt, className, ...props }: ImageProps) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleError = () => {
    setImgSrc(fallbackImage);
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <NextImage
      {...props}
      src={imgSrc}
      alt={alt}
      onError={handleError}
      onLoad={handleLoad}
      className={cx(css(imageStyle.raw({ isLoaded: isLoaded })), className)}
    />
  );
};

const imageStyle = cva({
  variants: {
    isLoaded: {
      true: { visibility: 'visible', animation: 'dimFadeIn 0.3s' },
      false: { visibility: 'hidden' },
    },
  },
});
