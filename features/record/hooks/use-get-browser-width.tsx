'use client';

import { useEffect, useState } from 'react';

export default function UseGetBrowserWidth() {
  const [width, setWidth] = useState(0);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    // Check if window object exists (for browser environments)
    if (typeof window !== 'undefined') {
      setWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => {
        // cleanup
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  return width;
}
