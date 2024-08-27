import Link from 'next/link';

import { SpeechBubbleIcon } from '@/components/atoms';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

export const EmptyNews = () => {
  return (
    <div className={containerStyles}>
      <SpeechBubbleIcon />
      <div className={descriptionStyles}>
        <p className={titleStyles}>아직 친구 소식이 없어요</p>
        <p className={subTitleStyles}>
          친구를 만들고 서로의 기록에 응원을 남겨보세요
        </p>
      </div>
      {/* TODO: 친구 찾기 페이지로 이동 */}
      <Link href="/" className={linkStyles}>
        친구 찾기
      </Link>
    </div>
  );
};

const containerStyles = flex({
  w: 'full',
  h: 'full',
  direction: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '20px',
});

const descriptionStyles = css({ textAlign: 'center' });

const titleStyles = css({
  pb: '4px',
  textStyle: 'heading6',
  fontWeight: 'medium',
});

const subTitleStyles = css({
  textStyle: 'body2.normal',
  fontWeight: 'normal',
  color: 'text.alternative',
});

const linkStyles = css({
  p: '9px 20px',
  borderWidth: '2px',
  borderRadius: '8px',
  color: 'primary.swim.총거리.default',
  textStyle: 'body2.normal',
  fontWeight: 'semibold',
});
