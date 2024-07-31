'use client';

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

import { formSectionStyles } from '../../styles/form-section';
import { FormSectionProps } from '../../types/form-section';
import { EquipmentSelectBox } from '../molecules';
/**
 * @param title 장비 section의 제목
 */
export function EquipmentSection({ title }: FormSectionProps) {
  const equipmentList = ['숏핀', '롱핀', '패들', '스노쿨'];
  const { setValue } = useFormContext();
  const [equipmentSelectState, setEquipmentSelectState] = useState<boolean[]>(
    Array.from({ length: equipmentList.length }, () => false),
  );

  const handleSelectEquipment = (index: number) => {
    setEquipmentSelectState((prev) => {
      const copyPrev = [...prev];
      copyPrev[index] = !copyPrev[index];
      return copyPrev;
    });
    setValue('item', handleSelectedItem().join(','));
  };

  const handleSelectedItem = () => {
    const copyEquipmentList = [...equipmentList];
    copyEquipmentList.filter((_, i) => equipmentSelectState[i]);

    return copyEquipmentList;
  };

  return (
    <section className={formSectionStyles}>
      <h1 className={titleStyles}>{title}</h1>
      <div className={itemBoxStyles}>
        {/* //임시 디자인 */}
        {Array.from({ length: 4 }, (_, i) => (
          <EquipmentSelectBox
            key={i}
            index={i}
            isSelected={equipmentSelectState[i]}
            label={equipmentList[i]}
            onSelectEquipment={handleSelectEquipment}
          />
        ))}
      </div>
    </section>
  );
}

const titleStyles = css({
  textStyle: 'heading4',
  fontWeight: '600',
  marginBottom: '24px',
});

const itemBoxStyles = flex({
  justifyContent: 'space-between',
});
