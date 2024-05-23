import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";
import { Link } from "react-router-dom";

type Props = {
  icon?: IconType;
  label: string;
  desc?: string;
  href: string;
  className?: string;
};

const Card = ({ icon: Icon, label, href, className, desc }: Props) => {
  return (
    <Link
      to={href}
      className={twMerge(
        "flex flex-row h-auto items-center w-2/3 gap-x-4 text-md font-medium cursor-pointer p-4 text-black border rounded-lg shadow-md hover:opacity-80 hover:shadow-2xl transition duration-300 ease-in-out",
        className,
      )}
    >
      {Icon && <Icon size={26} />}
      <div className="flex flex-col">
        <h1>{label}</h1>
        <p className="text-gray-500">{desc}</p>
      </div>
    </Link>
  );
};

export default Card;
