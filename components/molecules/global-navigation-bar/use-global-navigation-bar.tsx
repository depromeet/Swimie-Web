'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function useGlobalNavigationBar(itemRoutes: string[]) {
  const pathname = usePathname();
  const barIndexWithRouteMap = new Map([
    [itemRoutes[0], 0],
    [itemRoutes[1], 1],
    [itemRoutes[2], 2],
  ]);

  const [barIndex, setBarIndex] = useState<number>(
    barIndexWithRouteMap.get(pathname) ?? 0,
  );

  useEffect(() => {
    setBarIndex(barIndexWithRouteMap.get(pathname) ?? 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const onChangeBarIndex = (index: number) => {
    setBarIndex(index);
  };

  return { barIndex, handlers: { onChangeBarIndex } };
}
