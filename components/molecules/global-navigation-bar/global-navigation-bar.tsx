'use client';

import { useState } from 'react';

import { flex } from '@/styled-system/patterns';

import { BarItem } from './bar-item';

export function GlobalNavigationBar() {
  const barItemLabels = ['기록', '마이', '소식'];
  const [barIndex, setBarIndex] = useState<number>(0);

  const barItemClicked = (index: number) => {
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
          onClick={barItemClicked}
        />
      ))}
    </footer>
  );
}

const footerStyles = flex({
  justifyContent: 'space-between',
  w: 'full',
  position: 'fixed',
  bottom: 0,
  left: 0,
  padding: '12px 42px',
  backgroundColor: 'white',
});
