export const DateLeftArrowIcon = (props?: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="10"
      height="15"
      viewBox="0 0 5 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5 1.41421L5 6.58579C5 7.47669 3.92286 7.92286 3.2929 7.2929L0.707106 4.70711C0.316582 4.31658 0.316582 3.68342 0.707106 3.29289L3.29289 0.707106C3.92286 0.0771417 5 0.523309 5 1.41421Z"
        fill={props?.fill ? props.fill : '#37383C'}
        fillOpacity="0.28"
      />
    </svg>
  );
};

export const DateRightArrowIcon = (props?: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="10"
      height="15"
      viewBox="0 0 5 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0 6.58579L0 1.41421C0 0.523309 1.07714 0.0771402 1.70711 0.707105L4.29289 3.29289C4.68342 3.68342 4.68342 4.31658 4.29289 4.70711L1.70711 7.29289C1.07714 7.92286 0 7.47669 0 6.58579Z"
        fill={props?.fill ? props.fill : '#37383C'}
        fillOpacity="0.28"
      />
    </svg>
  );
};
