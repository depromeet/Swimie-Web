import { PropsWithChildren } from 'react';

import { DefaultProfileIcon, Image } from '@/components/atoms';
import { css, cx } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';
import { convertTimeToElapsedTime, getFormatDate } from '@/utils';

import { CheerUpButton } from '../atoms';

export interface NewsItemWrapperProps {
  memberId: number;
  isRecentNews: boolean;
  profileUrl?: string;
  memberNickname: string;
  recordAt: string;
  createdAt: string;
  isLast?: boolean;
}

export const NewsItemWrapper = ({
  isRecentNews,
  profileUrl,
  memberNickname,
  recordAt,
  createdAt,
  isLast,
  children,
}: PropsWithChildren<NewsItemWrapperProps>) => {
  const { month, day } = getFormatDate({ dateStr: recordAt });
  return (
    <li className={cx(containerStyles, isLast ? emptyStyle : lastItemStyles)}>
      <div className={userInfoStyles}>
        <div className={userProfileImageWrapperStyles}>
          {isRecentNews && <div className={newMarkStyles} />}
          {profileUrl ? (
            <Image src={profileUrl} alt="user profile image" />
          ) : (
            <DefaultProfileIcon width={40} height={40} />
          )}
        </div>
        <div>
          <p className={descriptionStyles}>
            <span className={nameStyle}>{memberNickname}</span>님이{' '}
            {`${month}월 ${day}일`}의 수영을 기록했어요.
          </p>
          <p className={postTimeStyles}>
            {convertTimeToElapsedTime(createdAt)}
          </p>
        </div>
      </div>
      {children}
      <CheerUpButton />
    </li>
  );
};

const emptyStyle = '';

const containerStyles = css({ py: '32px' });
const lastItemStyles = css({
  borderBottom: '2px solid',
  borderColor: 'line.solid.alternative',
});

const userInfoStyles = flex({
  position: 'relative',
  mb: '8px',
  gap: '10px',
  alignItems: 'center',
});

const userProfileImageWrapperStyles = css({ width: '40px', height: '40px' });

const newMarkStyles = css({
  position: 'absolute',
  top: '-5px',
  w: '5px',
  h: '5px',
  borderRadius: 'full',
  backgroundColor: 'primary.swim.총거리.default',
});

const descriptionStyles = css({ textStyle: 'body2.normal' });

const nameStyle = css({ fontWeight: 'bold' });

const postTimeStyles = css({
  textStyle: 'label2',
  fontWeight: 'regular',
  color: 'text.alternative',
});
