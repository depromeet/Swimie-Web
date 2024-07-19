import Image from 'next/image';

import { css } from '@/styled-system/css';

import { ButtonPropsWithIcons } from './type';

const Button = ({
  size = 'medium',
  disabled,
  leftIcon,
  rightIcon,
  leftIconSrc,
  rightIconSrc,
  label,
  variant = 'solid',
  type = 'primary',
}: ButtonPropsWithIcons) => {
  const sizeStyles = {
    large: {
      width: '149px',
      height: '48px',
      padding: '12px 28px',
      borderRadius: '10px',
      iconSize: 20,
    },
    medium: {
      width: '125px',
      height: '40px',
      padding: '9px 20px',
      borderRadius: '8px',
      iconSize: 18,
    },
    small: {
      width: '102px',
      height: '32px',
      padding: '7px 14px',
      borderRadius: '6px',
      iconSize: 16,
    },
  };

  const colorStyles = {
    solid: {
      backgroundColor: disabled ? 'fill.disable' : 'blue.60',
      color: disabled ? 'text.placeHolder' : 'white',
      border: 'none',
      borderColor: 'transparent',
    },
    outlined: {
      backgroundColor: 'white',
      border: '1px solid',
      borderColor: disabled
        ? 'line.normal'
        : type === 'primary' || type === 'secondary'
          ? 'blue.60'
          : 'line.normal',
      color: disabled
        ? 'text.placeHolder'
        : type === 'primary' || type === 'secondary'
          ? 'blue.60'
          : 'text.normal',
    },
    text: {
      backgroundColor: 'transparent',
      border: 'none',
      borderColor: 'transparent',
      color: disabled
        ? 'text.placeHolder'
        : type === 'primary' || type === 'secondary'
          ? 'blue.60'
          : 'text.alternative',
    },
  };

  const { width, height, padding, borderRadius, iconSize } = sizeStyles[size];
  const { backgroundColor, border, borderColor, color } = colorStyles[variant];

  const buttonStyles = css({
    backgroundColor,
    border,
    borderColor,
    color,
    width,
    height,
    padding,
    borderRadius,
    display: 'flex',
    alignItems: 'center',
    justifyContent: leftIcon && rightIcon ? 'space-between' : 'center',
    cursor: disabled ? 'not-allowed' : 'pointer',
    position: 'relative',
  });

  const iconWrapperStyles = css({
    width: `${iconSize}px`,
    height: `${iconSize}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 4px',
  });

  return (
    <button className={buttonStyles} disabled={disabled}>
      {leftIcon && leftIconSrc && (
        <div className={iconWrapperStyles}>
          <Image
            src={leftIconSrc}
            alt="left icon"
            width={iconSize}
            height={iconSize}
          />
        </div>
      )}
      {label}
      {rightIcon && rightIconSrc && (
        <div className={iconWrapperStyles}>
          <Image
            src={rightIconSrc}
            alt="right icon"
            width={iconSize}
            height={iconSize}
          />
        </div>
      )}
    </button>
  );
};

export default Button;
