import { Divider } from '@/components/atoms/divider';
import { RecommendedProfileItemList } from '@/features/profile-recommend';
import { css } from '@/styled-system/css';

export const EmptyKeyword = () => {
  return (
    <>
      <div className={containerStyle}>
        친구를 팔로우하고
        <br />
        서로의 기록에 응원을 보내보세요.
      </div>
      <Divider variant="thick" />
      <RecommendedProfileItemList title="다른 수영인과 응원을 주고 받아보세요" />
    </>
  );
};

const containerStyle = css({
  m: '40px auto 40px',
  textStyle: 'body2.normal',
  color: 'text.alternative',
  textAlign: 'center',
});
