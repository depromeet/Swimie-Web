import { css } from '@/styled-system/css';

export const EmptyKeyword = () => {
  return (
    <div className={containerStyle}>
      친구를 팔로우하고
      <br />
      서로의 기록에 응원을 보내보세요.
    </div>
  );
};

const containerStyle = css({
  m: '80px auto 0px',
  textStyle: 'body2.normal',
  color: 'text.alternative',
  textAlign: 'center',
});
