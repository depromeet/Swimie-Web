import { FollowListItem } from '@/features/profile-follow/components';
import { flex } from '@/styled-system/patterns';

export default function ProfileFollow() {
  return (
    <article className={containerStyle}>
      <p>팔로우 목록입니다.</p>
      <FollowListItem isFollow={false} />
      <FollowListItem isFollow={false} />
      <FollowListItem isFollow={false} />
      <FollowListItem isFollow={true} />
      <FollowListItem isFollow={true} />
      <FollowListItem isFollow={false} />
      <FollowListItem isFollow={false} />
      <FollowListItem isFollow={false} />
    </article>
  );
}

const containerStyle = flex({
  direction: 'column',
  gap: '12px',
});
