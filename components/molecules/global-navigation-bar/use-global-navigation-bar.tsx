'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';

export function useGlobalNavigationBar(itemRoutes: string[]) {
  const pathname = usePathname();
  const barIndexWithRouteMap = new Map([
    [itemRoutes[0], 0],
    [itemRoutes[1], 1],
    [itemRoutes[2], 1],
  ]);

  const [barIndex, setBarIndex] = useState<number>(
    barIndexWithRouteMap.get(pathname) ?? 0,
  );

  const onChangeBarIndex = (index: number) => {
    setBarIndex(index);
  };

  return { barIndex, handlers: { onChangeBarIndex } };
}
