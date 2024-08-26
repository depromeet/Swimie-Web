import { Image } from '@/components/atoms';
import {
  defaultProfileImages,
  ProfileIndexType,
} from '@/public/images/default-profile';
import { css, cva, cx } from '@/styled-system/css';

interface DefaultProfileProps {
  size?: 'big' | 'small';
  profileIndex: ProfileIndexType;
  onChangeDefaultProfileIndex?: (index: ProfileIndexType) => void;
}

export function DefaultProfile({
  size = 'small',
  profileIndex,
  onChangeDefaultProfileIndex,
}: DefaultProfileProps) {
  const handleDefaultProfileClick = () => {
    onChangeDefaultProfileIndex?.(profileIndex);
  };
  return (
    <div
      className={cx(
        css(layoutStyles.raw({ profileIndex })),
        css(layoutStyles.raw({ size })),
      )}
      onClick={handleDefaultProfileClick}
    >
      <Image
        key={profileIndex}
        src={defaultProfileImages[profileIndex]}
        alt="디폴트 프로필"
        width={size === 'big' ? 76 : 45.6}
        height={size === 'big' ? 64 : 38.4}
      />
    </div>
  );
}

const layoutStyles = cva({
  base: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 'full',
  },
  variants: {
    profileIndex: {
      0: { backgroundColor: '#F3DD6E' },
      1: { backgroundColor: '#88D4B0' },
      2: { backgroundColor: '#EC6344' },
      3: { backgroundColor: '#3B87F4' },
    },
    size: {
      big: { width: '100px', height: '100px' },
      small: { width: '60px', height: '60px' },
    },
  },
});
