'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

import { BellIcon, LogoIcon, SettingIcon } from '@/components/atoms';
import { HeaderBar } from '@/components/molecules';
import {
  MainTab,
  TabItemInfo,
  TimeLine,
  UserCalendarProfile,
} from '@/features/main';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';
const DynamicLogoButton = dynamic(
  () => import('@/components/molecules').then(({ LogoButton }) => LogoButton),
  {
    ssr: false,
    loading: () => <LogoIcon />,
  },
);

const SELECT_CALENDAR_VIEW = 0;
const SELECT_TIMELINE_VIEW = 1;

export default function Home() {
  const [selected, setSelected] = useState<number>(SELECT_CALENDAR_VIEW);
  const tabInfos: Array<TabItemInfo> = [
    {
      text: '캘린더',
      selected: selected === SELECT_CALENDAR_VIEW,
      onClick: () => setSelected(SELECT_CALENDAR_VIEW),
    },
    {
      text: '타임라인',
      selected: selected === SELECT_TIMELINE_VIEW,
      onClick: () => setSelected(SELECT_TIMELINE_VIEW),
    },
  ];
  const isSelectedCalendarView = selected === SELECT_CALENDAR_VIEW;

  return (
    <>
      <HeaderBar>
        <HeaderBar.LeftContent className={css({ left: '20px' })}>
          <DynamicLogoButton />
        </HeaderBar.LeftContent>
        <HeaderBar.RightContent className={css({ right: '20px' })}>
          {[
            { component: <BellIcon />, key: 'bell' },
            { component: <SettingIcon />, key: 'setting' },
          ]}
        </HeaderBar.RightContent>
      </HeaderBar>
      <MainTab tabInfos={tabInfos} />
      <main className={styles}>
        <section className={contentStyles}>
          {isSelectedCalendarView ? <UserCalendarProfile /> : <TimeLine />}
        </section>
      </main>
    </>
  );
}

const styles = flex({
  w: 'full',
  h: 'full',
  padding: '16px 20px',
  direction: 'column',
});

const contentStyles = flex({
  w: 'full',
  h: 'full',
  padding: '16px 0',
  gap: '16px',
  direction: 'column',
});
