'use client';

import { useRef, useState } from 'react';

export function useProfileImageBottomSheet() {
  const [image, setImage] = useState<string>();
  const [file, setFile] = useState<File>();

  const fileInput = useRef<HTMLInputElement>(null);

  const onChangeImage = (image: string) => {
    setImage(image);
  };

  const onChangeFile = (file: File) => {
    setFile(file);
  };

  return {
    image,
    file,
    fileInput,
    handlers: {
      onChangeImage,
      onChangeFile,
    },
  };
}
