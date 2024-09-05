import Link from 'next/link';

import { NotFoundIcon } from '@/components/atoms/icons/not-found-icon';
import { GlobalNavigationBar } from '@/components/molecules';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

export default function NotFound() {
  return (
    <>
      <section className={containerStyles}>
        <NotFoundIcon />
        <div className={descriptionStyles}>
          <p className={textStyles.title}>페이지를 찾지 못했어요</p>
          <p className={textStyles.subtitle}>
            페이지 주소가 정확한지 확인해주세요
          </p>
        </div>
        <Link href="/" className={linkStyles}>
          홈으로 가기
        </Link>
      </section>

      <GlobalNavigationBar />
    </>
  );
}

const containerStyles = flex({
  width: '100%',
  height: 'calc(100dvh - 66px)',
  direction: 'column',
  gap: '20px',
  justifyContent: 'center',
  alignItems: 'center',
});

const descriptionStyles = flex({
  direction: 'column',
  gap: '4px',
  alignItems: 'center',
});

const textStyles = {
  title: css({ textStyle: 'heading6', fontWeight: 'medium' }),
  subtitle: css({
    textStyle: 'body2.normal',
    fontWeight: 'regular',
    color: 'text.alternative',
  }),
};

const linkStyles = css({
  padding: '9px 20px',
  color: 'white',
  backgroundColor: 'primary.swim.자유형.default',
  rounded: '8px',
});
