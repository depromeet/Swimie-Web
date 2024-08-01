'use client';

import { useState } from 'react';

import { Image } from '@/components/atoms';
import { Calendar } from '@/features/main/calendar';
import { MainTab } from '@/features/main/main-tab';
import { TabItemInfo } from '@/features/main/main-tab/main-tab';
import { TimeLine } from '@/features/main/time-line';
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
  const isSelectedCalenderView = selected === SELECT_CALENDER_VIEW;

  return (
    <main className={styles}>
      <header>
        <MainTab tabInfos={tabInfos} />
      </header>
      <section className={contentStyles}>
        {isSelectedCalenderView ? (
          <>
            <div className={profileContainerStyles}>
              <Image
                className={characterImageStyles}
                width={70}
                height={75}
                src="/images/swimie-character.svg"
                alt="swimie character"
              />
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
          <TimeLine />
        )}
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

const profileContainerStyles = flex({
  padding: '14px 11px',
  gap: '4px',
  alignItems: 'center',
  borderRadius: '6px',
  backgroundColor: 'primary.swim.총거리.default',
});

const characterImageStyles = css({ margin: '0 10px' });

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
