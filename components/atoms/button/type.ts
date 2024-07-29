export interface ButtonProps {
  size: 'large' | 'medium' | 'small';
  disabled?: boolean;
  label: string;
  interaction: 'normal' | 'hovered' | 'focused' | 'pressed';
  variant?: 'solid' | 'outlined' | 'text';
  type?: 'primary' | 'secondary' | 'assistive';
  leftIconSrc?: string;
  rightIconSrc?: string;
  onClick?: () => void;
  className?: string;
}
