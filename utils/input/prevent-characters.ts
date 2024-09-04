import { KeyboardEvent } from 'react';

export const preventCharacters = (
  event: KeyboardEvent<HTMLInputElement>,
  blockedChars: string[],
) => {
  if (blockedChars.includes(event.key)) {
    event.preventDefault();
  }
};
