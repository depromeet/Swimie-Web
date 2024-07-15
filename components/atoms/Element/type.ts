import { SelectListProps } from '@/components/molecules/List';

export interface SelectElementProps
  extends Pick<SelectListProps, 'value' | 'onSelect' | 'closeWrapper'> {
  isSelected: boolean;
  label: string;
  addStyles?: object;
}
