import { forwardRef, MutableRefObject, useEffect, useState } from 'react';

import { LoadingArea } from '../loading';

interface PullToRereshProps {
  onRefresh?: VoidFunction;
}

const REFRESH_TRIGGER_DISTANCE = 100;

export const PullToRefresh = forwardRef<HTMLDivElement, PullToRereshProps>(
  ({ onRefresh }, ref) => {
    const [refreshing, setRefreshing] = useState(false);
    const [startY, setStartY] = useState(0);

    useEffect(() => {
      if (!ref) return;

      const handleTouchStart = (event: TouchEvent) => {
        setStartY(event.touches[0].clientY);
      };

      const handleTouchMove = (event: TouchEvent) => {
        const moveY = event.touches[0].clientY;
        const pullDistance = moveY - startY;

        if (pullDistance > REFRESH_TRIGGER_DISTANCE) {
          (ref as MutableRefObject<HTMLDivElement>).current.style.transform =
            'translate(0, 20px)';
          (ref as MutableRefObject<HTMLDivElement>).current.style.transition =
            '0.3s';
          setRefreshing(true);
        }
      };

      const handleTouchEnd = () => {
        if (ref && refreshing) {
          onRefresh && onRefresh();

          setTimeout(() => {
            setRefreshing(false);
            (ref as MutableRefObject<HTMLDivElement>).current.style.transform =
              'translate(0,0)';
          }, 1000);
        }
      };

      document.addEventListener('touchstart', handleTouchStart);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);

      return () => {
        document.removeEventListener('touchstart', handleTouchStart);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }, [refreshing, startY, ref, onRefresh]);

    return (
      <div>
        <div>
          {refreshing ? (
            <LoadingArea width={30} height={30} paddingY="none" />
          ) : (
            ''
          )}
        </div>
      </div>
    );
  },
);

PullToRefresh.displayName = 'PullToRefresh';
