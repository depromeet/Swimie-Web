'use client';

import { useState } from 'react';

import { Calendar } from '@/features/main/calendar';
import { MainTab } from '@/features/main/main-tab';
import { TabItemInfo } from '@/features/main/main-tab/main-tab';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

const SELECT_CALENDER_VIEW = 0;
const SELECT_TIMELINE_VIEW = 1;

export default function Home() {
  const [selected, setSelected] = useState<number>(SELECT_CALENDER_VIEW);
  const tabInfos: Array<TabItemInfo> = [
    {
      text: '캘린더',
      selected: selected === SELECT_CALENDER_VIEW,
      onClick: () => setSelected(SELECT_CALENDER_VIEW),
    },
    {
      text: '타임라인',
      selected: selected === SELECT_TIMELINE_VIEW,
      onClick: () => setSelected(SELECT_TIMELINE_VIEW),
    },
  ];

  return (
    <main className={styles}>
      <header>
        <MainTab tabInfos={tabInfos} />
      </header>
      <section className={contentStyles}>
        {selected === SELECT_CALENDER_VIEW ? (
          <>
            <div className={profileContainerStyles}>
              <div className={characterStyles} />
              <div className={userInfoStyles}>
                <p className={nicknameStyles}>수린이님,</p>
                <p className={descriptionStyles}>
                  이번달 수영을 7번 다녀왔어요!
                </p>
              </div>
            </div>
            <Calendar />
          </>
        ) : (
          ''
        )}
      </section>
    </main>
  );
}

const styles = css({
  w: 'full',
  h: 'full',
  padding: '16px 20px',
});

const contentStyles = flex({
  padding: '16px 0',
  gap: '16px',
  direction: 'column',
});

const profileContainerStyles = flex({
  padding: '14px 11px',
  gap: '4px',
  borderRadius: '6px',
  alignItems: 'flex-start',
  justifyContent: 'center',
  backgroundColor: 'primary.swim.총거리.default',
});

const characterStyles = css({ height: '75px', width: '70px' });

const userInfoStyles = flex({
  height: 'full',
  direction: 'column',
  justifyContent: 'center',
});

const nicknameStyles = css({
  textStyle: 'heading6',
  fontWeight: 'bold',
  color: 'background.white',
});

const descriptionStyles = css({
  textStyle: 'label1.normal',
  fontWeight: 'medium',
  color: 'line.solid.neutral',
});
