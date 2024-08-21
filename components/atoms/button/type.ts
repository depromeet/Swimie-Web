import { ReactNode } from 'react';

export interface ButtonProps {
  disabled?: boolean;
  label: string;
  size?: 'large' | 'medium' | 'small';
  interaction?: 'normal' | 'hovered' | 'focused' | 'pressed';
  variant?: 'solid' | 'outlined' | 'text';
  buttonType?: 'primary' | 'secondary' | 'assistive';
  type?: 'button' | 'reset' | 'submit';
  leftIconSrc?: ReactNode;
  rightIconSrc?: ReactNode;
  onClick?: () => void;
  className?: string;
  isLoading?: boolean;
}
