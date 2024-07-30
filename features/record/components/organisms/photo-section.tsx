'use client';

import { ChangeEvent, useRef, useState } from 'react';
import Resizer from 'react-image-file-resizer';

import { Image } from '@/components/atoms';
import { css } from '@/styled-system/css';

import usePhotoSection from '../../hooks/use-photo-section';
import { formSectionStyles } from '../../styles/form-section';
import { FormSectionProps } from '../../types/form-section';
import { CameraBox } from '../molecules';

/**
 * @param title 사진 section의 제목
 */
export function PhotoSection({ title }: FormSectionProps) {
  const [image, setImage] = useState<string[]>([]);
  const fileInput = useRef<HTMLInputElement>(null);

  const { imageFiles, handlers } = usePhotoSection();

  console.log(imageFiles);

  const resizeFile = (file: File): Promise<File> =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        600,
        600,
        'WEBP',
        100,
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
      handlers.onSelectImage(resizedImage);
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
    <section className={formSectionStyles}>
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

const imageStyles = css({
  position: 'relative',
  width: 'calc(100vw - 40px)',
  height: 'calc(100vw - 40px)',
  maxWidth: '400px',
  maxHeight: '400px',
});

const titleStyles = css({
  textStyle: 'heading4',
  fontWeight: '600',
  marginBottom: '24px',
});
