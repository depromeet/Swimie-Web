import { css } from '@/styled-system/css';

import { AddButton } from '../../atoms';
import { AddFieldProps } from './type';

export function AddField({ text }: AddFieldProps) {
  return (
    <div className={addFieldStyles}>
      <AddButton />
      <span className={textStyles}>{text}</span>
    </div>
  );
}

const addFieldStyles = css({
  display: 'flex',
  alignItems: 'center',
});

const textStyles = css({
  marginLeft: '11px',
});
