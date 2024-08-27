'use client';

import { useState } from 'react';

import { StatisticsIcon } from '@/components/atoms';
import BadgeIcon from '@/components/atoms/icons/badge-icon';
import { Tab, TabItem } from '@/components/molecules';
import { Calendar } from '@/features/main';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';
import { ProfileType } from '@/types/profileType';

import { ProfileProps } from '../../types/profile';
import FollowButton from '../atoms/follow-button';
import ProfileContainer from './profile-container';

export function OtherPage({
  profileData,
}: {
  profileData: ProfileProps['data'];
}) {
  const [selectedTab, setSelectedTab] = useState<ProfileType>('record');

  return (
    <div>
      <section className={profileContainer}>
        <ProfileContainer profileData={profileData} />
        <div className={buttonContainer}>
          <FollowButton />
        </div>
      </section>
      <Tab type="primary">
        <TabItem
          text="기록"
          selected={selectedTab === 'record'}
          type="primary"
          variant="fill"
          onClick={() => setSelectedTab('record')}
        />
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
      {selectedTab === 'record' && (
        <div className={recordContainer}>
          <Calendar />
        </div>
      )}
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

const tabContainer = flex({
  direction: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '20px',
  paddingTop: '80px',
  width: '100%',
});

const recordContainer = css({
  width: '100%',
  padding: '20px',
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
