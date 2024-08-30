'use client';

import { useRouter } from 'next/navigation';

import { Tab, TabItem } from '@/components/molecules';

export interface TabItemInfo {
  text: string;
  selected: boolean;
  onClick: VoidFunction;
}

export type MainTabType = 'calendar' | 'time-line';

interface MainTabProps {
  tab: MainTabType;
}

export const MainTab = ({ tab }: MainTabProps) => {
  const router = useRouter();

  const tabInfos: Array<TabItemInfo> = [
    {
      text: '캘린더',
      selected: tab === 'calendar',
      onClick: () => handleClickTab('calendar'),
    },
    {
      text: '타임라인',
      selected: tab === 'time-line',
      onClick: () => handleClickTab('time-line'),
    },
  ];

  const handleClickTab = (tab: MainTabType) => {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('tab', tab);

    router.replace(currentUrl.toString());
  };

  return (
    <Tab>
      {tabInfos.map((info, index) => (
        <TabItem key={index} {...info} />
      ))}
    </Tab>
  );
};
