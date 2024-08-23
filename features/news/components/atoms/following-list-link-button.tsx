import Link from 'next/link';
import { ReactNode } from 'react';

import { DefaultProfileIcon, Image, PersonsIcon } from '@/components/atoms';
import { css, cx } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

interface FollowingInfo {
  memberId: number;
  name: string;
  introduction: string;
  profileUrl?: string;
}

const dummy: { followings: Array<FollowingInfo>; followingCount: number } = {
  followings: [
    {
      memberId: 1,
      name: '홍길동',
      introduction: '안녕하세요. 홍길동입니다',
    },
    {
      memberId: 2,
      name: '홍길동',
      introduction: '안녕하세요. 홍길동입니다',
    },
    {
      memberId: 3,
      name: '홍길동',
      introduction: '안녕하세요. 홍길동입니다',
    },
  ],
  followingCount: 12,
};

const MAX_NUMBER_OF_PROFILES = 3;

export const FollowingListLinkButton = () => {
  const { followings, followingCount } = dummy;
  const hasFollowings = followingCount > 0;
  const indexOffset = MAX_NUMBER_OF_PROFILES - followings.length;
  let nodeList: Array<ReactNode> = [];

  if (hasFollowings) {
    nodeList = followings.map(({ memberId, profileUrl }, index) => (
      <div
        key={memberId}
        className={cx(
          baseProfileStyle,
          borderStyles,
          profileStyles[index + indexOffset],
        )}
      >
        {profileUrl ? (
          <Image src={profileUrl} alt="following profiles" />
        ) : (
          <DefaultProfileIcon width={24} height={24} />
        )}
      </div>
    ));
  }

  nodeList.push(
    <div className={cx(containerStyles, borderStyles)}>
      <PersonsIcon width={12} height={12} />
      <p className={countStyles}>{followingCount.toString()}</p>
    </div>,
  );

  return (
    <Link href="/" className={linkStyles}>
      {nodeList.map((node) => node)}
    </Link>
  );
};

const linkStyles = flex({
  position: 'relative',
  top: '-16px',
});

const containerStyles = flex({
  position: 'absolute',
  left: '0',
  p: '6px 8px',
  gap: '2px',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '22px',
  backgroundColor: 'blue.95',
});

const borderStyles = css({
  borderWidth: '2px',
  borderColor: 'white',
});

const baseProfileStyle = css({
  position: 'absolute',
  top: '2px',
  borderRadius: 'full',
  backgroundColor: 'white',
});

const profileStyles = [
  css({ right: '-96px' }),
  css({ right: '-80px' }),
  css({ right: '-64px' }),
];

const countStyles = css({
  w: '14px',
  h: '16px',
  textStyle: 'caption1',
  fontWeight: 'bold',
  color: 'primary.swim.총거리.default',
});
