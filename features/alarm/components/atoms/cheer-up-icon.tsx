import { ClapIcon } from '@/components/atoms';
import { flex } from '@/styled-system/patterns';

export function CheerUpIcon() {
  return (
    <div className={layoutStyles}>
      <ClapIcon />
    </div>
  );
}

const layoutStyles = flex({
  justifyContent: 'center',
  alignItems: 'center',
  width: '40px',
  height: '40px',
  borderRadius: 'full',
  backgroundColor: '#88D4B0',
  flexShrink: 0,
});
