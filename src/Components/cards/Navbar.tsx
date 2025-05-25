import axios from "axios";
import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router";
// import { MdMenu } from "react-icons/md";

type User = {
  name: string;
  email: string;
};

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser && storedUser !== "undefined" && storedUser !== "null") {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && typeof parsedUser === "object") {
          setUser(parsedUser);
        }
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage:", error);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "https://asset-management-system-2y9g.onrender.com/api/user/logout/"
      );
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className=" bg-gradient-to-r from-[rgba(32,109,133,1)] via-[rgba(112,197,174,1)] to-[rgba(109,204,78,1)] py-3 ">
      <div className="flex ml-10 md:ml-40 justify-between items-center relative">
        {/* <div className="flex items-start px-4 ">
          <MdMenu />
        </div> */}

        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search"
            className="w-full border-2 border-gray-300 pl-4 pr-10 py-2 rounded-2xl focus:outline-none"
          />
          <CiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 text-xl" />
        </div>

        <div className="ml-4 relative text-white font-medium whitespace-nowrap flex items-center">
          <div className="px-">Welcome, {user?.name || "User"}</div>
          <div
            onClick={() => setShowDropdown(!showDropdown)}
            className="cursor-pointer px-5"
          >
            <FaChevronDown />
          </div>

          {showDropdown && (
            <div className="absolute top-13 right-0 w-60 bg-green-300 text-black rounded-b-xl shadow-lg  ">
              <div className="px-4 py-3 ">
                <p className="font-semibold text-lg">{user?.name}</p>
                <p className="text-sm text-gray-600">{user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-center px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
        {/* <CiUser className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-600 text-xl" /> */}
      </div>
    </div>
  );
};

export default Navbar;
