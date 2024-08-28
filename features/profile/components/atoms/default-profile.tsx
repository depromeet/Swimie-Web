import { ProfileImage } from '@/components/molecules';
import { ProfileIndexType } from '@/public/images/default-profile';
import { css, cva } from '@/styled-system/css';

interface DefaultProfileProps {
  size?: 'big' | 'small';
  defaultprofileIndex: ProfileIndexType;
  onChangeImage?: (index: string) => void;
  resetFile?: () => void;
}

export function DefaultProfile({
  size = 'small',
  defaultprofileIndex,
  onChangeImage,
  resetFile,
}: DefaultProfileProps) {
  const handleDefaultProfileClick = () => {
    resetFile?.();
    onChangeImage?.(String(defaultprofileIndex));
  };

  return (
    <div
      className={css(layoutStyles.raw({ size }))}
      onClick={handleDefaultProfileClick}
    >
      <ProfileImage
        key={defaultprofileIndex}
        src={String(defaultprofileIndex)}
        alt="디폴트 프로필"
        fill
        sizes="20vw"
      />
    </div>
  );
}

const layoutStyles = cva({
  base: {
    position: 'relative',
    borderRadius: 'full',
  },
  variants: {
    size: {
      big: { width: '100px', height: '100px' },
      small: { width: '60px', height: '60px' },
    },
  },
});
