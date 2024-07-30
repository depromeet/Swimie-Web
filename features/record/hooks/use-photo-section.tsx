'use client';

import { useState } from 'react';

export default function usePhotoSection() {
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const onSelectImage = (file: File) => {
    setImageFiles((prev) => ({
      ...prev,
      imageFiles: [...prev, file],
    }));
  };

  return {
    imageFiles,
    handlers: {
      onSelectImage,
    },
  };
}
