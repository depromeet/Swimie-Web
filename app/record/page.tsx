import { HeaderBar } from '@/components/molecules';
import { RecordForm } from '@/features';
import { css } from '@/styled-system/css';

export default function RecordPage() {
  return (
    <div>
      <HeaderBar className={css({ marginBottom: '24px' })}>
        <h1 className={titleWrapperStyles}>수영 기록하기</h1>
      </HeaderBar>
      <h1
        className={css({
          padding: '0px 20px',
          textStyle: 'heading4',
          fontWeight: '600',
        })}
      >
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
  width: '100%',
  textStyle: 'heading6',
  fontWeight: 500,
});
