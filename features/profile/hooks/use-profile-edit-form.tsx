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

  const modifyData = (data: { nickname?: string; introduction?: string }) => {
    const filteredData = Object.entries(data)
      .filter(([, value]) => value !== '')
      .reduce(
        (acc, [key, value]) => {
          return { ...acc, [key]: value };
        },
        {} as Partial<{ nickname?: string; introduction?: string }>,
      );

    return filteredData;
  };

  return {
    isLoading,
    imageFile,
    defaultProfileIndex,
    modifyData,
    handlers: {
      onChangeIsLoading,
      onChangeImageFile,
      onChangeDefaultProfileIndex,
    },
  };
}
