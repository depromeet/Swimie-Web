import { useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/atoms';
import { TextArea } from '@/components/molecules';
import { textAtom } from '@/store';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

export function Step2() {
  const router = useRouter();
  const [text, setText] = useState('');
  const setTextAtom = useSetAtom(textAtom);

  const handleTextChange = (newText: string) => {
    setText(newText);
  };

  const handleGoToStep3 = () => {
    setTextAtom(text);
    router.push('/delete-account?step=3');
  };

  return (
    <div>
      <div className={titleStyles}>
        더 나은 스위미가 될 수 있도록 의견을 들려주세요.
      </div>
      <div className={textAreaContainerStyles}>
        <TextArea
          placeholder="어떤 점이 가장 불편했나요?"
          value={text}
          onChange={handleTextChange}
        />
        <Button
          label="보내기"
          buttonType="primary"
          variant="solid"
          className={css({ width: '100%' })}
          onClick={handleGoToStep3}
        />
      </div>
    </div>
  );
}

const textAreaContainerStyles = flex({
  width: 'full',
  padding: '8px 20px',
  direction: 'column',
  alignItems: 'flex-start',
  gap: '16px',
});

const titleStyles = flex({
  padding: '20px 8px 20px 16px',
  direction: 'column',
  alignItems: 'flex-start',
  alignSelf: 'stretch',
  textStyle: 'heading2',
  fontWeight: '600',
  color: 'text.strong',
});
