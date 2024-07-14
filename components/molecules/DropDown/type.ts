export interface DropDownProps {
  options: { value: number; label: string }[];
  value: number;
  addStyles?: object;
  addListStyles?: object;
  addListElementStyles?: object;
  onSelect?: (value: number) => void;
}
