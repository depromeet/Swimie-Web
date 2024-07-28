import { ReactNode } from 'react';

type JumpDirectionType = 'forward' | 'backward';

export interface PageModalProps {
  isOpen: boolean;
  jumpDirection: JumpDirectionType;
  children: ReactNode;
  className?: string;
}
