
// import { TbLayoutDashboardFilled } from "react-icons/tb";
// import { FaAssistiveListeningSystems, FaUserFriends } from "react-icons/fa";
// // import { IoMdCheckbox } from "react-icons/io";
// // import { MdAssignmentInd } from "react-icons/md";
// import { TbCategoryPlus } from "react-icons/tb";
// import { RiLayoutGridLine } from "react-icons/ri";
// import { Link } from "react-router";
// import { FaBoxOpen } from "react-icons/fa";
import { RiAddLargeLine } from "react-icons/ri";
// const sideLinks = [
//   {
//     name: "Dashboard",
//     link: "/",
//     icon: TbLayoutDashboardFilled,
//   },
//   {
//     name: "Assets",
//     link: "/assets",
//     icon: RiLayoutGridLine,
//   },
//   {
//     name: "Categories",
//     link: "/categories",
//     icon: TbCategoryPlus,
//   },
//   {
//     name: "Users",
//     link: "/users",
//     icon: FaUserFriends,
//   },
//   {
//     name: "Assets Details",
//     link: "/assets-details",
//     icon: FaBoxOpen,
//   },
//   {
//     name: "Assets Out",
//     link: "/assets-out",
//     icon: FaAssistiveListeningSystems,
//   },
// ];
// const Sidebar = () => {
//   return (
//     <div
//       className=" h-screen
//        border-1 border-gray-200 shadow-xl "
//     >
//       <div className=" px-4 pt-10">
//         <h1 className="text-2xl font-semibold">
//           <span className="hidden md:flex ">
//             Assets <br /> Management
//           </span>{" "}
//           <span className="md:hidden">AM</span>
//         </h1>
//         <div className="mt-10 flex items-center md:items-start flex-col space-y-5 cursor-pointer">
//           {sideLinks.map((l) => (
//             <Link
//               key={l.link}
//               to={l.link}
//               className="flex text-center  items-center w-fit gap-2 hover:bg-blue-50 hover:rounded-b-sm"
//             >
//               <l.icon />
//               <span className="hidden md:flex">{l.name}</span>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
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
import { ModeToggle } from "./theme-switch";

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
    name: "Create NewUser",
    link: "/newUsers",
    icon: RiAddLargeLine,
  },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div
      className="h-screen border-1 border-gray-200 shadow-xl bg-white/70 backdrop-blur-lg"
      style={{
        background:
          "linear-gradient(135deg, rgba(236,245,255,0.85) 60%, rgba(186,230,253,0.7) 100%)",
      }}
    >
      <ModeToggle />
      <div className="px-4 pt-10 ">
        <h1 className="text-2xl font-bold tracking-tight text-blue-700 drop-shadow mb-8">
          <span className="hidden md:flex leading-tight">
            Assets <br /> Management
          </span>
          <span className="md:hidden">AM</span>
        </h1>
        <div className="mt-4 flex items-center md:items-start flex-col space-y-2">
          {sideLinks.map((l) => {
            const isActive = location.pathname === l.link;
            return (
              <Link
                key={l.link}
                to={l.link}
                className={`group flex items-center w-full gap-3 px-3 py-2 rounded-lg transition-all duration-200
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
                <span className="hidden md:inline">{l.name}</span>
                {/* Tooltip for mobile */}
                <span className="md:hidden absolute left-16 bg-green-400 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition pointer-events-none z-10">
                  {l.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

// import { TbLayoutDashboardFilled, TbCategoryPlus } from "react-icons/tb";
// import {
//   FaAssistiveListeningSystems,
//   FaUserFriends,
//   FaBoxOpen,
// } from "react-icons/fa";
// import { RiLayoutGridLine } from "react-icons/ri";
// import { Link, useLocation } from "react-router"; // make sure you're using 'react-router-dom'

// const sideLinks = [
//   { name: "Dashboard", link: "/", icon: TbLayoutDashboardFilled },
//   { name: "Assets", link: "/assets", icon: RiLayoutGridLine },
//   { name: "Categories", link: "/categories", icon: TbCategoryPlus },
//   { name: "Users", link: "/users", icon: FaUserFriends },
//   { name: "Assets Details", link: "/assets-details", icon: FaBoxOpen },
//   {
//     name: "Assets Out",
//     link: "/assets-out",
//     icon: FaAssistiveListeningSystems,
//   },
// ];

// const Sidebar = () => {
//   const location = useLocation(); // to highlight the current active route

//   return (
//     <div className="h-screen w-64 bg-white border-r border-gray-200 shadow-md">
//       <div className="p-6">
//         <h1 className="text-2xl font-bold text-blue-700 leading-tight">
//           <span className="hidden md:block">
//             Assets <br /> Management
//           </span>
//           <span className="md:hidden">AM</span>
//         </h1>

//         <nav className="mt-10 flex flex-col gap-3">
//           {sideLinks.map((l) => {
//             const isActive = location.pathname === l.link;
//             return (
//               <Link
//                 key={l.link}
//                 to={l.link}
//                 className={`flex items-center gap-3 px-4 py-2 rounded-md transition-all duration-200
//                 ${
//                   isActive
//                     ? "bg-blue-100 text-blue-700 font-semibold"
//                     : "text-gray-700 hover:bg-gray-100"
//                 }
//               `}
//               >
//                 <l.icon className="text-xl" />
//                 <span className="hidden md:inline">{l.name}</span>
//               </Link>
//             );
//           })}
//         </nav>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
