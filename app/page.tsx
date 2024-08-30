'use client';

import {
  GlobalNavigationBar,
  HeaderBar,
  LogoButton,
  NotificationButton,
} from '@/components/molecules';
import { SettingButton } from '@/components/molecules';
import {
  MainTab,
  MainTabType,
  TimeLine,
  UserCalendarProfile,
} from '@/features/main';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

export default function Home({
  searchParams,
}: {
  searchParams: { tab: MainTabType };
}) {
  const { tab = 'calendar' } = searchParams;

  return (
    <>
      <HeaderBar>
        <HeaderBar.LeftContent className={css({ left: '20px' })}>
          <LogoButton />
        </HeaderBar.LeftContent>
        <HeaderBar.RightContent className={css({ right: '20px' })}>
          {[
            { component: <NotificationButton />, key: 'bell' },
            { component: <SettingButton />, key: 'setting' },
          ]}
        </HeaderBar.RightContent>
      </HeaderBar>
      <MainTab tab={tab} />
      <main className={styles}>
        <section className={contentStyles}>
          {tab === 'calendar' ? <UserCalendarProfile /> : <TimeLine />}
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
