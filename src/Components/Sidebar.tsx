import { TbLayoutDashboardFilled } from "react-icons/tb";
import { FaUserFriends } from "react-icons/fa";
import { IoMdCheckbox } from "react-icons/io";
import { MdAssignmentInd } from "react-icons/md";
import { TbCategoryPlus } from "react-icons/tb";
import { RiLayoutGridLine } from "react-icons/ri";
import { useNavigate } from "react-router";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className="w-55 h-[89vh]
       border-1 border-gray-200 shadow-xl mt-10 ml-10 mb-10 "
      >
        <div className="ml-5 pt-10 mr-2">
          <h1 className="text-2xl font-semibold">Assets Management</h1>
          <div className="mt-10 space-y-5 cursor-pointer">
            <div className="flex items-center gap-2 hover:bg-blue-50 hover:rounded-b-sm pl-1.5 p-1 mr-6">
              <TbLayoutDashboardFilled />
              Dashboard
            </div>
            <div
              onClick={() => navigate("/assets")}
              className="flex items-center gap-2 hover:bg-blue-100 hover:rounded-b-sm pl-1.5 mr-6 p-1"
            >
              <RiLayoutGridLine /> Assets
            </div>
            <div className="flex items-center gap-2 hover:bg-blue-100 hover:rounded-b-sm pl-1.5 p-1 mr-6">
              <TbCategoryPlus />
              Categories
            </div>
            <div
              onClick={() => navigate("/users")}
              className="flex items-center gap-2 hover:bg-blue-100 hover:rounded-b-sm pl-1.5 p-1 mr-6"
            >
              <FaUserFriends />
              Users
            </div>
            <div className="flex items-center gap-2 hover:bg-blue-100 hover:rounded-b-sm pl-1.5 p-1 mr-6">
              <MdAssignmentInd /> Assignments
            </div>
            <div className="flex items-center gap-2 hover:bg-blue-100 hover:rounded-b-sm pl-1.5 p-1 mr-6">
              <IoMdCheckbox /> Maintenance
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
