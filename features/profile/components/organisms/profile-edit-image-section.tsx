'use client';

import { useState } from 'react';

import { DefaultImageIcon, Image } from '@/components/atoms';
import { UserImageIcon } from '@/components/atoms/icons/user-image-icon';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

import { ProfileImageBottomSheet } from './profile-image-bottom-sheet';

interface ProfileEditImageSectionProps {
  onChangeFile: (file: File) => void;
}

export function ProfileEditImageSection({
  onChangeFile,
}: ProfileEditImageSectionProps) {
  const [image, setImage] = useState<string>();
  const [isProfileBottomSheetOpened, setIsProfileBottomSheetOpened] =
    useState(false);

  const handleOpenProfileBottomSheet = () => {
    setIsProfileBottomSheetOpened(true);
  };

  const handleCloseProfileBottomSheet = () => {
    setIsProfileBottomSheetOpened(false);
  };

  const handleChangeImage = (image: string) => {
    setImage(image);
  };

  return (
    <>
      <section className={layoutStyles.imageEdit}>
        <div className={layoutStyles.imageEditIcon}>
          {image ? (
            <Image
              src={image}
              alt="프로필 사진"
              fill
              sizes="40vw"
              className={css({ borderRadius: 'full' })}
            />
          ) : (
            <UserImageIcon width={100} height={100} />
          )}
          <div className={layoutStyles.defaultImageIcon}>
            <DefaultImageIcon onClick={handleOpenProfileBottomSheet} />
          </div>
        </div>
      </section>
      <ProfileImageBottomSheet
        isOpen={isProfileBottomSheetOpened}
        onClose={handleCloseProfileBottomSheet}
        onChangeFile={onChangeFile}
        onChangeImage={handleChangeImage}
      />
    </>
  );
}

const layoutStyles = {
  form: css({
    padding: '0 20px',
  }),
  imageEdit: flex({
    justifyContent: 'center',
    padding: '40px 0 0 0',
    marginBottom: '24px',
  }),
  imageEditIcon: flex({
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    width: '120px',
    height: '120px',
    marginBottom: '14px',
  }),
  defaultImageIcon: flex({
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: '6px',
    right: '6px',
    borderRadius: 'full',
    width: '32px',
    height: '32px',
    backgroundColor: 'background.white',
    border: '1px solid',
    borderColor: 'line.solid.normal',
  }),
};
