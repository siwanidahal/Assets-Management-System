import { useState } from "react";
import { useLocation } from "react-router";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import {
  FaAssistiveListeningSystems,
  FaUserFriends,
  FaBoxOpen,
} from "react-icons/fa";
import { TbCategoryPlus } from "react-icons/tb";
import { RiLayoutGridLine } from "react-icons/ri";
import { Link } from "react-router";

import logo from "../assets/logo.png";
import { RiAddLargeLine } from "react-icons/ri"; 

const HamburgerIcon = () => (
  <span
    title="Toggle sidebar"
    className="flex flex-col justify-center items-center w-10 h-6"
  >
    <span className="block w-5 h-0.5 bg-gray-700 mb-1 rounded"></span>
    <span className="block w-5 h-0.5 bg-gray-700 mb-1 rounded"></span>
    <span className="block w-5 h-0.5 bg-gray-700 rounded"></span>
  </span>
);

const sideLinks = [
  {
    name: "Dashboard",
    link: "/",
    icon: TbLayoutDashboardFilled,
  },
  {
    name: "Assets",
    link: "/assets",
    icon: RiLayoutGridLine,
  },
  {
    name: "Categories",
    link: "/categories",
    icon: TbCategoryPlus,
  },
  {
    name: "Users",
    link: "/users",
    icon: FaUserFriends,
  },
  {
    name: "Assets Details",
    link: "/assets-details",
    icon: FaBoxOpen,
  },
  {
    name: "Assets Out",
    link: "/assets-out",
    icon: FaAssistiveListeningSystems,
  },
  {
    name: "Create Newuser",
    link: "/newUsers",
    icon: RiAddLargeLine,
  },
];

const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`min-h-screen relative ${
        collapsed ? "w-20" : ""
      } border-1 border-gray-200 shadow-xl dark:bg-gray-700 backdrop-blur-lg transition-all duration-300`}
      style={{
        background:
          "linear-gradient(135deg, rgba(236,245,255,0.85) 60%, rgba(186,230,253,0.7) 100%)",
      }}
    >
      <button
        className="absolute top-4 right-0 p- rounded hover:bg-gray-200 z-20 flex items-center justify-center"
        onClick={() => setCollapsed((prev) => !prev)}
        aria-label="Toggle sidebar"
      >
        <HamburgerIcon />
      </button>
    
      <div className={`pt-1 ${collapsed ? "px-2" : "px-2"}`}>
        <div
          className={`flex gap-2 mt-10 mb-10 ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <img
            src={logo}
            alt="Logo"
            className={`object-contain rounded-full shadow ${
              collapsed ? "w-10 h-10" : "w-15 h-15"
            }`}
          />
          {!collapsed && (
            <h1 className="text-1.5xl py-2 font-bold  text-green-400 mb-2">
              <span className="hidden md:flex leading-tight font-serif ">
                Assets <br /> Management
              </span>
              <span className="md:hidden">AM</span>
            </h1>
          )}
        </div>
        <div className="flex flex-col items-start">
          <div className="mt-4 flex items-start md:items-start flex-col space-y-1 ">
            {sideLinks.map((l) => {
              const isActive = location.pathname === l.link;
              return (
                <Link
                  key={l.link}
                  to={l.link}
                  className={`group flex justify-start  w-full gap-3 px-3 py-2 rounded-lg transition-all duration-200 relative
                  ${
                    isActive
                      ? "bg-blue-100 text-green-400 font-semibold shadow"
                      : "hover:bg-blue-50 hover:text-green-200 text-gray-700"
                  }`}
                  title={l.name}
                >
                  <span
                    className={`text-xl transition-transform duration-200 group-hover:scale-125 group-hover:text-green-200 ${
                      isActive ? "text-green-400" : ""
                    }`}
                  >
                    <l.icon />
                  </span>
                  {!collapsed && (
                    <span className="hidden md:inline">{l.name}</span>
                  )}
                  {/* Tooltip for collapsed sidebar */}
                  {collapsed && (
                    <span className="absolute left-16 bg-green-400 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition pointer-events-none z-10">
                      {l.name}
                    </span>
                  )}
                  {/* Tooltip for mobile */}
                  {!collapsed && (
                    <span className="md:hidden absolute  bg-green-400 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition pointer-events-none z-10">
                      {l.name}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
