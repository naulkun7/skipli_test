import { useLocation } from "react-router-dom";

// Components
import Box from "../Box";
import SidebarItem from "./SidebarItem";

// React-icons
import { HiHome } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar = ({ children }: SidebarProps) => {
  const location = useLocation();

  const routes = [
    {
      icon: HiHome,
      label: "Services",
      href: "/services",
    },
    {
      icon: CgProfile,
      label: "Profile",
      href: "/profile",
    },
  ];

  return (
    <div className="flex h-full">
      <div className="flex flex-col gap-y-2 h-full w-1/4 p-2">
        <Box>
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {/* Logo */}
            <h1 className="text-4xl px-2 pb-6">Skipli AI</h1>

            {routes.map((item) => (
              <SidebarItem
                key={item.label}
                active={location.pathname === item.href}
                {...item}
              />
            ))}
          </div>
        </Box>
      </div>
      <main className="h-full flex-1 overflow-y-auto py-2">{children}</main>
    </div>
  );
};

export default Sidebar;
