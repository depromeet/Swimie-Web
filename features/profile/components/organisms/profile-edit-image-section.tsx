'use client';

import { ChangeEvent, useRef, useState } from 'react';

import { DefaultImageIcon, Image } from '@/components/atoms';
import { UserImageIcon } from '@/components/atoms/icons/user-image-icon';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';
import { resizeFile } from '@/utils';

export function ProfileEditImageSection() {
  const [image, setImage] = useState<string>();
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

  return (
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
          <DefaultImageIcon onClick={handleAddImageClick} />
        </div>
      </div>
      <input
        ref={fileInput}
        type="file"
        accept="image/*"
        className={css({ display: 'none' })}
        onChange={handleProfileImageUpload}
      />
    </section>
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
