import { flex } from '@/styled-system/patterns';

export default function Profile() {
  return (
    <article className={containerStyle}>
      <p>본인의 profile 입니다.</p>
    </article>
  );
}

const containerStyle = flex({
  direction: 'column',
  gap: '12px',
});
