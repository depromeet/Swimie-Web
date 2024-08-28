import Link from 'next/link';
import { ReactNode } from 'react';

import { DefaultProfileIcon, Image, PersonsIcon } from '@/components/atoms';
import { css, cx } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

import { useFollowingSummary } from '../../hooks';

const MAX_NUMBER_OF_PROFILES = 3;

export const FollowingListLinkButton = () => {
  const { data: followingSummaryData } = useFollowingSummary();

  if (!followingSummaryData) return null;

  const { followings, followingCount } = followingSummaryData.data;
  const hasFollowings = followingCount > 0;
  const indexOffset = MAX_NUMBER_OF_PROFILES - followings.length;
  let nodeList: Array<ReactNode> = [];

  if (hasFollowings) {
    nodeList = followings.map(({ memberId, profileImageUrl }, index) => (
      <div
        key={memberId}
        className={cx(
          baseProfileStyle,
          borderStyles,
          profileStyles[index + indexOffset],
        )}
      >
        {profileImageUrl ? (
          <Image
            src={profileImageUrl}
            alt="following profiles"
            width={24}
            height={24}
          />
        ) : (
          <DefaultProfileIcon width={24} height={24} />
        )}
      </div>
    ));
  }

  nodeList.push(
    <div key="follower-count" className={cx(containerStyles, borderStyles)}>
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

const baseProfileStyle = flex({
  position: 'absolute',
  top: '2px',
  backgroundColor: 'white',
  overflow: 'hidden',
});

const profileStyles = [
  css({ right: '-98px' }),
  css({ right: '-82px' }),
  css({ right: '-66px' }),
];

const countStyles = css({
  w: '16px',
  h: '16px',
  textAlign: 'center',
  textStyle: 'caption1',
  fontWeight: 'bold',
  color: 'primary.swim.총거리.default',
});
