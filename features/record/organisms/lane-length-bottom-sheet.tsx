import { useAtom } from 'jotai';
import { useFormContext } from 'react-hook-form';

import { BottomSheet } from '@/components/molecules';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

import { SelectList } from '../molecules';
import { isLaneLengthBottomSheetOpen } from '../store';

interface LaneLengthBottomSheetProps {
  title: string;
}

export function LaneLengthBottomSheet({ title }: LaneLengthBottomSheetProps) {
  const laneOptions = ['25m', '50m'];
  const { getValues, setValue } = useFormContext();
  const [isOpen, setIsOpen] = useAtom(isLaneLengthBottomSheetOpen);

  const handleSelectLaneLength = (value: string) => {
    setValue('lane', value);
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <div className={layout.bottomSheetStyles}>
        {/* Title 컴포넌트로 대체 */}
        <h1 className={titleStyles}>{title}</h1>
        <SelectList
          value={getValues('lane') as string}
          options={laneOptions}
          closeWrapper={() => setIsOpen(false)}
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
    padding: '40px 20px',
  }),
  listElement: flex({
    position: 'relative',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 0',
    marginBottom: '8px',
  }),
};

const titleStyles = css({
  marginBottom: '24px',
});
