'use client';

import { useRef, useState } from 'react';

export function useProfileImageBottomSheet() {
  const [image, setImage] = useState<string>();
  const [file, setFile] = useState<File>();

  const fileInput = useRef<HTMLInputElement>(null);

  const isProfileImageSet = Boolean(image && file);

  const onChangeImage = (image: string) => {
    setImage(image);
  };

  const onChangeFile = (file: File) => {
    setFile(file);
  };

  const resetImageInfo = () => {
    setImage(undefined);
    setFile(undefined);
  };

  return {
    image,
    file,
    isProfileImageSet,
    fileInput,
    resetImageInfo,
    handlers: {
      onChangeImage,
      onChangeFile,
    },
  };
}
