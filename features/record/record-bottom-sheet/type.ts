export interface BottomSheetProps<T = unknown> {
  isOpen: boolean;
  closeBottomSheet: () => void;
  className?: string;
  modifyValue?: (value: T) => void;
}

// PoolSearchBottomSheetProps는 (value: { name: string; poolId: number }) 타입의 매개변수를 받는 modifyValue를 정의
export interface PoolSearchBottomSheetProps
  extends BottomSheetProps<{ name: string; poolId: number }> {
  title: string;
  placeholder: string;
}

// LaneLengthBottomSheetProps는 (value: number) 타입의 매개변수를 받는 modifyValue를 정의
export interface LaneLengthBottomSheetProps extends BottomSheetProps<number> {
  title: string;
  value: number;
}
