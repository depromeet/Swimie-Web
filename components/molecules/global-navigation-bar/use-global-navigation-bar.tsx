import { usePathname } from 'next/navigation';
import { useState } from 'react';

//Todo: 내 유저 id를 해당 훅의 매개변수로 받아온 후, Map에 마이페이지 라우팅 추가
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
