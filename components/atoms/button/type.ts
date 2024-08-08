export interface ButtonProps {
  disabled?: boolean;
  label: string;
  size?: 'large' | 'medium' | 'small';
  interaction?: 'normal' | 'hovered' | 'focused' | 'pressed';
  variant?: 'solid' | 'outlined' | 'text';
  buttonType?: 'primary' | 'secondary' | 'assistive';
  type?: 'button' | 'reset' | 'submit';
  leftIconSrc?: string;
  rightIconSrc?: string;
  onClick?: () => void;
  className?: string;
}
