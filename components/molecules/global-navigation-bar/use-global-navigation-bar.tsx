'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function useGlobalNavigationBar(
  itemRoutes: string[],
  isDataFetched: boolean,
) {
  const pathname = usePathname();
  const barIndexWithRouteMap = new Map([
    [itemRoutes[0], 0],
    [itemRoutes[1], 1],
    [itemRoutes[2], 2],
  ]);

  const [barIndex, setBarIndex] = useState<number>(
    barIndexWithRouteMap.get(pathname) ?? -1,
  );

  useEffect(() => {
    if (isDataFetched && barIndex === -1)
      setBarIndex(barIndexWithRouteMap.get(pathname) ?? -1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDataFetched]);

  const onChangeBarIndex = (index: number) => {
    setBarIndex(index);
  };

  return { barIndex, handlers: { onChangeBarIndex } };
}
