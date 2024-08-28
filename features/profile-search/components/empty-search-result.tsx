import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

export const EmptySearchResult = ({ keyword }: { keyword: string }) => {
  return (
    <div className={containerStyle}>
      <h1 className={titleStyle}>‘{keyword}‘ 유저가 없어요.</h1>
      <p className={descriptionStyle}>
        마이페이지에서 내 프로필을 공유할 수 있어요
      </p>
    </div>
  );
};

const containerStyle = flex({
  direction: 'column',
  gap: '4px',
  m: '80px auto 0px',
  align: 'center',
});

const titleStyle = css({
  textStyle: 'heading6',
  fontWeight: 'medium',
  color: 'text.normal',
});

const descriptionStyle = css({
  color: 'text.alternative',
  fontWeight: 'regular',
});
