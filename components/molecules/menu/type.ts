import { ReactNode } from 'react';

export interface MenuItemProps {
  icon?: ReactNode;
  label: string;
  onClick: () => void;
}
