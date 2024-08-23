import { usePathname } from 'next/navigation';
import { useState } from 'react';

export function useGlobalNavigationBar() {
  const pathname = usePathname();
  const barIndexWithRouteMap = new Map([
    ['/', 0],
    ['/news', 1],
  ]);
  const [barIndex, setBarIndex] = useState<number>(
    barIndexWithRouteMap.get(pathname) ?? 0,
  );

  const onChangeBarIndex = (index: number) => {
    setBarIndex(index);
  };

  return { barIndex, handlers: { onChangeBarIndex } };
}
