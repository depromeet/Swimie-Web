import { DropDownProps } from '../drop-down';

export interface SelectListProps
  extends Omit<DropDownProps, 'addStyles' | 'addListStyles'> {
  className?: string;
  listElementClassName?: string;
  closeWrapper?: () => void;
}
