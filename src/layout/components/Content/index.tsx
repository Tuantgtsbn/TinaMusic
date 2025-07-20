import React from "react";
import clsx from "clsx";
const Content = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={clsx("w-full", className)}>{children}</div>;
};

export default Content;
