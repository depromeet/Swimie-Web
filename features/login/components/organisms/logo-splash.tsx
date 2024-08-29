'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

import SwimieLogo from '@/public/images/login/swimie-logo.png';
import { flex } from '@/styled-system/patterns';

export function LogoSplash() {
  return (
    <div className={pageStyles}>
      <div>
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            ease: 'easeInOut',
            duration: 0.3,
            delay: 0.4,
          }}
        >
          <div>
            <Image width={97} height={57} alt="swimie logo" src={SwimieLogo} />
          </div>
        </motion.div>
      </div>
      <motion.div
        initial={{ y: -650, x: -650 }}
        animate={{ y: 0, x: 0 }}
        transition={{
          ease: 'easeOut',
          duration: 1,
          delay: 1.5,
        }}
      ></motion.div>
    </div>
  );
}

const pageStyles = flex({
  background: 'linear-gradient(180deg, #3B87F4 0%, #347FEA 100%)',
  height: '100dvh',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
});
