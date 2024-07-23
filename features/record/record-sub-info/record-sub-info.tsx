'use client';

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
      {!isTextFieldsOpen && <Divider variant="thick" />}
      {isTextFieldsOpen && (
        <div className={textFieldsStyles}>
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
        </div>
      )}
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
