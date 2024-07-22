'use client';

import { useState } from 'react';

export function UseTab() {
  const [tabIndex, setTabIndex] = useState<number>(0);

  const changeTabIndex = (index: number) => {
    setTabIndex(index);
  };

  return {
    tabIndex,
    handlers: {
      changeTabIndex,
    },
  };
}
