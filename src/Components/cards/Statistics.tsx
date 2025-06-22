import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/Components/ui/card";
import { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import { PiGridFour } from "react-icons/pi";
import { RiAddFill } from "react-icons/ri";
import { BsPersonFill } from "react-icons/bs";
import { HiDocumentReport } from "react-icons/hi";
import { PiKeyReturnBold } from "react-icons/pi";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Navbar from "./Navbar";
import { useNavigate } from "react-router";

function useCountUp(target: number, duration = 1000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 16);
    let raf: number;
    function animate() {
      start += increment;
      if (start < target) {
        setCount(Math.floor(start));
        raf = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    }
    animate();
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return count;
}

const TOTAL_ASSETS = 128;
const ASSIGNED_ASSETS = 75;
const MAINTENANCE_ASSETS = 40;

const activities = [
  {
    icon: BsPersonFill,
    message: "Laptop assigned to Ram",
    time: "5 min ago",
  },
  {
    icon: PiKeyReturnBold,
    message: "Mouse returned by Sita",
    time: "1 hr ago",
  },
  {
    icon: BsPersonFill,
    message: "Chair assigned to Hari",
    time: "2 days ago",
  },
  {
    icon: PiKeyReturnBold,
    message: "Printer returned by Gita",
    time: "4 hrs ago",
  },
];

const chartData = [
  { name: "Assigned", value: ASSIGNED_ASSETS },
  { name: "Maintenance", value: MAINTENANCE_ASSETS },
  {
    name: "Available",
    value: TOTAL_ASSETS - ASSIGNED_ASSETS - MAINTENANCE_ASSETS,
  },
];

const COLORS = ["#6366f1", "#22c55e", "#fbbf24"];

const Statistics = () => {
  // const [darkMode, setDarkMode] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("latest");
  const navigate = useNavigate();

  // Always generate a new key on every render for PieChart animation on refresh
  const chartKey = Date.now();

  const totalAssets = useCountUp(TOTAL_ASSETS);
  const assignedAssets = useCountUp(ASSIGNED_ASSETS);
  const maintenanceAssets = useCountUp(MAINTENANCE_ASSETS);

  const assignedPercent = Math.round((ASSIGNED_ASSETS / TOTAL_ASSETS) * 100);
  const maintenancePercent = Math.round(
    (MAINTENANCE_ASSETS / TOTAL_ASSETS) * 100
  );

  const filteredActivities = activities
    .filter((a) => a.message.toLowerCase().includes(search.toLowerCase()))
    .sort(() => (filter === "latest" ? -1 : 1));

  return (
    <div className="min-h-screen py-6 bg-gradient-to-br from-blue-50 via-cyan-50 to-emerald-100 dark:from-gray-400 dark:via-slate-300 dark:to-blue-750 transition-colors duration-500">
      <Navbar />
      {/* Top Controls */}

      <div className="flex flex-col md:flex-row justify-between items-center mt-8 px-6 gap-4">
        <span className="h-6 w-px bg-gray-300 dark:bg-gray-700 mx-2" />

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search activities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 px-3 py-1.5 rounded-lg text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 px-3 py-1.5 rounded-lg text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 focus:outline-none"
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>
      {/* Stats Cards */}

      <div className="flex  px-15 gap-30 mt-10 ">
        {/* Total Assets */}
        <Card className="w-70 bg-gradient-to-br from-green-100 via-green-50 to-white dark:from-teal-900 dark:via-teal-800 dark:to-black/80">
          <CardHeader>
            <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-green-400 blur opacity-40 group-hover:opacity-80 transition" />
            <div className="flex items-center gap-4">
              <PiGridFour className="text-3xl  text-green-600 dark:text-white drop-shadow-lg" />
              <div>
                <h1 className="text-lg font-semibold  text-black dark:text-white">
                  Total Assets
                </h1>
                <h3 className="font-bold  text-black dark:text-white px-1 text-3xl tabular-nums">
                  {totalAssets}
                </h3>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="w-full text-black dark:bg-gray-700 rounded-full h-2 mt-2">
              <div
                className="bg-green-400 dark:bg-white h-2 rounded-full transition-all duration-500"
                style={{ width: "100%" }}
              ></div>
            </div>
          </CardContent>
          <CardFooter>
            <span className="text-xs text-black dark:text-card-foreground flex items-center gap-1">
              <span className="inline-block bg-green-100 dark:text-black text-green-700   px-2 py-0.5 rounded-full font-semibold">
                100%
              </span>
              total assets
            </span>
          </CardFooter>
        </Card>
        {/* Assigned Assets */}
        <Card className="w-70 bg-gradient-to-br from-green-100 via-green-50 to-white dark:from-teal-900 dark:via-teal-800 dark:to-black/80">
          <CardHeader>
            <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-green-400 blur opacity-40 group-hover:opacity-80 transition" />
            <div className="flex items-center gap-4">
              <BsPersonFill className="text-3xl text-green-600 dark:text-white drop-shadow-lg" />
              <div>
                <h1 className="text-lg font-semibold text-black dark:text-white">
                  Assigned Assets
                </h1>
                <h3 className="font-bold text-black dark:text-white  text-3xl tabular-nums">
                  {assignedAssets}
                </h3>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="w-full  bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
              <div
                className="bg-green-400 dark:bg-white h-2 rounded-full transition-all duration-500"
                style={{ width: `${assignedPercent}%` }}
              ></div>
            </div>
          </CardContent>
          <CardFooter>
            <span className="text-xs  text-black dark:text-white flex items-center gap-1">
              <span className="inline-block bg-green-100 dark:text-black text-green-700  px-2 py-0.5 rounded-full font-semibold">
                {assignedPercent}%
              </span>
              assigned
            </span>
          </CardFooter>
        </Card>
        {/* Maintenance Assets */}
        <Card className="w-70 bg-gradient-to-br from-green-100 via-green-50 to-white dark:from-teal-900 dark:via-teal-800 dark:to-black/80">
          <CardHeader>
            <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-green-400 blur opacity-40 group-hover:opacity-80 transition" />
            <div className="flex items-center gap-4">
              <FaCheck className="text-3xl text-green-400 dark:text-white drop-shadow-lg" />
              <div>
                <h1 className="text-lg font-semibold text-black dark:text-white">
                  Under Maintenance
                </h1>
                <h3 className="font-bold text-black dark:text-white  text-3xl tabular-nums">
                  {maintenanceAssets}
                </h3>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
              <div
                className="bg-green-400 dark:bg-white h-2 rounded-full transition-all duration-500"
                style={{ width: `${maintenancePercent}%` }}
              ></div>
            </div>
          </CardContent>
          <CardFooter>
            <span className="text-xs text-black dark:text-white flex items-center gap-1  ">
              <span className="inline-block bg-green-100 dark:text-black text-green-700  rounded-full font-semibold px-2 py-0.5">
                {maintenancePercent}%
              </span>
              under maintenance
            </span>
          </CardFooter>
        </Card>
      </div>

      <div>
        {/* Main Content */}
        <div className="flex  gap-30 mt-30 px-15 mb-10">
          {/* Quick Actions */}
          <Card className=" w-80 bg-gradient-to-br from-green-100 via-green-50 to-white dark:from-teal-900 dark:via-teal-800 dark:to-black/80 rounded-2xl shadow-xl hover:shadow-2xl transition flex flex-col">
            <CardHeader>
              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-green-400 blur opacity-40 group-hover:opacity-80 transition" />
              <div className="flex items-center gap-4">
                <RiAddFill className="text-3xl text-green-600 dark:text-white drop-shadow-lg" />
                <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Quick Actions
                </h1>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-6 mt-2">
                <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-green-600 cursor-pointer transition group">
                  <span className="bg-green-100 dark:bg-green-900 p-2 rounded-full group-hover:bg-green-200 dark:group-hover:bg-green-800 transition">
                    <RiAddFill className="text-2xl text-green-600" />
                  </span>
                  <span className="font-medium">
                    <p onClick={() => navigate("/assets")}>Add Asset</p>
                  </span>
                </li>
                <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-green-600 cursor-pointer transition group">
                  <span className="bg-green-100 dark:bg-green-900 p-2 rounded-full group-hover:bg-green-200 dark:group-hover:bg-green-800 transition">
                    <BsPersonFill className="text-xl text-green-600" />
                  </span>
                  <span className="font-medium">
                    <p onClick={() => navigate("/assets-out")}>Assign Asset</p>
                  </span>
                </li>
                <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-green-600 cursor-pointer transition group">
                  <span className="bg-green-100 dark:bg-green-900 p-2 rounded-full group-hover:bg-green-200 dark:group-hover:bg-green-800 transition">
                    <HiDocumentReport className="text-xl text-green-600" />
                  </span>
                  <span className="font-medium">Generate Report</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card className="w-80 bg-gradient-to-br from-green-100 via-green-50 to-white dark:from-teal-900 dark:via-teal-800 dark:to-black/80 rounded-2xl shadow-xl hover:shadow-2xl transition flex flex-col">
            <CardHeader>
              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-green-400 blur opacity-40 group-hover:opacity-80 transition" />
              <div className="flex items-center gap-4">
                <BsPersonFill className="text-3xl text-green-600 drop-shadow-lg" />
                <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Recent Activities
                </h1>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-5 mt-2">
                {filteredActivities.map(
                  ({ icon: Icon, message, time }, idx) => (
                    <li
                      key={idx}
                      className="flex gap-3 items-start animate-fade-in"
                      style={{
                        animationDelay: `${idx * 0.1 + 0.2}s`,
                        animationFillMode: "forwards",
                      }}
                    >
                      <span className="bg-green-100 dark:bg-green-900 p-2 rounded-full flex items-center justify-center">
                        <Icon className="text-xl text-green-600" />
                      </span>
                      <div>
                        <p className="text-gray-700 dark:text-gray-300 font-medium hover:text-green-600 cursor-pointer">
                          {message}
                        </p>
                        <p className="text-sm text-gray-400 dark:text-gray-500">
                          {time}
                        </p>
                      </div>
                    </li>
                  )
                )}
                {filteredActivities.length === 0 && (
                  <li className="text-gray-400 dark:text-gray-500 italic">
                    No activities found.
                  </li>
                )}
              </ul>
            </CardContent>
          </Card>

          {/* Charts */}
          <Card className="w-80 bg-gradient-to-br from-green-100 via-green-50 to-white dark:from-teal-900 dark:via-teal-800 dark:to-black/80 rounded-2xl shadow-xl hover:shadow-2xl transition flex flex-col px-2">
            <CardHeader>
              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-green-400 blur opacity-40 group-hover:opacity-80 transition" />
              <div className="flex items-center gap-4">
                <PiGridFour className="text-3xl text-green-600 drop-shadow-lg" />
                <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Asset Distribution
                </h1>
              </div>
            </CardHeader>
            <CardContent className="w-full flex flex-col items-center">
              <ResponsiveContainer width="100%" height={180}>
                <PieChart key={chartKey}>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    outerRadius={60}
                    label={({ name, value }) => `${name}: ${value}`}
                    isAnimationActive={true}
                  >
                    {chartData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <ResponsiveContainer width="100%" height={120} className="mt-6">
                <BarChart data={chartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#22c55e" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {filteredActivities.length === 0 && (
          <>
            <li className="text-gray-400 dark:text-gray-500 italic">
              No activities found.
            </li>
          </>
        )}
      </div>

      {/* Fade-in animation for activities */}
      <style>
        {`
                @keyframes fade-in {
                  from { opacity: 0; transform: translateY(20px);}
                  to { opacity: 1; transform: translateY(0);}
                }
                .animate-fade-in {
                  animation: fade-in 0.7s cubic-bezier(.4,0,.2,1) both;
                }
              `}
      </style>
    </div>
  );
};

export default Statistics;
