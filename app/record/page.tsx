import { HeaderBar } from '@/components/atoms';
import { RecordForm } from '@/features';
import { css } from '@/styled-system/css';

export default function RecordPage() {
  return (
    <div>
      <HeaderBar addStyles={css.raw({ marginBottom: '24px' })}>
        <div className={css(titleWrapperStyles)}>
          <h1>수영 기록하기</h1>
        </div>
      </HeaderBar>
      <h1 className={css({ padding: '0px 20px', marginBottom: '23px' })}>
        기본정보
      </h1>
      <RecordForm addStyles={css.raw({ padding: '0px 20px' })} />
    </div>
  );
}

const titleWrapperStyles = css.raw({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
