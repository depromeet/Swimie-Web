'use client';

import { useState } from 'react';

import { ProfileIndexType } from '@/public/images/default-profile';

export function useProfileEditForm() {
  const [imageFile, setImageFile] = useState<File>();
  const [defaultProfileIndex, setDefaultProfileIndex] =
    useState<ProfileIndexType>(0);

  const onChangeImageFile = (file?: File) => {
    setImageFile(file);
  };

  const onChangeDefaultProfileIndex = (index: ProfileIndexType) => {
    setDefaultProfileIndex(index);
  };

  return {
    imageFile,
    defaultProfileIndex,
    handlers: {
      onChangeImageFile,
      onChangeDefaultProfileIndex,
    },
  };
}
