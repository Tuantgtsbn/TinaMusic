const ICRepeat = ({ ...props }: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      {...props}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.412"
        d="m16.043 2 3.555 3.555-3.555 3.556"
      ></path>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.412"
        d="M3.6 10.888V9.111a3.555 3.555 0 0 1 3.555-3.556H19.6M7.155 21.555 3.6 18l3.555-3.556"
      ></path>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.412"
        d="M19.6 12.666v1.778a3.555 3.555 0 0 1-3.556 3.555H3.6"
      ></path>
    </svg>
  );
};

export default ICRepeat;
