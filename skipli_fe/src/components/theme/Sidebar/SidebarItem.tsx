import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";
import { Link } from "react-router-dom";

type Props = {
  icon?: IconType;
  label: string;
  active?: boolean;
  href: string;
};

const SidebarItem = ({ icon: Icon, label, active, href }: Props) => {
  return (
    <Link
      to={href}
      className={twMerge(
        "flex flex-row h-auto items-center w-full gap-x-4 text-xl font-medium cursor-pointer text-black py-4 px-2",
        active && "bg-neutral-400 rounded-lg px-2",
      )}
    >
      {Icon && <Icon size={24} />}
      <p className="truncate w-full">{label}</p>
    </Link>
  );
};

export default SidebarItem;
