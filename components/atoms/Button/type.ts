export type ButtonProps = {
  size: 'large' | 'medium' | 'small';
  disabled?: boolean;
  label: string;
  leftIcon?: boolean;
  rightIcon?: boolean;
  interaction: 'normal' | 'hovered' | 'focused' | 'pressed';
  variant?: 'solid' | 'outlined';
  type?: 'primary' | 'secondary' | 'assistive';
};

export interface ButtonPropsWithIcons extends ButtonProps {
  leftIconSrc?: string;
  rightIconSrc?: string;
}
