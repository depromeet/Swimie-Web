import { SmallSwimIcon } from '@/components/atoms';
import { css } from '@/styled-system/css';

export function SwimBadge() {
  return (
    <div className={swimBadgeStyles}>
      <SmallSwimIcon />
    </div>
  );
}

const swimBadgeStyles = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  backgroundColor: '#E7E7E7',
});
