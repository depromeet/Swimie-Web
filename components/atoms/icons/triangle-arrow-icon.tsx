interface TriangleArrowIconProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
}

export const TriangleArrowIcon = ({
  color = '#37383C',
  width,
  height,
  ...props
}: TriangleArrowIconProps) => {
  return (
    <svg
      {...props}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.98147 12.7602C6.51432 12.3611 6.51432 11.6389 6.98147 11.2398L13.3045 5.83663C13.9534 5.28207 14.9541 5.74323 14.9541 6.59687L14.9541 17.4031C14.9541 18.2568 13.9534 18.7179 13.3045 18.1634L6.98147 12.7602Z"
        fill={color}
        fillOpacity="0.16"
      />
    </svg>
  );
};
