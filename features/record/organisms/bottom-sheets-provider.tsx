import { Portal } from '@/components/atoms';

import { LaneLengthBottomSheet } from './lane-length-bottom-sheet';

//수영 기록 form에 사용되는 Bottom-Sheet들
export default function BottomSheetsProvider() {
  return (
    <Portal>
      <LaneLengthBottomSheet title="레인 길이를 선택해주세요" />
    </Portal>
  );
}
