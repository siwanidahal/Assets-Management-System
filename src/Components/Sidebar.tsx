import { TbLayoutDashboardFilled } from "react-icons/tb";
import { FaAssistiveListeningSystems, FaUserFriends } from "react-icons/fa";
// import { IoMdCheckbox } from "react-icons/io";
// import { MdAssignmentInd } from "react-icons/md";
import { TbCategoryPlus } from "react-icons/tb";
import { RiLayoutGridLine } from "react-icons/ri";
import { Link } from "react-router";
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
    name: "Assets Out",
    link: "/assets-out",
    icon: FaAssistiveListeningSystems,
  },
];
const Sidebar = () => {
  return (
    <div
      className=" h-screen
       border-1 border-gray-200 shadow-xl "
    >
      <div className=" px-4 pt-10">
        <h1 className="text-2xl font-semibold">
          <span className="hidden md:flex ">
            Assets <br /> Management
          </span>{" "}
          <span className="md:hidden">AM</span>
        </h1>
        <div className="mt-10 flex items-center md:items-start flex-col space-y-5 cursor-pointer">
          {sideLinks.map((l) => (
            <Link
              key={l.link}
              to={l.link}
              className="flex text-center  items-center w-fit gap-2 hover:bg-blue-50 hover:rounded-b-sm"
            >
              <l.icon />
              <span className="hidden md:flex">{l.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
