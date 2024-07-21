import { HeaderBar } from '@/components/atoms';
import { RecordForm } from '@/features';
import { css } from '@/styled-system/css';

export default function RecordPage() {
  return (
    <div>
      <HeaderBar className={css({ marginBottom: '24px' })}>
        <div className={titleWrapperStyles}>
          <h1>수영 기록하기</h1>
        </div>
      </HeaderBar>
      <h1 className={css({ padding: '0px 20px', marginBottom: '23px' })}>
        기본정보
      </h1>
      <RecordForm />
    </div>
  );
}

const titleWrapperStyles = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
