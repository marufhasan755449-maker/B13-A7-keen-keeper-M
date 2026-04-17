import { NavLink } from "react-router-dom";
import { Home, Clock, BarChart2, Heart } from "lucide-react";

const links = [
  { to: "/",         label: "Home",     Icon: Home      },
  { to: "/timeline", label: "Timeline", Icon: Clock     },
  { to: "/stats",    label: "Stats",    Icon: BarChart2  },
];

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-[68px] bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">

        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2 text-gray-900 no-underline">
          <span className="text-[1.2rem]">
            <span className="font-normal">Keen</span>
            <span className="font-bold">Keeper</span>
          </span>
        </NavLink>

        {/* Nav links */}
        <div className="flex items-center gap-1">
          {links.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 no-underline
                ${isActive
                  ? "bg-forest text-white"
                  : "text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                }`
              }
            >
              <Icon size={15} />
              <span className="hidden sm:inline">{label}</span>
            </NavLink>
          ))}
        </div>

      </div>
    </nav>
  );
}
