import { DropDownProps } from '../DropDown';

export interface SelectListProps
  extends Omit<DropDownProps, 'addStyles' | 'addListStyles'> {
  addStyles?: object;
  addListElementStyles?: object;
  closeWrapper?: () => void;
}
