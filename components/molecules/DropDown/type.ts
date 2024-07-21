export interface DropDownProps {
  options: { value: number; label: string }[];
  value: number;
  className?: string;
  listClassName?: string;
  listElementClassName?: string;
  onSelect?: (value: number) => void;
}
