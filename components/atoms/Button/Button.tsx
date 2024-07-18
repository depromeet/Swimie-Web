import Image from 'next/image';

import { css } from '@/styled-system/css';

import { ButtonPropsWithIcons } from './type';

const Button = ({
  size,
  disabled,
  leftIcon,
  rightIcon,
  leftIconSrc,
  rightIconSrc,
  label,
  variant = 'solid',
  type = 'primary',
}: ButtonPropsWithIcons) => {
  const buttonStyles = css({
    backgroundColor:
      variant === 'solid' ? (disabled ? 'fill.disable' : 'blue.60') : 'white',
    border:
      variant === 'solid'
        ? disabled
          ? 'none '
          : 'none'
        : type === 'primary'
          ? '1px solid'
          : type === 'secondary'
            ? '1px solid'
            : '1px solid',
    borderColor:
      variant === 'solid'
        ? disabled
          ? 'none '
          : 'none'
        : type === 'primary'
          ? '#3385FF'
          : type === 'secondary'
            ? '#70737C38'
            : '#70737C38',
    color:
      variant === 'solid'
        ? disabled
          ? 'text.placeHolder'
          : 'white'
        : type === 'primary'
          ? 'blue.60'
          : type === 'secondary'
            ? 'blue.60'
            : 'text.normal',
    width: size === 'large' ? '149px' : size === 'medium' ? '125px' : '102px',
    height: size === 'large' ? '48px' : size === 'medium' ? '40px' : '32px',
    padding:
      size === 'large'
        ? '12px 28px'
        : size === 'medium'
          ? '9px 20px'
          : '7px 14px',
    borderRadius: size === 'large' ? '10px' : size === 'small' ? '6px' : '4px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: leftIcon && rightIcon ? 'space-between' : 'center',
    cursor: disabled ? 'not-allowed' : 'pointer',
  });

  const iconSize = size === 'large' ? 20 : size === 'medium' ? 18 : 16;

  const iconWrapperStyles = css({
    width: `${iconSize}px`,
    height: `${iconSize}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 4px',
  });

  return (
    <button className={buttonStyles}>
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
