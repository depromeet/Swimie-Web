import { atom } from 'jotai';

type timeVariantType = 'start' | 'end';

interface timeBottomSheetStateProps {
  variant: timeVariantType;
  time: string;
  isOpen: boolean;
}

const initialTimeBottomSheetState: timeBottomSheetStateProps = {
  variant: 'start',
  time: '',
  isOpen: false,
};

/**
 * @description 레인 길이 선택 bottom-sheet open 상태 관리 atom
 */
export const isLaneLengthBottomSheetOpen = atom<boolean>(false);
export const timeBottomSheetState = atom<timeBottomSheetStateProps>(
  initialTimeBottomSheetState,
);
