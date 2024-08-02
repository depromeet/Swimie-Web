'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AccordionProps {
  className?: string;
  children: ReactNode;
}

export function Accordion({ className, children }: AccordionProps) {
  return (
    <motion.div
      layout
      animate={{ y: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
