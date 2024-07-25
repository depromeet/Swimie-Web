'use client';

import { useState } from 'react';

export function useTab() {
  const [tabIndex, setTabIndex] = useState<number>(0);

  const onChangeTabIndex = (index: number) => {
    setTabIndex(index);
  };

  return {
    tabIndex,
    handlers: {
      onChangeTabIndex,
    },
  };
}
