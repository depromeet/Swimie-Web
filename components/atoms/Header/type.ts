import { ReactNode } from 'react';

export interface HeaderBarProps {
  className?: string;
  children?: ReactNode;
  backArrowClick?: () => void;
}
