'use client';

import { useAtom, useAtomValue } from 'jotai';
import { useFormContext, useWatch } from 'react-hook-form';

import { BottomSheet } from '@/components/molecules';
import { flex } from '@/styled-system/patterns';

import { laneOptions } from '../../constants';
import { isLaneLengthBottomSheetOpen } from '../../store';
import { formSubInfoState } from '../../store/form-sub-info';
import { SelectList } from '../molecules';

interface LaneLengthBottomSheetProps {
  title: string;
}

/**
 * @param title 레인 길이 선택 bottom-sheet 제목
 */
export function LaneLengthBottomSheet({ title }: LaneLengthBottomSheetProps) {
  const { getValues, setValue, control } = useFormContext();
  const [isOpen, setIsOpen] = useAtom(isLaneLengthBottomSheetOpen);
  const formSubInfo = useAtomValue(formSubInfoState);

  const totalDistance = useWatch({
    control,
    name: 'totalDistance',
  }) as string;

  const handleSelectLaneLength = (value: string) => {
    if (formSubInfo.isDistanceLapModified && value === laneOptions[0].label)
      setValue('totalDistance', Number(totalDistance?.slice(0, -1)) / 2 + 'm');
    else if (
      formSubInfo.isDistanceLapModified &&
      value === laneOptions[1].label
    )
      setValue('totalDistance', Number(totalDistance?.slice(0, -1)) * 2 + 'm');
    setValue('laneMeter', value);
    setValue('lane', Number(value.slice(0, -1)));
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      header={{ title }}
      isRenderHandlebar
    >
      <div className={layout.bottomSheetStyles}>
        {/* Title 컴포넌트로 대체 */}
        <SelectList
          value={getValues('lane') + 'm'}
          options={laneOptions}
          onCloseWrapper={() => setIsOpen(false)}
          listElementClassName={layout.listElement}
          onChangeValue={handleSelectLaneLength}
        />
      </div>
    </BottomSheet>
  );
}

const layout = {
  bottomSheetStyles: flex({
    w: 'full',
    direction: 'column',
    padding: '24px 20px',
  }),
  listElement: flex({
    position: 'relative',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 0',
    marginBottom: '8px',
  }),
};
