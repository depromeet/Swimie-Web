export const DefaultProfileIcon = ({
  width,
  height,
}: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_322_15396)">
        <rect width="40" height="40" rx="20" fill="white" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M39.9991 19.9994C39.9991 31.0451 31.0448 39.9994 19.9992 39.9994C8.95354 39.9994 -0.000732422 31.0451 -0.000732422 19.9994C-0.000732422 8.95369 8.95354 -0.000610352 19.9992 -0.000610352C31.0448 -0.000610352 39.9991 8.95369 39.9991 19.9994ZM19.999 19.9996C23.6808 19.9996 26.6656 17.0149 26.6656 13.333C26.6656 9.65106 23.6808 6.66629 19.999 6.66629C16.3171 6.66629 13.3323 9.65106 13.3323 13.333C13.3323 17.0149 16.3171 19.9996 19.999 19.9996ZM19.9993 23.3325C14.5493 23.3325 9.73268 25.9575 6.69102 29.9992C9.73268 34.0408 14.5577 36.6658 19.9993 36.6658C25.4409 36.6658 30.2659 34.0408 33.3076 29.9992C30.2659 25.9575 25.4409 23.3325 19.9993 23.3325Z"
          fill="#70737C"
          fillOpacity="0.16"
        />
      </g>
      <defs>
        <clipPath id="clip0_322_15396">
          <rect width={width} height={height} rx="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
