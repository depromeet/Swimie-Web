import { KeyboardEvent } from 'react';

export const preventMinus = (event: KeyboardEvent<HTMLInputElement>) => {
  if (event.key === '-') {
    event.preventDefault();
  }
};
