import { PlusIcon } from '@/components/atoms';
import { css } from '@/styled-system/css';

export function AddButton() {
  return (
    <button className={buttonStyles}>
      <PlusIcon />
    </button>
  );
}

const buttonStyles = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '40px',
  height: '40px',
  backgroundColor: '#E7E7E7',
  borderRadius: '50%',
});
