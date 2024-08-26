import { UserImageIcon } from '@/components/atoms';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

import { ProfileProps } from '../../types/profile';

export default function ProfileContainer({
  profileData,
}: {
  profileData: ProfileProps['data'];
}) {
  return (
    <>
      <div className={inforWrapper}>
        <UserImageIcon />
        <div>
          <div className={nameStyles}>{profileData.nickname}</div>
          <div className={introStyles}>{profileData.introduction}</div>
        </div>
      </div>
      <div className={friendStyles.container}>
        <div className={friendStyles.item}>
          <div className={friendStyles.type}>팔로워</div>
          <div className={friendStyles.count}>{profileData.followerCount}</div>
        </div>
        <div className={friendStyles.item}>
          <div className={friendStyles.type}>팔로잉</div>
          <div className={friendStyles.count}>{profileData.followingCount}</div>
        </div>
      </div>
    </>
  );
}

const inforWrapper = flex({
  alignItems: 'flex-start',
  gap: '21px',
  alignSelf: 'stretch',
});

const nameStyles = css({
  textStyle: 'heading3',
  fontWeight: '600',
  color: 'text.normal',
});

const introStyles = css({
  textStyle: 'body2.normal',
  fontWeight: '500',
  color: 'text.alternative',
});

const friendStyles = {
  container: flex({
    alignItems: 'center',
    gap: '40px',
    alignSelf: 'stretch',
  }),
  item: flex({
    direction: 'column',
    alignItems: 'flex-start',
    gap: '2px',
  }),
  type: css({
    textStyle: 'label2',
    fontWeight: '500',
    color: 'text.alternative',
  }),
  count: css({
    textStyle: 'body2.normal',
    fontWeight: '600',
    color: 'text.normal',
  }),
};
