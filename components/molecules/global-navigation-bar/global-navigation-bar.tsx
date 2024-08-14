'use client';

import { useState } from 'react';

import { flex } from '@/styled-system/patterns';

import { BarItem } from './bar-item';

export function GlobalNavigationBar() {
  const barItemLabels = ['기록', '마이', '소식'];
  const [barIndex, setBarIndex] = useState<number>(0);

  //Todo: 라우팅 처리
  const handleClickBarItem = (index: number) => {
    setBarIndex(index);
  };
  return (
    <footer className={footerStyles}>
      {barItemLabels.map((label, i) => (
        <BarItem
          key={label}
          label={label}
          index={i}
          selected={i === barIndex}
          onClick={handleClickBarItem}
        />
      ))}
    </footer>
  );
}

const footerStyles = flex({
  justifyContent: 'space-between',
  w: 'full',
  maxWidth: 'maxWidth',
  position: 'fixed',
  bottom: 0,
  padding: '12px 42px calc(env(safe-area-inset-bottom) + 12px) 42px',
  backgroundColor: 'white',
});
