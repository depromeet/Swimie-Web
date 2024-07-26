import { CheckIcon } from '@/components/atoms';
import { css } from '@/styled-system/css';

import { SelectListProps } from '../molecules';

export interface SelectElementProps
  extends Pick<SelectListProps, 'closeWrapper' | 'onChangeValue'> {
  isSelected: boolean;
  label: string;
  className?: string;
}

/**
 * @param isSelected 해당 요소가 선택되었는지 여부
 * @param label 요소의 label값
 * @param className 각 요소의 외부 스타일 주입
 * @closeWrapper Wrapper 컴포넌트를 닫는 function
 * @onChangeValue 현재 value를 변경하는 함수
 */
export function SelectElement({
  isSelected,
  label,
  className,
  closeWrapper,
  onChangeValue,
}: SelectElementProps) {
  const handleListElementClick = () => {
    onChangeValue?.(label);
    closeWrapper?.();
  };
  return (
    <li className={className} onClick={handleListElementClick}>
      <span>{label}</span>
      <div className={selectedIconStyles}>{isSelected && <CheckIcon />}</div>
    </li>
  );
}

const selectedIconStyles = css({
  position: 'absolute',
  right: 0,
});
