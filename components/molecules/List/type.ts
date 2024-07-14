export interface SelectListProps {
  options: { value: number; label: string }[];
  value: number;
  addStyles?: object;
  addListElementStyles?: object;
  onSelect?: (value: number) => void;
}
