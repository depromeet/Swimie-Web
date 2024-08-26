'use client';

import { useState } from 'react';

import { profileIndexType } from '@/public/images/default-profile';

export function useProfileEditForm() {
  const [imageFile, setImageFile] = useState<File>();
  const [defaultProfileIndex, setDefaultProfileIndex] =
    useState<profileIndexType>(0);

  const onChangeImageFile = (file: File) => {
    setImageFile(file);
  };

  const onChangeDefaultProfileIndex = (index: profileIndexType) => {
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
