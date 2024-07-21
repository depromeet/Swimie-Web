export interface BottomSheetProps<T, K = unknown> {
  isOpen: boolean;
  modifyValue?: (value: T, value2?: K) => void;
  closeBottomSheet?: () => void;
  className?: string;
}

export interface PoolSearchBottomSheetProps
  extends BottomSheetProps<string, number> {
  title: string;
  placeholder: string;
}

export interface RailLengthBottomSheetProps extends BottomSheetProps<number> {
  title: string;
  value: number;
}
