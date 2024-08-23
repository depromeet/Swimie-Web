'use client';

import { MyIcon } from '@/components/atoms/icons/my-icon';
import { NewsIcon } from '@/components/atoms/icons/news-icon';
import { RecordIcon } from '@/components/atoms/icons/record-icon';
import { flex } from '@/styled-system/patterns';

import { BarItem } from './bar-item';
import { useGlobalNavigationBar } from './use-global-navigation-bar';

export function GlobalNavigationBar() {
  //Todo: 내 userId api로 받아온 후, 마이페이지 route 추가
  const barItems = [
    { label: '기록', icon: RecordIcon, route: '/' },
    { label: '소식', icon: NewsIcon, route: '/news' },
    { label: '마이', icon: MyIcon, route: '/' },
  ];
  const { barIndex, handlers } = useGlobalNavigationBar(
    barItems.map((item) => item.route),
  );

  return (
    <footer className={footerStyles}>
      {barItems.map((item, i) => (
        <BarItem
          key={item.label}
          {...item}
          index={i}
          isSelected={i === barIndex}
          onClick={handlers.onChangeBarIndex}
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
