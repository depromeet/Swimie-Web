import { HeaderBar } from '@/components/atoms';
import { RecordForm } from '@/features';
import { css } from '@/styled-system/css';

export default function RecordPage() {
  return (
    <main>
      <HeaderBar styles={css.raw({ padding: '8px 0px', marginBottom: '24px' })}>
        <h1>수영 기록하기</h1>
      </HeaderBar>
      <h1 className={css({ padding: '0px 20px', marginBottom: '23px' })}>
        기본정보
      </h1>
      <RecordForm styles={css.raw({ padding: '0px 20px' })} />
    </main>
  );
}
