import { Image } from '@/components/atoms';
import {
  defaultProfileIcons,
  hatColors,
} from '@/public/images/default-profile';
import { css, cva } from '@/styled-system/css';

interface DefaultProfileProps {
  hatColor: hatColors;
}

export function DefaultProfile({ hatColor }: DefaultProfileProps) {
  return (
    <div className={css(layoutStyles.raw({ hatColor }))}>
      <Image
        src={defaultProfileIcons[hatColor]}
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
    hatColor: {
      파랑: { backgroundColor: '#F3DD6E' },
      주황: { backgroundColor: '#88D4B0' },
      초록: { backgroundColor: '#EC6344' },
      노랑: { backgroundColor: '#3B87F4' },
    },
  },
});
