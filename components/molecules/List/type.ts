import { DropDownProps } from '../DropDown';

export interface SelectListProps
  extends Omit<DropDownProps, 'addStyles' | 'addListStyles'> {
  className?: string;
  listElementClassName?: string;
  closeWrapper?: () => void;
}
