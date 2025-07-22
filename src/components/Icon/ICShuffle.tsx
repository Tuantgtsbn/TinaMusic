const ICShuffle = ({ ...props }: React.SVGProps<SVGSVGElement>) => {
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
        strokeWidth="1.5"
        d="m18.834 20.389 3.167-3.167-3.167-3.166M18.834 3.5l3.167 3.167-3.167 3.166"
      ></path>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M22 6.667h-4.222a5.254 5.254 0 0 0-3.167 1.055M3 17.222h4.222a5.254 5.254 0 0 0 3.167-1.055M3 6.667h4.222a5.278 5.278 0 0 1 5.278 5.277 5.278 5.278 0 0 0 5.278 5.278H22"
      ></path>
    </svg>
  );
};

export default ICShuffle;
