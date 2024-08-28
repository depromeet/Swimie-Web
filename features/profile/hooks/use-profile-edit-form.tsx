'use client';

import { useState } from 'react';

import { ProfileIndexType } from '@/public/images/default-profile';

export function useProfileEditForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File>();
  const [defaultProfileIndex, setDefaultProfileIndex] =
    useState<ProfileIndexType>(0);

  const onChangeImageFile = (file?: File) => {
    setImageFile(file);
  };

  const onChangeIsLoading = (isLoading: boolean) => {
    setIsLoading(isLoading);
  };

  const onChangeDefaultProfileIndex = (index: ProfileIndexType) => {
    setDefaultProfileIndex(index);
  };

  return {
    isLoading,
    imageFile,
    defaultProfileIndex,
    handlers: {
      onChangeIsLoading,
      onChangeImageFile,
      onChangeDefaultProfileIndex,
    },
  };
}
