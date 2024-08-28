import { css } from '@/styled-system/css';

import { FollowTab } from '../types';

export const EmptyFollowList = ({ type }: { type: FollowTab }) => {
  return (
    <div className={containerStyle}>
      <p className={textStyle}>
        {type === 'follower' ? '나를' : '내가'} 팔로우하는 사람이 없어요.
      </p>
    </div>
  );
};

const containerStyle = css({
  m: '200px auto 0px',
  textAlign: 'center',
});

const textStyle = css({
  textStyle: 'body2.normal',
  fontWeight: 'medium',
  color: 'text.neutral',
});
