import Resizer from 'react-image-file-resizer';

export const resizeFile = (
  file: File,
  maxWidth: number,
  maxHeight: number,
  quality: number,
): Promise<File> =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      maxWidth,
      maxHeight,
      'WEBP',
      quality,
      0,
      (uri: string | File | Blob | ProgressEvent<FileReader>) => {
        resolve(uri as File);
      },
      'file',
    );
  });
