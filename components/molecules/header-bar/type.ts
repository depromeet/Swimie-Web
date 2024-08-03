import { ReactNode } from 'react';

export interface HeaderBarProps {
  className?: string;
  backIconClassName?: string;
  onClickBack?: () => void;
  children?: ReactNode;
  rightContent?: ReactNode;
}
