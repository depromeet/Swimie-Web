'use client';

import { useQueryClient } from '@tanstack/react-query';
import { Radio, RadioChangeEvent } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button } from '@/components/atoms';
import { css, cva } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

import { ListItem, SettingDistanceIcon } from '../atom';

type SettingCalendarProps = {
  goal: number;
  selectedDistance: number | null;
  onDistanceChange: (distance: number) => void;
};

type DayType = '월' | '화' | '수' | '목' | '금' | 'empty';

export function SettingCalendar({
  goal,
  selectedDistance,
  onDistanceChange,
}: SettingCalendarProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [calculatedGoal, setCalculatedGoal] = useState(goal * 0.8);

  useEffect(() => {
    if (selectedDistance !== null) {
      setCalculatedGoal(selectedDistance * 0.8);
    }
  }, [selectedDistance]);

  const handleDistanceChange = (e: RadioChangeEvent) => {
    const selectedValue = Number(e.target.value);
    onDistanceChange(selectedValue);
  };

  const handleListItemClick = (value: number) => {
    onDistanceChange(value);
  };

  const dayKo: DayType[] = ['empty', '월', '화', '수', '목', '금', 'empty'];
  const dayNum = ['0', '1', '2', '3', '4', '5', '6'];

  const getNumStyle = (num: string) => {
    if (num === '0' || num === '6') {
      return { opacity: '0' };
    }
    if (num === '1' || num === '5') {
      return { opacity: '0.2' };
    }
    if (num === '2' || num === '4') {
      return { opacity: '0.5' };
    }

    return { opacity: 'inherit' };
  };

  const handleChangeGoal = async () => {
    if (selectedDistance === null) return;

    try {
      const response = await fetch('/api/goal', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ goal: selectedDistance }),
      });

      if (response.ok) {
        void queryClient.refetchQueries({ queryKey: ['currentMember'] });
        router.push('/setting');
      } else {
        console.error('Failed to update goal');
      }
    } catch (error) {
      console.error('Error updating goal:', error);
    }
  };

  // TODO: 추후 캘린더와 라디오 태그 분리 예정
  return (
    <div className={pageContainer}>
      <div className={contentContainer}>
        <div className={distanceContainer}>
          <div className={backgroundContainer}>
            <div className={dayContainer}>
              <div className={dayKoStyles}>
                {dayKo.map((day, index) => (
                  <div key={index} className={dayStyles({ day })}>
                    {day === 'empty' ? '' : day}
                  </div>
                ))}
              </div>
              <div className={numContainer}>
                <div className={dayNumStyles}>
                  {dayNum.map((num, index) => (
                    <div
                      className={numStyles}
                      style={getNumStyle(num)}
                      key={index}
                    >
                      {num}
                    </div>
                  ))}
                </div>
                <div className={imgContainer}>
                  <SettingDistanceIcon />
                </div>
              </div>
            </div>
            <div>
              하루에{' '}
              <span className={goalStyles}>
                {calculatedGoal.toLocaleString()}m{' '}
              </span>
              수영하면 이만큼 표시돼요
            </div>
          </div>
        </div>
        <Radio.Group
          onChange={handleDistanceChange}
          value={selectedDistance}
          className={listItemWrapperStyles}
        >
          <ListItem text="1,000m" onClick={() => handleListItemClick(1000)}>
            <Radio value={1000} />
          </ListItem>
          <ListItem text="3,000m" onClick={() => handleListItemClick(3000)}>
            <Radio value={3000} />
          </ListItem>
          <ListItem text="5,000m" onClick={() => handleListItemClick(5000)}>
            <Radio value={5000} />
          </ListItem>
        </Radio.Group>
      </div>
      {selectedDistance !== goal && (
        <div className={buttonWrapper}>
          <Button
            label="저장하기"
            buttonType="primary"
            variant="solid"
            size="large"
            className={buttonContainer}
            onClick={() => {
              void handleChangeGoal();
            }}
          />
        </div>
      )}
    </div>
  );
}

const pageContainer = flex({
  flexDirection: 'column',
  height: 'calc(100vh - 48px)',
});

const contentContainer = css({
  flex: 1,
  overflowY: 'auto',
});

const buttonWrapper = css({
  position: 'sticky',
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: 'white',
  padding: '20px',
});

const buttonContainer = css({
  width: '100%',
});

const distanceContainer = flex({
  padding: '16px 20px',
  direction: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

const backgroundContainer = flex({
  backgroundColor: 'background.gray',
  borderRadius: '12px',
  padding: '24px 0px',
  direction: 'column',
  alignItems: 'center',
  gap: '20px',
  alignSelf: 'stretch',
});

const dayContainer = flex({
  direction: 'column',
  alignItems: 'flex-start',
  gap: '8px',
  alignSelf: 'stretch',
});

const dayKoStyles = flex({
  height: '30px',
  alignItems: 'center',
  gap: '3px',
  alignSelf: 'stretch',
});

const dayNumStyles = flex({
  height: '30px',
  alignItems: 'center',
  gap: '3px',
  alignSelf: 'stretch',
});

const dayStyles = cva({
  base: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flex: '1 0 0',
    alignSelf: 'stretch',
    textAlign: 'center',
    color: 'text.placeHolder',
    textStyle: 'label2',
  },
  variants: {
    day: {
      월: { opacity: '0.2' },
      금: { opacity: '0.2' },
      수: { opacity: 'inherit' },
      화: { opacity: '0.5' },
      목: { opacity: '0.5' },
      empty: { opacity: 'inherit' },
    },
  },
  defaultVariants: {
    day: 'empty',
  },
});

const listItemWrapperStyles = flex({
  padding: '16px 0px',
  direction: 'column',
  alignItems: 'flex-start',
  width: '100%',
  cursor: 'pointer',
});

const numContainer = flex({
  direction: 'column',
  alignItems: 'center',
  gap: '5px',
  flex: '1 0 0',
  alignSelf: 'stretch',
});

const numStyles = flex({
  direction: 'column',
  justifyContent: 'center',
  alignSelf: 'stretch',
  textAlign: 'center',
  color: 'text.placeHolder',
  textStyle: 'label2',
  margin: '0 auto',
});

const imgContainer = flex({
  justifyContent: 'center',
  alignItems: 'flex-start',
  gap: '3px',
  alignSelf: 'stretch',
});

const goalStyles = css({
  color: 'primary.swim.총거리.default',
  fontWeight: '500',
});
