import { twMerge } from "tailwind-merge";

interface Props {
  children: React.ReactNode;
  title?: string;
  desc?: string;
  className?: string;
}

const PageLayout = ({ children, title, desc, className }: Props) => {
  return (
    <div
      className={twMerge(
        "flex flex-col h-full gap-4 py-16 px-10 w-2/3",
        className,
      )}
    >
      {title && <h1 className="text-2xl font-bold capitalize">{title}</h1>}
      {desc && <p className="text-lg text-gray-500 mb-4">{desc}</p>}
      {children}
    </div>
  );
};

export default PageLayout;
