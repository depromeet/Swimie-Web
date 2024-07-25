import { ReactNode } from 'react';

type TabVariant = 'fill' | 'fit-content';
type TabType = 'primary' | 'secondary' | 'assistive';

export interface TabItemProps {
  selected: boolean;
  text: string;
  onClick: () => void;
  variant?: TabVariant;
  type?: TabType;
}

export interface TabProps {
  variant?: TabVariant;
  type?: TabType;
  children?: ReactNode;
  className?: string;
}
