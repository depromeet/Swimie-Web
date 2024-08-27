import { Button, Image } from '@/components/atoms';
import { ProfileFollowContent } from '@/features/follow';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

type FollowListItem = {
  isFollow: boolean;
  onClick?: () => void;
  onClickFollow?: () => void;
} & ProfileFollowContent;
export const ProfileListItem = ({
  name,
  introduction,
  profileImageUrl,
  isFollow,
}: FollowListItem) => {
  return (
    <div className={containerStyle}>
      <div className={profileImageStyle}>
        <Image
          src={profileImageUrl}
          alt="profile image"
          width={40}
          height={40}
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className={text.wrapperStyle}>
        <h1 className={text.nicknameStyle}>{name}</h1>
        <p className={text.summaryStyle}>{introduction}</p>
      </div>
      {isFollow ? (
        <Button
          size="small"
          label="팔로잉"
          variant="outlined"
          buttonType="assistive"
        />
      ) : (
        <Button size="small" label="팔로우" variant="outlined" />
      )}
    </div>
  );
};

const containerStyle = flex({
  py: '8px',
  gap: '16px',
  align: 'center',
  width: 'full',
});

const profileImageStyle = flex({
  width: '40px',
  height: '40px',
  align: 'stretch',
  rounded: 'full',
  overflow: 'hidden',
});

const text = {
  wrapperStyle: flex({
    gap: '2px',
    direction: 'column',
    grow: 1,
  }),

  nicknameStyle: css({
    textStyle: 'heading6',
    fontWeight: 'bold',
  }),

  summaryStyle: css({
    textStyle: 'body2.normal',
    fontWeight: 'regular',
    color: 'text.alternative',
  }),
};
