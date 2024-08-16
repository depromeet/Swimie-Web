'use client';

import { useState } from 'react';

/**
 * @description text-field 컴포넌트의 세부적인 데이터 관리 용도의 custom-hook
 */
export function useTextField(value?: string) {
  const [focused, setFocused] = useState(false);
  const isWritten = value && value.trim().length > 0;

  const onChangeFocus = (focus: boolean) => {
    setFocused(focus);
  };

  return {
    focused,
    isWritten,
    handlers: {
      onChangeFocus,
    },
  };
}
