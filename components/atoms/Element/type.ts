import { SelectListProps } from '@/components/molecules/list';

export interface SelectElementProps
  extends Pick<SelectListProps, 'value' | 'onSelect' | 'closeWrapper'> {
  isSelected: boolean;
  label: string;
  className?: string;
}
