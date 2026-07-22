import { LayoutDashboard, MessageCircle, Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeProvider";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const { theme, toggleTheme } = useTheme();

  const links = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Contact",
      icon: MessageCircle,
    },
  ];
  return (
    <aside className="group fixed top-0 left-0 z-35 flex flex-col w-16 hover:w-48 h-screen bg-blue-100 hover:bg-blue-950 hover:text-white dark:bg-gray-800 dark:text-white dark:hover:bg-gray-900 transition-all duration-300 pb-4">
      <div className="mt-20 flex-1 min-h-0">
        <ul>
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                to={`/${link.label}`}
                key={link.label}
                className={({ isActive }) =>
                  `flex items-center gap-3 m-0.5 px-4 py-2 rounded-lg font-bold transition-colors ${
                    isActive
                      ? "bg-blue-200 text-gray-900" 
                      : "bg-transparent hover:text-gray-900 hover:bg-blue-100 dark:text-gray-200 dark:hover:bg-gray-800" 
                  }`
                }
              >
                <Icon size={20} className="shrink-0" />
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-100">
                  {link.label}
                </span>
              </NavLink>
            );
          })}
        </ul>
      </div>

      <div className="flex items-center px-3">
        <button
          onClick={toggleTheme}
          className="p-2 border-2 rounded-2xl cursor-pointer shrink-0"
        >
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        <span className="ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-sm font-semibold">
          Change Theme
        </span>
      </div>
    </aside>    
  );
};

export default NavBar;
