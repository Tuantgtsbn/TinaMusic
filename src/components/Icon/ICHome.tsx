const ICHome = ({...props}: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M11.25 17.107h1.5v-4.91h-1.5v4.91ZM12 2.006.876 11.538l.977 1.139 1.74-1.491v10.808H20.41V11.188l1.737 1.489.977-1.14L12 2.007Z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default ICHome;
