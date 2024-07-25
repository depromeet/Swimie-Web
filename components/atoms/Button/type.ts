export type ButtonProps = {
  size: 'large' | 'medium' | 'small';
  disabled?: boolean;
  label: string;
  leftIcon?: boolean;
  rightIcon?: boolean;
  interaction: 'normal' | 'hovered' | 'focused' | 'pressed';
  variant?: 'solid' | 'outlined' | 'text';
  type?: 'primary' | 'secondary' | 'assistive';
  className?: string;
};

export interface ButtonPropsWithIcons extends ButtonProps {
  leftIconSrc?: string;
  rightIconSrc?: string;
  onClick?: () => void;
}
