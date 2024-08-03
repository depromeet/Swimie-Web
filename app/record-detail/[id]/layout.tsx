import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

import { EditButton } from '@/features/record-detail/components';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

const DynamicHeaderBar = dynamic(
  () => import('@/components/molecules').then(({ HeaderBar }) => HeaderBar),
  { ssr: false },
);

type DetailLayout = {
  children: ReactNode;
  params: { id: string };
};
const DetailLayout = ({ children, params }: DetailLayout) => {
  return (
    <div>
      <DynamicHeaderBar rightContent={<EditButton memoryId={params.id} />}>
        <div className={header.textStyle}>지영의 수영 기록</div>
      </DynamicHeaderBar>
      <div className={childrenWrapperStyle}>{children}</div>
    </div>
  );
};

export default DetailLayout;

const childrenWrapperStyle = css({
  backgroundColor: 'background.gray',
});

const header = {
  textStyle: flex({
    w: 'full',
    justify: 'center',
    align: 'center',
    color: 'text.normal',
    textStyle: 'heading6',
    fontWeight: 'medium',
  }),

  editButtonStyle: css({
    color: 'primary.swim.총거리.default',
    textStyle: 'body2.normal',
    fontWeight: 'medium',
    mr: '8px',
  }),
};
