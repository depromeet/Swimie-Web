import dynamic from 'next/dynamic';

import {
  GlobalNavigationBar,
  HeaderBar,
  LogoButton,
  NotificationButton,
} from '@/components/molecules';
import { SettingButton } from '@/components/molecules';
import { MainTabType, TimeLineSkeleton } from '@/features/main';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

const DynamicTabSection = dynamic(
  () => import('@/features/main').then(({ MainTab }) => MainTab),
  {
    ssr: false,
  },
);

const DynamicTimeLine = dynamic(
  () => import('@/features/main').then(({ TimeLine }) => TimeLine),
  {
    ssr: false,
    loading: () => <TimeLineSkeleton />,
  },
);

// TODO: Calendar loading skeleton 변경
const DynamicUserCalendarProfile = dynamic(
  () =>
    import('@/features/main').then(
      ({ UserCalendarProfile }) => UserCalendarProfile,
    ),
  {
    ssr: false,
  },
);

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
      <DynamicTabSection tab={tab} />
      <main className={styles}>
        <section className={contentStyles}>
          {tab === 'calendar' ? (
            <DynamicUserCalendarProfile />
          ) : (
            <DynamicTimeLine />
          )}
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
