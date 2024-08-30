'use client';

import { motion } from 'framer-motion';

type LoadingSpinner = {
  width?: number;
  height?: number;
};
export const LoadingSpinner = ({ width = 30, height = 30 }: LoadingSpinner) => {
  return (
    <motion.div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        border: '3px solid transparent',
        borderTop: '3px solid #3B87F4',
        borderLeft: '3px solid #3B87F4',
        borderRadius: '50%',
        display: 'inline-block',
      }}
      animate={{
        rotate: 360,
      }}
      transition={{
        repeat: Infinity,
        duration: 0.7,
        ease: 'easeInOut',
      }}
    />
  );
};
