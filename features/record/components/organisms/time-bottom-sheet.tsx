'use client';

import dayjs from 'dayjs';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Picker from 'react-mobile-picker';

import { Button } from '@/components/atoms';
import { BottomSheet } from '@/components/molecules';
import { usePreventBodyScroll } from '@/hooks';
import { css } from '@/styled-system/css';

import { timeBottomSheetState } from '../../store';

export function TimeBottomSheet() {
  const { setValue } = useFormContext();
  const [timeBottmSheetState, setTimeBottmSheetState] =
    useAtom(timeBottomSheetState);

  usePreventBodyScroll({ isOpen: timeBottmSheetState.isOpen });

  const handleTimeChange = (date: dayjs.Dayjs) => {
    setTimeBottmSheetState((prev) => ({ ...prev, time: date.format('HH:mm') }));
  };
  console.log(handleTimeChange);
  const handleDoneButtonClick = () => {
    if (timeBottmSheetState.variant === 'start')
      setValue('startTime', timeBottmSheetState.time);
    else if (timeBottmSheetState.variant === 'end')
      setValue('endTime', timeBottmSheetState.time);
    setTimeBottmSheetState((prev) => ({ ...prev, isOpen: false }));
  };

  const selections = {
    ampm: ['오전', '오후'],
    hour: [
      '01',
      '02',
      '03',
      '04',
      '05',
      '06',
      '07',
      '08',
      '09',
      '10',
      '11',
      '12',
    ],
    minute: [
      '00',
      '05',
      '10',
      '15',
      '20',
      '25',
      '30',
      '35',
      '40',
      '45',
      '50',
      '55',
    ],
  };

  const [pickerValue, setPickerValue] = useState({
    ampm: '오후',
    hour: '02',
    minute: '05',
  });

  return (
    <BottomSheet
      isOpen={timeBottmSheetState.isOpen}
      onClose={() =>
        setTimeBottmSheetState((prev) => ({ ...prev, isOpen: false }))
      }
      header={{
        title:
          timeBottmSheetState.variant === 'start' ? '시작 시간' : '종료 시간',
      }}
      isRenderHandlebar
    >
      <div className={css({ padding: '0 20px' })}>
        <Picker
          value={pickerValue}
          onChange={setPickerValue}
          wheelMode="natural"
          height={120}
          itemHeight={34}
          className={layoutStyles.picker}
        >
          {Object.keys(selections).map((name) => (
            <Picker.Column key={name} name={name}>
              {selections[name as keyof typeof selections].map((option) => (
                <Picker.Item key={option} value={option}>
                  {({ selected }) => (
                    <span
                      className={css({
                        color: selected ? 'text.normal' : 'text.alternative',
                      })}
                    >
                      {option}
                    </span>
                  )}
                </Picker.Item>
              ))}
            </Picker.Column>
          ))}
        </Picker>
      </div>

      <div className={layoutStyles.button}>
        <Button
          buttonType="primary"
          variant="solid"
          size="large"
          label="완료"
          interaction="normal"
          onClick={handleDoneButtonClick}
          className={css({ w: 'full' })}
        />
      </div>
    </BottomSheet>
  );
}

const layoutStyles = {
  button: css({
    w: 'full',
    position: 'absolute',
    bottom: '15px',
    left: 0,
    padding: '0 20px',
  }),
  picker: css({
    marginBottom: '50px',
    marginTop: '10px',
    textStyle: 'heading3',
    fontWeight: 500,
  }),
};
