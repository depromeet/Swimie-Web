import { titleStyles } from '@/app/delete-account/page';
import { Button } from '@/components/atoms';
import { TextArea } from '@/components/molecules';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

export default function Step2() {
  return (
    <div>
      <div className={titleStyles}>
        더 나은 스위미가 될 수 있도록 의견을 들려주세요.
      </div>
      <div className={textAreaContainerStyles}>
        <TextArea placeholder="어떤 점이 가장 불편했나요?" />
        <Button
          label="보내기"
          buttonType="primary"
          variant="solid"
          className={css({ width: '100%' })}
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
