import { Button, Image } from '@/components/atoms';
import { BottomSheet } from '@/components/molecules';
import { defaultProfileIcons } from '@/public/images/default-profile';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

import { OpenAlbumButton } from '../atoms';
import { DefaultProfile } from '../atoms/default-profile';

interface ProfileImageBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileImageBottomSheet({
  isOpen,
  onClose,
}: ProfileImageBottomSheetProps) {
  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      header={{ title: '프로필 이미지' }}
    >
      <div className={layoutStyles.selectedImage}>
        <div className={selectedImageStyles}>
          <Image
            src={defaultProfileIcons['파랑']}
            alt="선택 프로필"
            width={76}
            height={64}
          />
        </div>
      </div>
      <div className={layoutStyles.selectImage}>
        {(
          Object.keys(defaultProfileIcons) as Array<
            keyof typeof defaultProfileIcons
          >
        ).map((iconColor) => (
          <DefaultProfile key={iconColor} iconColor={iconColor} />
        ))}
        <OpenAlbumButton />
      </div>
      <div className={layoutStyles.button}>
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
  button: css({
    w: 'full',
    marginTop: '16px',
    padding: '0 20px',
  }),
};

const selectedImageStyles = flex({
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 'full',
  width: '100px',
  height: '100px',
  background: '#F3DD6E',
});
