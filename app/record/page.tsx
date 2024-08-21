import { Suspense } from 'react';

import { HeaderBar } from '@/components/molecules';
import { Form } from '@/features/record';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

export default function RecordPage() {
  return (
    <div className={css({ overflow: 'auto' })}>
      <HeaderBar className={css({ marginBottom: '24px' })}>
        <HeaderBar.BackButton />
        <HeaderBar.Title>수영 기록하기</HeaderBar.Title>
      </HeaderBar>
      {/* Title 컴포넌트 생성 시 대체 */}
      <h1 className={titleStyles.form}>기본정보</h1>
      <Suspense>
        <Form />
      </Suspense>
    </div>
  );
}

const titleStyles = {
  header: flex({
    justifyContent: 'center',
    alignItems: 'center',
    w: 'full',
    textStyle: 'heading6',
    fontWeight: 500,
  }),

  form: css({
    padding: '0px 20px',
    textStyle: 'heading4',
    fontWeight: '600',
  }),
};
