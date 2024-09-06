import { css } from '@/styled-system/css';

export const EmptyBlockedList = () => {
  return <div className={containerStyle}>차단한 계정이 없어요.</div>;
};

const containerStyle = css({
  m: '80px auto 0px',
  textStyle: 'body2.normal',
  color: 'text.alternative',
  textAlign: 'center',
});
