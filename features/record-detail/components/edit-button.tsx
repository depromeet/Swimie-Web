import Link from 'next/link';

import { css } from '@/styled-system/css';

export const EditButton = ({ memoryId }: { memoryId: string }) => {
  return (
    <Link
      href={`/record?memoryId=${memoryId}`}
      replace
      className={editButtonStyle}
    >
      수정
    </Link>
  );
};

const editButtonStyle = css({
  color: 'primary.swim.총거리.default',
  textStyle: 'body2.normal',
  fontWeight: 'medium',
  mr: '8px',
});
