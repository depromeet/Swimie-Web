'use client';

import { ConfigProvider, TimePicker } from 'antd';
import dayjs from 'dayjs';
import { useAtom } from 'jotai';
import { useFormContext } from 'react-hook-form';

import { Button } from '@/components/atoms';
import { BottomSheet } from '@/components/molecules';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

import UseGetBrowserWidth from '../../hooks/use-get-browser-width';
import { timeBottomSheetState } from '../../store';

export function TimeBottomSheet() {
  const { setValue } = useFormContext();
  const [timeBottmSheetState, setTimeBottmSheetState] =
    useAtom(timeBottomSheetState);
  const width = UseGetBrowserWidth();

  const handleTimeChange = (date: dayjs.Dayjs) => {
    setTimeBottmSheetState((prev) => ({ ...prev, time: date.format('HH:mm') }));
  };
  const handleDoneButtonClick = () => {
    if (timeBottmSheetState.variant === 'start')
      setValue('startTime', timeBottmSheetState.time);
    else if (timeBottmSheetState.variant === 'end')
      setValue('endTime', timeBottmSheetState.time);
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
      className={css({ overflow: 'auto' })}
    >
      <ConfigProvider
        theme={{
          components: {
            DatePicker: {
              timeCellHeight: 50,
              timeColumnWidth: (width - 40) / 3,
            },
          },
        }}
      >
        <div className={layout.bottomSheet}>
          <TimePicker
            placeholder="시간 설정"
            format="HH:mm"
            use12Hours
            showNow={false}
            size="large"
            placement="bottomRight"
            needConfirm={false}
            inputReadOnly
            onChange={handleTimeChange}
            className={css({ width: '100%' })}
          />
          <div className={layout.button}>
            <Button
              size="large"
              label="완료"
              interaction="normal"
              onClick={handleDoneButtonClick}
              className={css({ w: 'full' })}
            />
          </div>
        </div>
      </ConfigProvider>
    </BottomSheet>
  );
}

const layout = {
  bottomSheet: flex({
    direction: 'column',
    backgroundColor: 'white',
    width: 'full',
    height: '327px',
    padding: '10px 15px',
  }),
  button: css({
    w: 'full',
    position: 'absolute',
    bottom: '15px',
    left: 0,
    padding: '0 20px',
  }),
};
