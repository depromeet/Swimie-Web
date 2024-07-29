import { SwimIcon } from '@/components/atoms';
import { css } from '@/styled-system/css';

export function SwimBadge() {
  return (
    <div className={swimBadgeStyles}>
      <SwimIcon width={24} height={24} />
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
