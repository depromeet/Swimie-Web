'use client';

import { DefaultImageIcon } from '@/components/atoms';
import { ProfileImage } from '@/components/molecules';
import { useBottomSheet } from '@/hooks';
import { ProfileIndexType } from '@/public/images/default-profile';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

import { ProfileEditImageSectionProps } from '../../types';
import { DefaultProfile } from '../atoms';
import { ProfileImageBottomSheet } from './profile-image-bottom-sheet';

/**
 * 주어진 날짜 문자열을 형식화하여 반환합니다.
 *
 * @param image 사용자가 선택한 디폴트 프로필 or 사진
 * @param currentProfileImage api로 불러온 이전 디폴트 프로필 or 사진
 * @param onChangeFile 사용자가 선택한 사진 File을 관리하는 함수
 * @param onChangeImage 사용자가 선택한 사진 Image or 디폴트 프로필 index를 관리하는 함수
 */
export function ProfileEditImageSection({
  image,
  currentProfileImage,
  onChangeFile,
  onChangeImage,
}: ProfileEditImageSectionProps) {
  const { isOpen, open, close } = useBottomSheet();
  return (
    <>
      <section className={layoutStyles.imageEdit}>
        <div className={layoutStyles.imageEditIcon}>
          {!image && (
            <ProfileImage
              src={currentProfileImage ? currentProfileImage : '1'}
              alt="프로필 이미지"
              fill
              sizes="40vw"
              className={css({ borderRadius: 'full', objectFit: 'cover' })}
            />
          )}
          {image && isNaN(parseInt(image)) && (
            <ProfileImage
              src={image}
              alt="프로필 이미지"
              fill
              sizes="40vw"
              className={css({ borderRadius: 'full', objectFit: 'cover' })}
            />
          )}
          {image && !isNaN(parseInt(image)) && (
            <DefaultProfile
              size="big"
              defaultprofileIndex={Number(image) as ProfileIndexType}
            />
          )}
          <div className={layoutStyles.defaultImageIcon}>
            <DefaultImageIcon onClick={open} />
          </div>
        </div>
      </section>
      <ProfileImageBottomSheet
        isOpen={isOpen}
        onClose={close}
        currentProfileImage={currentProfileImage}
        onChangeFile={onChangeFile}
        onChangeImage={onChangeImage}
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
    width: '100px',
    height: '100px',
    marginBottom: '14px',
  }),
  defaultImageIcon: flex({
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: '-8px',
    right: '-8px',
    borderRadius: 'full',
    width: '32px',
    height: '32px',
    backgroundColor: 'background.white',
    border: '1px solid',
    borderColor: 'line.solid.normal',
  }),
};
