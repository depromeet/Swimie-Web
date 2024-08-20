interface TriangleArrowIconReverseProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
}

export const TriangleArrowIconReverse = ({
  color = '#37383C',
  width,
  height,
  ...props
}: TriangleArrowIconReverseProps) => {
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
        d="M17.0185 11.2398C17.4857 11.6389 17.4857 12.3611 17.0185 12.7602L10.6955 18.1634C10.0466 18.7179 9.0459 18.2568 9.0459 17.4031L9.0459 6.59687C9.0459 5.74323 10.0466 5.28207 10.6955 5.83663L17.0185 11.2398Z"
        fill={color}
        fillOpacity="0.16"
      />
    </svg>
  );
};
