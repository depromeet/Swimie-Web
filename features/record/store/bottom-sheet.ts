import { atom } from 'jotai';

type TimeVariantType = 'start' | 'end';

interface TimeBottomSheetStateProps {
  variant: TimeVariantType;
  time: string;
  isOpen: boolean;
}

const initialTimeBottomSheetState: TimeBottomSheetStateProps = {
  variant: 'start',
  time: '',
  isOpen: false,
};

/**
 * @description 레인 길이 선택 bottom-sheet open 상태 관리 atom
 */
export const isLaneLengthBottomSheetOpen = atom<boolean>(false);
export const timeBottomSheetState = atom<TimeBottomSheetStateProps>(
  initialTimeBottomSheetState,
);
