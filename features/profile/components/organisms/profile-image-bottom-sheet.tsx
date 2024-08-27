'use client';

import { ChangeEvent, useState } from 'react';

import { Button, Image } from '@/components/atoms';
import { BottomSheet } from '@/components/molecules';
import {
  defaultProfileImages,
  ProfileIndexType,
} from '@/public/images/default-profile';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';
import { resizeFile } from '@/utils';

import { useProfileImageBottomSheet } from '../../hooks';
import { ProfileImageBottomSheetProps } from '../../types';
import { OpenAlbumButton } from '../atoms';
import { DefaultProfile } from '../atoms/default-profile';

export function ProfileImageBottomSheet({
  isOpen,
  onClose,
  onChangeFile,
  onChangeImage,
  onChangeDefaultProfileIndex,
}: ProfileImageBottomSheetProps) {
  const {
    image,
    file,
    isProfileImageSet,
    fileInput,
    resetImageInfo,
    handlers,
  } = useProfileImageBottomSheet();

  const [defaultProfileIndex, setDefaultProfileIndex] =
    useState<ProfileIndexType>(0);

  const handleProfileImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const uploadImage = async () => {
      try {
        if (e.target.files) {
          const targetFile = e.target.files[0];
          if (targetFile) handlers.onChangeImage('');
          const resizedImage = await resizeFile(targetFile, 200, 200, 100);
          const reader = new FileReader();
          reader.onload = () => {
            if (reader.readyState === FileReader.DONE) {
              if (reader.result !== image) {
                handlers.onChangeImage(reader.result as string);
                handlers.onChangeFile(resizedImage);
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

  const handleSelectDefaultProfile = (index: ProfileIndexType) => {
    setDefaultProfileIndex(index);
  };

  const handleSelectButtonClick = () => {
    onChangeImage(image);
    onChangeFile(file);
    onChangeDefaultProfileIndex(defaultProfileIndex);
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
          <DefaultProfile size="big" profileIndex={defaultProfileIndex} />
        )}
      </div>
      <div className={layoutStyles.selectImage}>
        {Object.entries(defaultProfileImages).map(([iconIndex]) => (
          <DefaultProfile
            key={iconIndex}
            profileIndex={Number(iconIndex) as ProfileIndexType}
            isProfileImageSet={isProfileImageSet}
            onChangeDefaultProfileIndex={handleSelectDefaultProfile}
            resetImageInfo={resetImageInfo}
          />
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
