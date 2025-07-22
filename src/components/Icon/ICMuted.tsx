const ICMuted = ({ ...props }: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      {...props}
    >
      <path
        stroke="#E3E3E3"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M11 5 6 9H2v6h4l5 4V5ZM23 9l-6 6M17 9l6 6"
      ></path>
    </svg>
  );
};

export default ICMuted;
