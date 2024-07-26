import { SelectElement } from '../atoms';

type optionType = {
  index: number;
  label: string;
};

export interface SelectListProps {
  value: string;
  options: optionType[];
  listClassName?: string;
  className?: string;
  listElementClassName?: string;
  closeWrapper?: () => void;
  onChangeValue?: (value: string) => void;
}

/**
 * @param value 현재 value
 * @param options 선택 options
 * @className 외부 스타일 주입
 * @listElementClassName 선택 요소 외부 스타일 주입
 * @closeWrapper Wrapper 컴포넌트를 닫는 function
 * @onChangeValue 현재 value를 변경하는 함수
 */
export function SelectList({
  value,
  options,
  className,
  listElementClassName,
  closeWrapper,
  onChangeValue,
}: SelectListProps) {
  return (
    <ul className={className}>
      {options.map((option) => (
        <SelectElement
          key={option.index}
          isSelected={value === option.label}
          label={option.label}
          className={listElementClassName}
          closeWrapper={closeWrapper}
          onChangeValue={onChangeValue}
        />
      ))}
    </ul>
  );
}
