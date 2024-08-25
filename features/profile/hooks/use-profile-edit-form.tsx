'use client';

import { useState } from 'react';

export function useProfileEditForm() {
  const [imageFile, setImageFile] = useState<File>();

  const onChangeImageFile = (file: File) => {
    setImageFile(file);
  };

  return {
    imageFile,
    handlers: {
      onChangeImageFile,
    },
  };
}
