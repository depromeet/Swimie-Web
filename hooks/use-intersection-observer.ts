import { useCallback, useEffect, useRef } from 'react';

type IntersectHandler = (
  entry: IntersectionObserverEntry,
  observer: IntersectionObserver,
) => void;

export const useIntersectionObserver = (
  onIntersect: IntersectHandler,
  threshold = 0,
) => {
  const ref = useRef<HTMLDivElement>(null);

  const updateEntry = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) onIntersect(entry, observer);
      });
    },
    [onIntersect],
  );

  useEffect(() => {
    if (!ref?.current) return;

    const observer = new IntersectionObserver(updateEntry, {
      threshold,
    });

    observer.observe(ref?.current);

    return () => observer.disconnect();
  }, [updateEntry, ref, threshold]);

  return ref;
};
