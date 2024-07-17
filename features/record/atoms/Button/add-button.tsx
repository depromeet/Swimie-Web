import { PlusIcon } from '@/components/atoms';
import { css } from '@/styled-system/css';

export function AddButton() {
  return (
    <button className={css(buttonStyles)}>
      <PlusIcon />
    </button>
  );
}

const buttonStyles = css.raw({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '40px',
  height: '40px',
  backgroundColor: '#E7E7E7',
  borderRadius: '50%',
});
