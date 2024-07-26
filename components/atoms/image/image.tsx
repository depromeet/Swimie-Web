'use client';

import NextImage, { ImageProps } from 'next/image';
import React, { useState } from 'react';

import fallbackImage from '@/public/images/fallbackImage.png';
import { css, cva } from '@/styled-system/css';

export const Image = ({ src, alt, ...props }: ImageProps) => {
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
      className={css(imageStyle.raw({ isLoaded: isLoaded }))}
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
