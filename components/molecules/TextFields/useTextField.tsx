import { useEffect, useState } from 'react';

/**
 * text-field 컴포넌트 관리 용도의 custom-hook.
 * @param value 초기 값
 * @returns input의 text값, focus 여부, input에 값이 있는지 여부, text와 focus를 관리하는 handlers
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
