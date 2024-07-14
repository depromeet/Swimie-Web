'use client';

import { useState } from 'react';

import { DropDown } from '@/components/atoms/DropDown/drop-down';
import { SelectTextField } from '@/components/molecules';
import { css } from '@/styled-system/css';

import { railLengthOptions } from '../RecordBottomSheet';
import { UseRecordForm } from './useRecordForm';

interface RecordFormProps {
  addStyles?: object;
}

export function RecordForm({ addStyles }: RecordFormProps) {
  const { recordInfo, handlers } = UseRecordForm('2024년 7월 -일');
  const [railLengthDropDownOpen, setRailLengthDropDownOpen] = useState(false);
  const handleChangeRailLengthClick = () => {
    setRailLengthDropDownOpen((prev) => !prev);
  };
  return (
    <form className={css(addStyles)}>
      <SelectTextField
        isRequired
        value={recordInfo.date}
        label="수영 날짜"
        addWrapperStyles={css.raw({ marginBottom: '24px' })}
      />
      <div className={css(timeTextFieldLayoutStyles)}>
        <SelectTextField
          isRequired
          value={recordInfo.startTime}
          label="수영 시간"
          addWrapperStyles={timeTextFieldStyles}
        />
        <span className={css({ fontSize: '30px' })}>-</span>
        <SelectTextField
          isRequired
          value={recordInfo.startTime}
          label="수영 시간"
          addWrapperStyles={timeTextFieldStyles}
        />
      </div>
      <SelectTextField
        value={recordInfo.pool}
        placeholder="(선택)"
        label="수영장"
        addWrapperStyles={css.raw({ marginBottom: '24px' })}
      />
      <SelectTextField
        value={railLengthOptions[recordInfo.railLengthOption].label}
        label="레일 길이"
        addWrapperStyles={css.raw({ marginBottom: '24px' })}
        onClick={handleChangeRailLengthClick}
      />
      {railLengthDropDownOpen && (
        <DropDown
          options={railLengthOptions}
          value={recordInfo.railLengthOption}
          onSelect={handlers.changeRailLength}
        />
      )}
      <SelectTextField
        value={recordInfo.distance}
        placeholder="거리입력(선택)"
        label="수영 거리"
        hasDownArrow={false}
        addWrapperStyles={css.raw({ marginBottom: '24px' })}
      />
    </form>
  );
}

const timeTextFieldLayoutStyles = css.raw({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const timeTextFieldStyles = css.raw({
  width: '42%',
  marginBottom: '24px',
});
