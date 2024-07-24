import { ReactNode } from 'react';

export interface HeaderBarProps {
  className?: string;
  arrowClassName?: string;
  onClickBackArrow?: () => void;
  children?: ReactNode;
  rightContent?: ReactNode;
}
