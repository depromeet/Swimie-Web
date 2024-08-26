import { Image } from '@/components/atoms';
import {
  defaultProfileImages,
  ProfileIndexType,
} from '@/public/images/default-profile';
import { css, cva } from '@/styled-system/css';

interface DefaultProfileProps {
  profileIndex: ProfileIndexType;
}

export function DefaultProfile({ profileIndex }: DefaultProfileProps) {
  return (
    <div className={css(layoutStyles.raw({ profileIndex }))}>
      <Image
        src={defaultProfileImages[profileIndex]}
        alt="디폴트 프로필"
        width={45.6}
        height={38.4}
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
    width: '60px',
    height: '60px',
    borderRadius: 'full',
  },
  variants: {
    profileIndex: {
      0: { backgroundColor: '#F3DD6E' },
      1: { backgroundColor: '#88D4B0' },
      2: { backgroundColor: '#EC6344' },
      3: { backgroundColor: '#3B87F4' },
    },
  },
});
