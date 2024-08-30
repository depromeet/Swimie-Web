'use client';

import { useCallback, useEffect } from 'react';

export function usePreventRouterBack(state: {
  isDirty: boolean;
  alterAction: () => void;
}) {
  const handlePopState = useCallback(() => {
    if (state.isDirty) {
      history.pushState(null, '', '');
      state.alterAction();
      return;
    }
    history.back();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.isDirty]);

  useEffect(() => {
    history.pushState(null, '', '');
  }, []);

  useEffect(() => {
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [handlePopState]);
}
