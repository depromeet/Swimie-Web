import { css } from '@/styled-system/css';

const spinAnimation = css({
  animation: 'spin 1s linear infinite',
});

export function LoadingButtonIcon() {
  return (
    <svg
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={spinAnimation}
    >
      <mask
        id="mask0_18350_10256"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="21"
        height="20"
      >
        <path
          d="M16.8841 4.64328C18.3047 6.33634 18.9946 8.52441 18.802 10.7261C18.6094 12.9279 17.55 14.9629 15.8569 16.3835C14.1639 17.8042 11.9758 18.4941 9.77405 18.3015C7.57232 18.1088 5.53728 17.0495 4.11663 15.3564L5.39522 14.2835C6.53133 15.6375 8.15877 16.4847 9.91952 16.6387C11.6803 16.7928 13.4301 16.2411 14.7841 15.105C16.138 13.9688 16.9852 12.3414 17.1393 10.5807C17.2933 8.81992 16.7416 7.0701 15.6055 5.71614L16.8841 4.64328Z"
          fill="white"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.5004 18.3332C15.1027 18.3332 18.8337 14.6022 18.8337 9.99984C18.8337 5.39746 15.1027 1.6665 10.5004 1.6665C5.89797 1.6665 2.16699 5.39746 2.16699 9.99984C2.16699 14.6022 5.89797 18.3332 10.5004 18.3332ZM10.5004 16.6665C14.1823 16.6665 17.167 13.6817 17.167 9.99984C17.167 6.31794 14.1823 3.33317 10.5004 3.33317C6.81844 3.33317 3.83366 6.31794 3.83366 9.99984C3.83366 13.6817 6.81844 16.6665 10.5004 16.6665Z"
          fill="white"
          fillOpacity="0.25"
        />
      </mask>
      <g mask="url(#mask0_18350_10256)">
        <rect x="0.5" width="20" height="20" fill="white" />
      </g>
    </svg>
  );
}
