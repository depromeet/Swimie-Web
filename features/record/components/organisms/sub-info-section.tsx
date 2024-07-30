'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';

import { DownArrowIcon } from '@/components/atoms';
import { Divider } from '@/components/atoms/divider';
import { TextField } from '@/components/molecules';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

import { useSubInfoTextFields } from '../../hooks';
import { FormSectionProps } from '../../types/form-section';

export function SubInfoSection({ title }: FormSectionProps) {
  const { isOpen, handlers } = useSubInfoTextFields();
  const { getValues } = useFormContext();

  const handleTextFieldsOpenStateClick = () => {
    handlers.onChangeFieldsOpen();
  };

  return (
    <>
      <div
        className={titleStyles.layout}
        onClick={handleTextFieldsOpenStateClick}
      >
        <h1 className={titleStyles.text}>{title}</h1>
        <DownArrowIcon />
      </div>
      <AnimatePresence>
        {!isOpen && (
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
        {isOpen && (
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
              value={
                getValues('heartRate') ? String(getValues('heartRate')) : ''
              }
              wrapperClassName={css({ marginBottom: '23px' })}
              onChange={handlers.onChangeHeartRate}
            />
            <TextField
              label="페이스"
              unit="/100m"
              value={getValues('pace') ? (getValues('pace') as string) : ''}
              wrapperClassName={css({ marginBottom: '23px' })}
              onChange={handlers.onChangePace}
            />
            <TextField
              label="칼로리"
              unit="Kcal"
              value={getValues('kcal') ? String(getValues('kcal')) : ''}
              onChange={handlers.onChangeKcal}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const titleStyles = {
  layout: flex({
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 24px',
  }),

  text: css({
    textStyle: 'heading4',
    fontWeight: '600',
  }),
};

const textFieldsStyles = css({
  padding: '0 20px 24px 20px',
});
