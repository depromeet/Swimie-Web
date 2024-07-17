import { SwimIcon } from '@/components/atoms';
import { css } from '@/styled-system/css';

export function SwimBadge() {
  return (
    <div className={css(swimBadgeStyles)}>
      <SwimIcon />
    </div>
  );
}

const swimBadgeStyles = css.raw({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  backgroundColor: '#E7E7E7',
});
