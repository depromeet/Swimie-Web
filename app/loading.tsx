import { LoadingArea } from '@/components/atoms';
import { flex } from '@/styled-system/patterns';

export default function Loading() {
  return (
    <div className={containerStyle}>
      <LoadingArea width={25} height={25} />
    </div>
  );
}

const containerStyle = flex({
  height: '100dvh',
  align: 'center',
});
