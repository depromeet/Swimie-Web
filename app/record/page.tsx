import dynamic from 'next/dynamic';
import { cookies } from 'next/headers';
import { Suspense } from 'react';

import { LeftArrowIcon } from '@/components/atoms';
import { HeaderBar } from '@/components/molecules';
import { Form } from '@/features/record';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';
const DynamicBackButton = dynamic(
  () => import('@/components/molecules').then(({ BackButton }) => BackButton),
  {
    ssr: false,
    loading: () => <LeftArrowIcon />,
  },
);

export default function RecordPage() {
  const prevSwimStartTime = cookies().get('swimStartTime')?.value;
  const prevSwimEndTime = cookies().get('swimEndTime')?.value;
  return (
    <div>
      <HeaderBar className={css({ marginBottom: '24px' })}>
        <HeaderBar.LeftContent>
          <DynamicBackButton />
        </HeaderBar.LeftContent>
        <HeaderBar.Title>수영 기록하기</HeaderBar.Title>
      </HeaderBar>
      {/* Title 컴포넌트 생성 시 대체 */}
      <h1 className={titleStyles.form}>기본정보</h1>
      <Suspense>
        <Form
          prevSwimStartTime={prevSwimStartTime}
          prevSwimEndTime={prevSwimEndTime}
        />
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
