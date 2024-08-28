'use client';

import { useRouter } from 'next/navigation';

import { Tab, TabItem } from '@/components/molecules';

import { type FollowTab } from '../types';

type FollowTabSection = {
  tab: FollowTab;
};
export const FollowTabSection = ({ tab }: FollowTabSection) => {
  const router = useRouter();

  const handleClickTab = (tab: FollowTab) => {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('tab', tab);

    router.replace(currentUrl.toString());
  };

  return (
    <Tab>
      <TabItem
        text="팔로워"
        selected={tab === 'follow'}
        onClick={() => handleClickTab('follow')}
      />
      <TabItem
        text="팔로잉"
        selected={tab === 'following'}
        onClick={() => handleClickTab('following')}
      />
    </Tab>
  );
};
