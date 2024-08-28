'use client';

import { ImageProps } from 'next/image';
import React, { useMemo } from 'react';

import {
  defaultProfileImages,
  ProfileIndexType,
} from '@/public/images/default-profile';

import { Image } from '../../atoms';

export const ProfileImage = ({
  src,
  alt = 'profile image',
  ...props
}: ImageProps) => {
  const imageSrc = useMemo(() => {
    const profileImage = defaultProfileImages[Number(src) as ProfileIndexType];
    return profileImage ?? src;
  }, [src]);

  return <Image src={imageSrc} alt={alt} {...props} />;
};
