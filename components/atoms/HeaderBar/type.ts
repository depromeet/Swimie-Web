import { ReactNode } from 'react';

export interface HeaderBarProps {
  className?: string;
  arrowClassName?: string;
  backArrowClick?: () => void;
  children?: ReactNode;
}
