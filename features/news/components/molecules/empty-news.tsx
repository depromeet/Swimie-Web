import { Button, SpeechBubbleIcon } from '@/components/atoms';
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
      <Button label="친구 찾기" buttonType="primary" variant="outlined" />
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

const titleStyles = css({ textStyle: 'heading6', fontWeight: 'medium' });

const subTitleStyles = css({
  textStyle: 'body2.normal',
  fontWeight: 'normal',
  color: 'text.alternative',
});
