'use client';

import Image from 'next/image';
import { ChangeEvent, useRef, useState } from 'react';
import Resizer from 'react-image-file-resizer';

import { CameraBox } from '@/components/molecules';
import { css } from '@/styled-system/css';

interface RecordPhotoProps {
  title: string;
  onSelectImage: (url: File) => void;
}

export function RecordPhoto({ title, onSelectImage }: RecordPhotoProps) {
  const [image, setImage] = useState<string[]>([]);
  const fileInput = useRef<HTMLInputElement>(null);

  const resizeFile = (file: File): Promise<File> =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        400,
        400,
        'WEBP',
        92,
        0,
        (uri: string | File | Blob | ProgressEvent<FileReader>) => {
          resolve(uri as File);
        },
        'file',
      );
    });

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const resizedImage = await resizeFile(e.target.files[0]);
      onSelectImage(resizedImage);
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          if (image.length === 1) {
            return;
          } else {
            setImage((prev: string[]) => {
              return [...prev, reader.result as string];
            });
          }
        }
      };
      reader.readAsDataURL(resizedImage);
    }
  };

  const handleAddImageClick = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  return (
    <section className={recordPhotoStyles}>
      <h1 className={titleStyles}>{title}</h1>
      {image.length > 0 ? (
        <div className={imageStyles}>
          <Image
            src={image[0]}
            alt="오늘의 사진"
            fill
            sizes="100vw"
            className="rounded-[10px]"
          />
        </div>
      ) : (
        <CameraBox onClick={handleAddImageClick} />
      )}

      <input
        ref={fileInput}
        type="file"
        accept="image/*"
        className={css({ display: 'none' })}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onChange={handleImageUpload}
      />
    </section>
  );
}

const recordPhotoStyles = css({
  padding: '24px 20px 40px 20px',
});

const imageStyles = css({
  position: 'relative',
  height: '126px',
});

const titleStyles = css({
  textStyle: 'heading4',
  fontWeight: '600',
  marginBottom: '24px',
});
