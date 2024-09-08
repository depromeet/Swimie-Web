'use client';

import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';

import { Accordion, DownArrowIcon } from '@/components/atoms';
import { Divider } from '@/components/atoms/divider';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

import { FormSectionProps } from '../../types/form-section';
import { SubInfoTextFields } from './sub-info-text-fields';

export function SubInfoSection({ title }: FormSectionProps) {
  const [isTextFieldsOpen, setIsTextFieldsOpen] = useState(false);

  const handleTextFieldsOpenStateClick = () => {
    setIsTextFieldsOpen((prev) => !prev);
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
        {!isTextFieldsOpen ? (
          <Accordion>
            <Divider variant="thick" />
          </Accordion>
        ) : (
          <Accordion className={textFieldsStyles}>
            <SubInfoTextFields />
          </Accordion>
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
    cursor: 'pointer',
  }),

  text: css({
    textStyle: 'heading4',
    fontWeight: '600',
  }),
};

const textFieldsStyles = css({
  padding: '0 20px 24px 20px',
});
