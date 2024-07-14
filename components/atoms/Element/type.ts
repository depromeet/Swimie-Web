import { SelectListProps } from '@/components/molecules/List';

export interface SelectElementProps
  extends Pick<SelectListProps, 'value' | 'onSelect'> {
  isSelected: boolean;
  label: string;
  addStyles?: string;
}
