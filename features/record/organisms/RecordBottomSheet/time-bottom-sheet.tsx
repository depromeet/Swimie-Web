'use client';

import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';

import { css, cx } from '@/styled-system/css';

import { BottomSheetProps } from './type';

export function TimeBottomSheet({
  isOpen,
  modifyValue,
  closeBottomSheet,
  className,
}: BottomSheetProps<string>) {
  const [time, setTime] = useState('');
  const handleTimeChange = (date: dayjs.Dayjs) => {
    setTime(date.format('HH:mm'));
  };
  const handleClickButton = () => {
    modifyValue && modifyValue(time);
    closeBottomSheet && closeBottomSheet();
  };

  return isOpen ? (
    //지영's Bottom Sheet로 대체
    <div className={cx(timeBottomSheetStyles, className)}>
      <TimePicker
        placeholder="시간 설정"
        format="HH:mm"
        use12Hours
        autoFocus
        showNow={false}
        size="large"
        placement="bottomLeft"
        needConfirm={false}
        inputReadOnly
        onChange={handleTimeChange}
        className={css({ width: '100%' })}
      />
      <button className={buttonStyles} onClick={handleClickButton}>
        확인
      </button>
    </div>
  ) : null;
}

const timeBottomSheetStyles = css({
  position: 'fixed',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-around',
  backgroundColor: 'white',
  bottom: 0,
  left: 0,
  width: '100%',
  height: '400px',
  border: '1.5px solid',
  padding: '10px 15px',
});

const buttonStyles = css({
  width: '100px',
  height: '40px',
  backgroundColor: 'skyblue',
  borderRadius: '4px',
});
