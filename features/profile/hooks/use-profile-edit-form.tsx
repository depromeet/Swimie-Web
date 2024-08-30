'use client';

import { useState } from 'react';

export function useProfileEditForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<string>();
  const [imageFile, setImageFile] = useState<File>();

  const onChangeImage = (image: string) => {
    setImage(image);
  };

  const onChangeImageFile = (file?: File) => {
    setImageFile(file);
  };

  const onChangeIsLoading = (isLoading: boolean) => {
    setIsLoading(isLoading);
  };

  return {
    isLoading,
    image,
    imageFile,
    handlers: {
      onChangeIsLoading,
      onChangeImage,
      onChangeImageFile,
    },
  };
}
