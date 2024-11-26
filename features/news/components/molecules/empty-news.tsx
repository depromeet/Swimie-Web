import Link from 'next/link';

import { SpeechBubbleIcon } from '@/components/atoms';
import { Divider } from '@/components/atoms/divider';
import { RecommendedProfileCardList } from '@/features/profile-recommend';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

export const EmptyNews = () => {
  return (
    <>
      <h1 className={titleStyles}>친구 소식</h1>
      <div className={containerStyles}>
        <SpeechBubbleIcon />
        <div className={descriptionStyles}>
          <p className={mainTextStyles}>친구 기록에 응원을 남겨보세요</p>
          <p className={subTextStyles}>
            함께 꾸준히 수영 기록을 쌓아가는 즐거움을 느껴보세요!
          </p>
        </div>
        <Link href="/profile/search" className={linkStyles}>
          + 친구 찾기
        </Link>
      </div>
      <Divider variant="thick" />
      <RecommendedProfileCardList
        title="다른 수영인과 응원을 주고 받아보세요"
        variant="vertical"
      />
    </>
  );
};

const containerStyles = flex({
  w: 'full',
  direction: 'column',
  alignItems: 'center',
  gap: '20px',
  p: '24px 20px',
});

const descriptionStyles = css({ textAlign: 'center' });

const titleStyles = css({
  p: '16px 20px',
  textStyle: 'heading2',
  fontWeight: 700,
});

const mainTextStyles = css({
  pb: '4px',
  textStyle: 'heading6',
  fontWeight: 'medium',
});

const subTextStyles = css({
  textStyle: 'body2.normal',
  fontWeight: 'normal',
  color: 'text.alternative',
});

const linkStyles = flex({
  w: 'full',
  justifyContent: 'center',
  p: '9px 0',
  borderRadius: '8px',
  backgroundColor: 'primary.swim.총거리.default',
  color: 'white',
  textStyle: 'body2.normal',
  fontWeight: 600,
});
