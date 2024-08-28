'use client';

import { useState } from 'react';

import {
  AlarmButton,
  GlobalNavigationBar,
  HeaderBar,
  LogoButton,
} from '@/components/molecules';
import { SettingButton } from '@/components/molecules/header-bar/header-bar-setting-button';
import {
  MainTab,
  TabItemInfo,
  TimeLine,
  UserCalendarProfile,
} from '@/features/main';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

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
          <LogoButton />
        </HeaderBar.LeftContent>
        <HeaderBar.RightContent className={css({ right: '20px' })}>
          {[
            { component: <AlarmButton />, key: 'bell' },
            { component: <SettingButton />, key: 'setting' },
          ]}
        </HeaderBar.RightContent>
      </HeaderBar>
      <MainTab tabInfos={tabInfos} />
      <main className={styles}>
        <section className={contentStyles}>
          {isSelectedCalendarView ? <UserCalendarProfile /> : <TimeLine />}
        </section>
      </main>
      <GlobalNavigationBar />
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
