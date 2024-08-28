'use client';

import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/atoms';
import { StatisticsIcon } from '@/components/atoms';
import BadgeIcon from '@/components/atoms/icons/badge-icon';
import { Tab, TabItem } from '@/components/molecules';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';
import { ProfileType } from '@/types/profileType';

import { ProfileProps } from '../../types/profile';
import { ProfileContainer } from './profile-container';
export function MyProfile({
  profileData,
}: {
  profileData: ProfileProps['data'];
}) {
  const [selectedTab, setSelectedTab] = useState<ProfileType>('statistics');

  return (
    <div>
      <section className={profileContainer}>
        <ProfileContainer profileData={profileData} />
        <div className={buttonContainer}>
          <Link href="/profile/edit" className={css({ w: 'full' })}>
            <Button
              size="small"
              label="프로필 편집"
              buttonType="assistive"
              variant="outlined"
              className={buttonStyle}
            />
          </Link>
          <Button
            size="small"
            label="프로필 공유"
            buttonType="assistive"
            variant="outlined"
            className={buttonStyle}
          />
        </div>
      </section>
      <Tab type="primary">
        <TabItem
          text="통계"
          selected={selectedTab === 'statistics'}
          type="primary"
          variant="fill"
          onClick={() => setSelectedTab('statistics')}
        />
        <TabItem
          text="배지"
          selected={selectedTab === 'badge'}
          type="primary"
          variant="fill"
          onClick={() => setSelectedTab('badge')}
        />
      </Tab>
      {selectedTab === 'statistics' && (
        <div className={tabContainer}>
          <StatisticsIcon />
          <div className={descriptionStyles}>
            <div className={titleStyles}>통계 기능이 곧 출시돼요!</div>
            <div className={subtitleStyles}>그동안 꾸준히 기록해보세요</div>
          </div>
        </div>
      )}
      {selectedTab === 'badge' && (
        <div className={tabContainer}>
          <BadgeIcon />
          <div className={descriptionStyles}>
            <div className={titleStyles}>배지 기능이 곧 출시돼요!</div>
            <div className={subtitleStyles}>그동안 꾸준히 기록해보세요</div>
          </div>
        </div>
      )}
    </div>
  );
}

const profileContainer = flex({
  direction: 'column',
  alignItems: 'flex-start',
  gap: '20px',
  padding: '20px',
});

const buttonContainer = flex({
  width: '100%',
  alignItems: 'flex-start',
  gap: '10px',
  alignSelf: 'stretch',
});

const buttonStyle = css({
  w: 'full',
});

const tabContainer = flex({
  direction: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '20px',
  paddingTop: '80px',
  width: '100%',
});

const descriptionStyles = flex({
  direction: 'column',
  alignItems: 'center',
  gap: '4px',
  alignSelf: 'stretch',
});

const titleStyles = css({
  textStyle: 'heading6',
  color: 'text.normal',
  fontWeight: '500',
});

const subtitleStyles = css({
  textStyle: 'body2.normal',
  color: 'text.alternative',
});
