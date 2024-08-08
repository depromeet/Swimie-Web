import type { PropsWithChildren } from 'react';

import { LoadingArea } from '@/components/atoms';
import { useIntersectionObserver } from '@/hooks';

interface InfiniteScrollerProps {
  isLastPage: boolean;
  onIntersect: (entry?: IntersectionObserverEntry) => void;
}

export const InfiniteScroller = ({
  onIntersect,
  isLastPage,
  children,
}: PropsWithChildren<InfiniteScrollerProps>) => {
  const ref = useIntersectionObserver((entry, observer) => {
    observer.unobserve(entry.target);

    if (isLastPage) return;

    onIntersect();
  }, 0.8);

  return (
    <>
      {children}
      <div ref={ref}>
        {!isLastPage && <LoadingArea width={30} height={30} />}
      </div>
    </>
  );
};
