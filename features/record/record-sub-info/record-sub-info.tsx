'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import { Divider, DownArrowIcon } from '@/components/atoms';
import { TextField } from '@/components/molecules';
import { css } from '@/styled-system/css';

interface RecordSubInfoProps {
  title: string;
}

export function RecordSubInfo({ title }: RecordSubInfoProps) {
  const [isTextFieldsOpen, setIsTextFieldsOpen] = useState(false);

  const handleTextFieldsOpenStateClick = () => {
    setIsTextFieldsOpen((prev) => !prev);
  };

  return (
    <>
      <div
        className={titleLayoutStyles}
        onClick={handleTextFieldsOpenStateClick}
      >
        <h1 className={titleStyles}>{title}</h1>
        <DownArrowIcon />
      </div>
      <AnimatePresence>
        {!isTextFieldsOpen && (
          <motion.div
            layout
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
          >
            <Divider variant="thick" />
          </motion.div>
        )}
        {isTextFieldsOpen && (
          <motion.div
            layout
            layoutScroll
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
            className={textFieldsStyles}
          >
            <TextField
              label="심박수"
              unit="BPM"
              wrapperClassName={css({ marginBottom: '23px' })}
            />
            <TextField
              label="페이스"
              unit="/100m"
              wrapperClassName={css({ marginBottom: '23px' })}
            />
            <TextField label="칼로리" unit="Kcal" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const titleLayoutStyles = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px 24px',
});

const titleStyles = css({
  textStyle: 'heading4',
  fontWeight: '600',
});

const textFieldsStyles = css({
  padding: '0 20px 24px 20px',
});
