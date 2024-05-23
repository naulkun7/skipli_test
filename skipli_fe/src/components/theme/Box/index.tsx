import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Box = ({ children, className }: Props) => {
  return (
    <div
      className={twMerge("bg-neutral-200 rounded-xl h-full w-full", className)}
    >
      {children}
    </div>
  );
};

export default Box;
