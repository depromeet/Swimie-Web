'use client';

import '@mobiscroll/react/dist/css/mobiscroll.min.css';

import { Datepicker, MbscDatepickerChangeEvent } from '@mobiscroll/react';
import { useState } from 'react';

import { css } from '@/styled-system/css';

import { BottomSheetProps } from './type';

export function TimeBottomSheet({
  isOpen,
  modifyValue,
  closeBottomSheet,
  addStyles,
}: BottomSheetProps<string>) {
  const [time, setTime] = useState('');
  const handleTimeChange = (args: MbscDatepickerChangeEvent) => {
    setTime(args.valueText ? args.valueText : '');
  };

  const handleClickButton = () => {
    modifyValue && modifyValue(time);
    closeBottomSheet && closeBottomSheet();
  };

  return isOpen ? (
    //지영's Bottom Sheet로 대체
    <div className={css(timeBottomSheetStyles, addStyles)}>
      <Datepicker
        controls={['time']}
        touchUi={true}
        display="inline"
        onChange={handleTimeChange}
      />
      <button className={css(buttonStyles)} onClick={handleClickButton}>
        확인
      </button>
    </div>
  ) : null;
}

const timeBottomSheetStyles = css.raw({
  position: 'fixed',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: 'white',
  bottom: 0,
  left: 0,
  width: '100%',
  border: '1.5px solid',
  padding: '10px 0px',
});

const buttonStyles = css.raw({
  width: '100px',
  height: '40px',
  backgroundColor: 'skyblue',
  borderRadius: '4px',
});
