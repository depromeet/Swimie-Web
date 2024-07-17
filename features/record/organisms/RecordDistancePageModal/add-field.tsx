import { css } from '@/styled-system/css';

import { AddButton } from '../../atoms';
import { AddFieldProps } from './type';

export function AddField({ text }: AddFieldProps) {
  return (
    <div className={css(addFieldStyles)}>
      <AddButton />
      <span className={css(textStyles)}>{text}</span>
    </div>
  );
}

const addFieldStyles = css.raw({
  display: 'flex',
  alignItems: 'center',
});

const textStyles = css.raw({
  marginLeft: '11px',
});
