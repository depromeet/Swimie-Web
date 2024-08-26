import { Image } from '@/components/atoms';
import {
  defaultProfileIcons,
  iconColors,
} from '@/public/images/default-profile';
import { css, cva, cx } from '@/styled-system/css';

interface DefaultProfileProps {
  size?: 'big' | 'small';
  iconColor: iconColors;
}

export function DefaultProfile({
  size = 'small',
  iconColor,
}: DefaultProfileProps) {
  return (
    <div
      className={cx(
        css(layoutStyles.raw({ iconColor })),
        css(layoutStyles.raw({ size })),
      )}
    >
      <Image
        src={defaultProfileIcons[iconColor]}
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
    iconColor: {
      파랑: { backgroundColor: '#F3DD6E' },
      주황: { backgroundColor: '#88D4B0' },
      초록: { backgroundColor: '#EC6344' },
      노랑: { backgroundColor: '#3B87F4' },
    },
    size: {
      big: { width: '100px', height: '100px' },
      small: { width: '60px', height: '60px' },
    },
  },
});
