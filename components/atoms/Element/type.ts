import { SelectListProps } from '@/components/molecules';

export interface SelectElementProps
  extends Pick<SelectListProps, 'value' | 'onSelect' | 'closeWrapper'> {
  isSelected: boolean;
  label: string;
  className?: string;
}
