const ICShare = ({ ...props }: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 22 22"
      fill="none"
      {...props}
    >
      <path
        stroke="#E3E3E3"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="m11.366 3.3 8.25 7.615-8.25 7.193v-4.654c-6.417 0-9.167 6.346-9.167 6.346 0-7.193 2.292-11.846 9.167-11.846V3.3Z"
      ></path>
    </svg>
  );
};

export default ICShare;
