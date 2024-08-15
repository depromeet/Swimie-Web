'use client';

import { useState } from 'react';

/**
 * @description text-field 컴포넌트의 세부적인 데이터 관리 용도의 custom-hook
 */
export function useFormTextField(registerdFieldValue?: string | number) {
  const [focused, setFocused] = useState(false);
  const isWritten = registerdFieldValue ? true : false;

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
