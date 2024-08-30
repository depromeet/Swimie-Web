import { ProfileImage } from '@/components/molecules';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

import { CheerPreview } from '../types';

type CheerModalItem = {
  isMyMemory: boolean;
  onClickRemove?: () => void;
  onClickProfile?: () => void;
} & CheerPreview;

export const CheerModalItem = ({
  nickname,
  profileImageUrl,
  emoji,
  comment,
  isMyMemory,
  onClickRemove,
  onClickProfile,
}: CheerModalItem) => {
  return (
    <div className={containerStyle}>
      <button className={profile.wrapperStyle} onClick={onClickProfile}>
        <div className={profile.imageStyle}>
          <ProfileImage
            src={profileImageUrl ?? ''}
            fill
            sizes="5vw"
            alt="profile image"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <h3 className={profile.nickNameStyle}>{nickname}</h3>
      </button>
      <div className={contentWrapperStyle}>
        <div className={commentStyle}>
          <span>{emoji}</span>
          {comment && <span>{comment}</span>}
        </div>
        {isMyMemory && onClickRemove && (
          <button className={removeButtonStyle} onClick={onClickRemove}>
            삭제
          </button>
        )}
      </div>
    </div>
  );
};

const containerStyle = flex({
  direction: 'column',
  gap: '10px',
  py: '16px',
  borderTop: '1px solid',
  borderColor: 'line.alternative',
});

const profile = {
  wrapperStyle: flex({
    alignItems: 'center',
    gap: '6px',
    width: 'fit-content',
    cursor: 'pointer',
  }),

  imageStyle: flex({
    position: 'relative',
    justify: 'center',
    rounded: 'full',
    w: '16px',
    h: '16px',
    overflow: 'hidden',
  }),

  nickNameStyle: css({
    textStyle: 'label1.normal',
    fontWeight: 'medium',
    color: 'text.alternative',
  }),
};

const contentWrapperStyle = flex({
  justifyContent: 'space-between',
  alignItems: 'center',
});

const commentStyle = flex({
  gap: '6px',
  textStyle: 'heading6',
  fontWeight: 'bold',
  color: 'text.normal',
});

const removeButtonStyle = css({
  textStyle: 'label1.normal',
  fontWeight: 'regular',
  color: 'text.alternative',
  cursor: 'pointer',
});
