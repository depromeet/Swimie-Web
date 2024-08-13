'use client';

import { useState } from 'react';

import { UserCalendarProfile } from '@/features/main/calendar';
import { MainTab } from '@/features/main/main-tab';
import { TabItemInfo } from '@/features/main/main-tab/main-tab';
import { TimeLine } from '@/features/main/time-line';
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
    <main className={styles}>
      <header>
        <MainTab tabInfos={tabInfos} />
      </header>
      <section className={contentStyles}>
        {isSelectedCalendarView ? <UserCalendarProfile /> : <TimeLine />}
      </section>
    </main>
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
