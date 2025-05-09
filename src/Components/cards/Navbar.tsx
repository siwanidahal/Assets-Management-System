import { CiSearch } from "react-icons/ci";

const Navbar = () => {
  return (
    <>
      <div className="w-full bg-gradient-to-r from-[rgba(32,109,133,1)] via-[rgba(112,197,174,1)] to-[rgba(109,204,78,1)] py-5 px-6">
        <div className="flex justify-between items-center ">
          <div className="relative w-full max-w-md ">
            <input
              type="text"
              placeholder="Search"
              className="w-full border-2 border-gray-300 pl-4 pr-10 py-2 rounded-2xl focus:outline-none"
            />

            <CiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 text-xl" />
          </div>
          <div className="ml-4 text-white font-medium whitespace-nowrap">
            Welcome User
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
