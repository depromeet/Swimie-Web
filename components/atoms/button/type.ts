export interface ButtonProps {
  disabled?: boolean;
  label: string;
  size?: 'large' | 'medium' | 'small';
  interaction?: 'normal' | 'hovered' | 'focused' | 'pressed';
  variant?: 'solid' | 'outlined' | 'text';
  type?: 'primary' | 'secondary' | 'assistive';
  leftIconSrc?: string;
  rightIconSrc?: string;
  onClick?: () => void;
}
