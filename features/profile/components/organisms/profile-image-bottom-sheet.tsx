'use client';

import { ChangeEvent, useRef, useState } from 'react';

import { Button, Image } from '@/components/atoms';
import { BottomSheet } from '@/components/molecules';
import { defaultProfileIcons } from '@/public/images/default-profile';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';
import { resizeFile } from '@/utils';

import { OpenAlbumButton } from '../atoms';
import { DefaultProfile } from '../atoms/default-profile';

interface ProfileImageBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onChangeFile: (file: File) => void;
  onChangeImage: (image: string) => void;
}

export function ProfileImageBottomSheet({
  isOpen,
  onClose,
  onChangeFile,
  onChangeImage,
}: ProfileImageBottomSheetProps) {
  const [image, setImage] = useState<string>();
  const [file, setFile] = useState<File>();

  const fileInput = useRef<HTMLInputElement>(null);

  const handleProfileImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const uploadImage = async () => {
      try {
        if (e.target.files) {
          const targetFile = e.target.files[0];
          if (targetFile) setImage('');
          const resizedImage = await resizeFile(targetFile, 200, 200, 100);
          const reader = new FileReader();
          reader.onload = () => {
            if (reader.readyState === FileReader.DONE) {
              if (reader.result !== image) {
                setImage(reader.result as string);
                setFile(resizedImage);
              }
            }
          };
          reader.readAsDataURL(resizedImage);
        }
      } catch (error) {
        console.error('이미지 업로드 중 오류가 발생하였습니다', error);
      }
    };
    uploadImage().catch((error) =>
      console.error('이미지 업로드 중 오류가 발생하였습니다', error),
    );
  };

  const handleAddImageClick = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  const handleSelectButtonClick = () => {
    if (image && file) {
      onChangeImage(image);
      onChangeFile(file);
    }
    onClose();
  };
  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      header={{ title: '프로필 이미지' }}
    >
      <div className={layoutStyles.selectedImage}>
        {image ? (
          <div className={layoutStyles.image}>
            <Image
              src={image}
              alt="선택 프로필"
              fill
              sizes="40vw"
              className={css({ borderRadius: 'full', objectFit: 'cover' })}
            />
          </div>
        ) : (
          <DefaultProfile iconColor="파랑" />
        )}
      </div>
      <div className={layoutStyles.selectImage}>
        {(
          Object.keys(defaultProfileIcons) as Array<
            keyof typeof defaultProfileIcons
          >
        ).map((iconColor) => (
          <DefaultProfile key={iconColor} iconColor={iconColor} />
        ))}
        <OpenAlbumButton onClick={handleAddImageClick} />
        <input
          ref={fileInput}
          type="file"
          accept="image/*"
          className={css({ display: 'none' })}
          onChange={handleProfileImageUpload}
        />
      </div>
      <div className={layoutStyles.button} onClick={handleSelectButtonClick}>
        <Button
          buttonType="primary"
          variant="solid"
          label="선택하기"
          size="large"
          type="submit"
          className={css({ w: 'full' })}
        />
      </div>
    </BottomSheet>
  );
}

const layoutStyles = {
  selectedImage: flex({
    height: '116px',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '16px',
    marginBottom: '24px',
  }),
  selectImage: flex({
    padding: '0 20px',
    justifyContent: 'space-between',
    gap: '8px',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: '16px',
  }),
  image: css({
    position: 'relative',
    width: '100px',
    height: '100px',
  }),
  button: css({
    w: 'full',
    marginTop: '16px',
    padding: '0 20px',
  }),
};
