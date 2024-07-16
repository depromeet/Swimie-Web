export interface BottomSheetProps<T> {
  isOpen: boolean;
  modifyValue?: (value: T) => void;
  closeBottomSheet?: () => void;
  addStyles?: object;
}

export interface PoolSearchBottomSheetProps extends BottomSheetProps<string> {
  title: string;
  placeholder: string;
}

export interface RailLengthBottomSheetProps extends BottomSheetProps<number> {
  value: number;
}
