import { FaCheck } from "react-icons/fa";
import { PiGridFour } from "react-icons/pi";
import { RiAddFill } from "react-icons/ri";
import { BsPersonFill } from "react-icons/bs";
import { HiDocumentReport } from "react-icons/hi";
import { PiKeyReturnBold } from "react-icons/pi";


const Statistics = () => {
  return (
    <div className="p-7 ">
      <div className="flex gap-12 ">
        {/* Card1 */}
        <div className="w-50 border-2  border-blue-100 p-7 rounded-3xl flex items-center gap-4 shadow-2xl  bg-white hover:border-blue-700">
          <PiGridFour className="text-3xl text-blue-600" />
          <div >
            <h1 className="text-lg font-semibold text-gray-800 ">
              Total Assets
            </h1>
            <h3 className="font-bold text-black px-1 text-xl">128</h3>
          </div>
        </div>
        {/* Card2 */}
        <div className="w-50 border-2  border-blue-100 hover:border-blue-700 p-7 rounded-3xl flex items-center gap-4 shadow-2xl  bg-white">
          <BsPersonFill className="text-3xl text-blue-600" />
          <div>
            <h1 className="text-lg font-semibold text-gray-800">
              Assigned Assets
            </h1>
            <h3 className="font-bold text-black px-4 text-xl">75</h3>
          </div>
        </div>
        {/* Card3 */}
        <div className="w-50 border-2 border-blue-100  hover:border-blue-700 p-7 rounded-3xl flex items-center gap-4 shadow-2xl  bg-white ">
          <FaCheck className="text-3xl text-blue-600" />
          <div>
            <h1 className=" text-lg font-semibold text-gray-800 ">
              Assets Under Maintenance
            </h1>
            <h3 className="font-bold text-black px-4 text-xl">40</h3>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-20 flex gap-40 ">
        <div className="w-fit border-2 border-blue-100  hover:border-blue-700 p-10 rounded-3xl  gap-4 shadow-2xl  bg-white">
          <h1 className="text-2xl font-semibold text-gray-800 ">
            Quick Actions
          </h1>
          <ul className="space-y-8">
            <li className="flex items-center gap-3 text-gray-700 font-medium cursor-pointer hover:text-blue-600 mt-7">
              <RiAddFill className="text-2xl text-blue-600" />
              Add Asset
            </li>
            <li className="flex items-center gap-3 text-gray-700 font-medium cursor-pointer hover:text-blue-600">
              <BsPersonFill className="text-xl text-blue-600" />
              Assign Asset
            </li>
            <li className="flex items-center gap-3 text-gray-700 font-medium cursor-pointer hover:text-blue-600">
              <HiDocumentReport className="text-xl text-blue-600" />
              Generate Report
            </li>
          </ul>
        </div>

        {/* Recent Activities */}
        <div className="w-100 border-2 border-blue-100  hover:border-blue-700 p-10 rounded-3xl shadow-2xl  bg-white ">
          <h1 className="text-2xl font-semibold text-gray-800 ">
            Recent Activities
          </h1>
          <ul className="space-y-5">
            <li className="flex items-center gap-3 mt-4 ">
              <BsPersonFill className="text-xl text-blue-600" />
              <div>
                <p className="text-gray-700 font-medium cursor-pointer hover:text-blue-600">
                  Laptop assigned to Ram
                </p>
                <p className="text-sm text-gray-400">5 min ago</p>
              </div>
            </li>
            <li className="flex items-center gap-3" >
              <PiKeyReturnBold className="text-xl text-blue-600"/>
              <div>
                <p className="text-gray-700 font-medium cursor-pointer hover:text-blue-600">
                  Mouse return by Sita
                </p>
                <p className="text-sm text-gray-400">1 hrs ago</p>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <BsPersonFill className="text-xl text-blue-600"/>
              <div>
                <p className="text-gray-700 font-medium not-first:cursor-pointer hover:text-blue-600">
                  Chair assigned to Hari
                </p>
                <p className="text-sm text-gray-400">2 day ago</p>
              </div>
            </li>
            <li className="flex items-center gap-3">
            <PiKeyReturnBold className="text-xl text-blue-600" />
              <div>
                <p className="text-gray-700 font-medium cursor-pointer hover:text-blue-600">
                  Printer returned by Gita
                </p>
                <p className="text-sm text-gray-400"> 4 hrs ago</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Statistics;

