'use client';

import { useEffect, useState } from 'react';

export default function useGetBrowserWidth() {
  const [width, setWidth] = useState(0);

  const handleResize = () => {
    if (window.innerWidth > 600) setWidth(600);
    else setWidth(window.innerWidth);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth > 600) setWidth(600);
      else setWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  return width;
}
