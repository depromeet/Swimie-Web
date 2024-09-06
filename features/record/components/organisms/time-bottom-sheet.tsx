'use client';

import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Picker from 'react-mobile-picker';

import { Button } from '@/components/atoms';
import { BottomSheet } from '@/components/molecules';
import { usePreventBodyScroll } from '@/hooks';
import { css } from '@/styled-system/css';

import { defaultPickerValue, timeOptions } from '../../constants';
import { timeBottomSheetState } from '../../store';
import { AmpmType, HourType, MinuteType } from '../../types';
import {
  addMinutes,
  convertTo24HourFormat,
  convertToPickerValue,
} from '../../utils';

interface TimeBottomSheetProps {
  prevSwimStartTime?: string;
  prevSwimEndTime?: string;
}

export function TimeBottomSheet({
  prevSwimStartTime,
  prevSwimEndTime,
}: TimeBottomSheetProps) {
  const { getValues, setValue } = useFormContext();
  const [timeBottmSheetState, setTimeBottmSheetState] =
    useAtom(timeBottomSheetState);

  const [pickerValue, setPickerValue] = useState<{
    ampm: AmpmType;
    hour: HourType;
    minute: MinuteType;
  }>(defaultPickerValue);

  useEffect(() => {
    if (timeBottmSheetState.variant === 'start')
      setPickerValue(convertToPickerValue(prevSwimStartTime));
    if (timeBottmSheetState.variant === 'end')
      setPickerValue(convertToPickerValue(prevSwimEndTime));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeBottmSheetState.variant]);

  usePreventBodyScroll({ isOpen: timeBottmSheetState.isOpen });

  const handleDoneButtonClick = () => {
    if (timeBottmSheetState.variant === 'start') {
      setValue('startTime', convertTo24HourFormat(pickerValue));
      if (!getValues('endTime'))
        setValue('endTime', addMinutes(pickerValue, 50));
    } else if (timeBottmSheetState.variant === 'end') {
      setValue('endTime', convertTo24HourFormat(pickerValue));
    }
    setTimeBottmSheetState((prev) => ({ ...prev, isOpen: false }));
  };

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
          {Object.keys(timeOptions).map((name) => (
            <Picker.Column key={name} name={name}>
              {timeOptions[name as keyof typeof timeOptions].map((option) => (
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
