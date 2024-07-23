'use client';

import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';

import { BottomSheet } from '@/components/molecules';
import { css, cx } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

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
    closeBottomSheet();
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={closeBottomSheet}>
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
    </BottomSheet>
  );
}

const timeBottomSheetStyles = flex({
  direction: 'column',
  alignItems: 'center',
  justifyContent: 'space-around',
  backgroundColor: 'white',
  height: '400px',
  padding: '10px 15px',
});

const buttonStyles = css({
  width: '100px',
  height: '40px',
  backgroundColor: 'skyblue',
  borderRadius: '4px',
});
