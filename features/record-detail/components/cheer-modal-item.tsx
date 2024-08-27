import Link from 'next/link';

import { Image } from '@/components/atoms';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

import { CheerPreview } from '../types';

type CheerModalItem = {
  isMyMemory: boolean;
  onClickRemove?: () => void;
} & CheerPreview;

export const CheerModalItem = ({
  nickname,
  profileImageUrl,
  memberId,
  emoji,
  comment,
  isMyMemory,
  onClickRemove,
}: CheerModalItem) => {
  return (
    <div className={containerStyle}>
      <Link className={profile.wrapperStyle} href={`/profile/${memberId}`}>
        <div className={profile.imageStyle}>
          <Image
            src={profileImageUrl ?? ''}
            width={16}
            height={16}
            alt="profile image"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <h3 className={profile.nickNameStyle}>{nickname}</h3>
      </Link>
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
  }),

  imageStyle: css({
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
});
