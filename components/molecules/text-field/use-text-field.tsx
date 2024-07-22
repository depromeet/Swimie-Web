import { useEffect, useState } from 'react';

/**
 * @description text-field 컴포넌트의 세부적인 데이터 관리 용도의 custom-hook
 */
export function UseTextField(value?: string) {
  const [text, setText] = useState('');
  const [focused, setFocused] = useState(false);
  const isWritten = text.trim().length > 0;

  const changeText = (text: string) => {
    setText(text);
  };

  const changeFocus = (focus: boolean) => {
    setFocused(focus);
  };

  //variant==='text' 이고 값이 있으면 border가 blue.60으로 되어있도록
  useEffect(() => {
    if (value) setText(value);
  }, [value]);

  return {
    text,
    focused,
    isWritten,
    handlers: {
      changeText,
      changeFocus,
    },
  };
}
