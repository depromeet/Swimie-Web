export interface BottomSheetProps<T> {
  isOpen: boolean;
  modifyValue?: (value: T) => void;
  closeBottomSheet?: () => void;
  addStyles?: object;
}
