import { useEffect, useRef, useState } from 'react';

export const useDragScroll = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDown = useRef<boolean>(false);
  const startX = useRef<number | null>(null);
  const scrollLeft = useRef<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const sliderElement = sliderRef.current;

    if (sliderElement) {
      const handleMouseDown = (e: MouseEvent) => {
        isDown.current = true;
        startX.current = e.pageX - sliderElement.offsetLeft;
        scrollLeft.current = sliderElement.scrollLeft;
        sliderElement.style.cursor = 'grabbing';
      };

      const handleMouseFocused = () => {
        isDown.current = false;
        sliderElement.style.cursor = '';
      };

      const handleMouseUp = () => {
        handleMouseFocused();
        setIsDragging(false);
      };

      const handleMouseMove = (e: MouseEvent) => {
        if (!isDown.current) {
          return;
        }
        e.preventDefault();

        const offset = e.pageX - sliderElement.offsetLeft;
        const walk = offset - (startX.current ?? 0);

        if (Math.abs(walk) > 20) {
          setIsDragging(true);
        }

        sliderElement.scrollLeft = (scrollLeft.current ?? 0) - walk;
      };

      sliderElement.addEventListener('mousedown', handleMouseDown);
      sliderElement.addEventListener('mouseenter', handleMouseFocused);
      sliderElement.addEventListener('mouseup', handleMouseUp);
      sliderElement.addEventListener('mousemove', handleMouseMove);

      return () => {
        sliderElement.removeEventListener('mousedown', handleMouseDown);
        sliderElement.removeEventListener('mouseenter', handleMouseFocused);
        sliderElement.removeEventListener('mouseup', handleMouseUp);
        sliderElement.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, []);

  return { sliderRef, isDragging };
};
