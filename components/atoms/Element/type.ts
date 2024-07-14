import { SelectListProps } from '@/components/molecules/List';

export interface SelectElementProps
  extends Pick<SelectListProps, 'value' | 'addStyles' | 'onSelect'> {
  value: number;
  isSelected: boolean;
  label: string;
}
