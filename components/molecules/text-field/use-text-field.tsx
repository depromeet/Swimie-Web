import { useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

/**
 * @description text-field 컴포넌트의 세부적인 데이터 관리 용도의 custom-hook
 */
export function useTextField(value?: string, registerName?: string) {
  const { control } = useFormContext();
  const registeredFieldValue = useWatch({
    control,
    name: registerName as string,
  }) as string | number;

  const [focused, setFocused] = useState(false);
  const isWritten =
    (value && value.trim().length > 0) ||
    (registerName && registeredFieldValue ? true : false);

  const onChangeFocus = (focus: boolean) => {
    setFocused(focus);
  };

  return {
    registeredFieldValue,
    focused,
    isWritten,
    handlers: {
      onChangeFocus,
    },
  };
}
