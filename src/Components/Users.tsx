import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router";
import { IoArrowBackCircleSharp } from "react-icons/io5";
interface Users {
  id: number;
  username: string;
  email: string;
  first_name: number;
  last_name: string;
  address: string;
  phone_number: number;
}
export default function Users() {
  const [userData, setUserData] = useState<Users[]>([]);
  const [serachData, setSearchData] = useState("");
  const navigate = useNavigate();
  // const [formData, setFormData] = useState({
  //   id: 0,
  //   username: "",
  //   address: "",
  //   phone_number: 0,
  //   fist_name: "",
  //   last_name: "",
  // });
  const filterData = userData.filter((user) =>
    `${user.username} ${user.first_name} ${user.last_name} ${user.address} ${user.phone_number}`
      .toLowerCase()
      .includes(serachData.toLowerCase())
  );

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://asset-management-system-2y9g.onrender.com/api/user/users/"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Users[] = await response.json();
        // setUserData(data);
        setUserData(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);
  // const fetchUsers = async () => {
  //   try {
  //     const response = await fetch(
  //       "http://https://2k8mf0hg-8001.inc1.devtunnels.ms//api/user/"
  //     );
  //     const data = await response.json();
  //     setUserData(data);
  //   } catch (error) {
  //     console.error("Error fetching users:", error);
  //   }
  // };
  // useEffect(() => {
  //   fetchUsers();
  // }, []);

  //   {
  //     id: 111,
  //     UserName: "Sweta Niroula",
  //     Address: "Dharan",
  //     Phoneno: "9865960960",
  //     Status: "ISActive",
  //   },
  //   {
  //     id: 222,
  //     UserName: "Sweta Niroula",
  //     Address: "Dharan",
  //     Phoneno: "9865960960",
  //     Status: "ISActive",
  //   },
  //   {
  //     id: 333,
  //     UserName: "Sweta Niroula",
  //     Address: "Dharan",
  //     Phoneno: "9865960960",
  //     Status: "ISActive",
  //   },
  //   {
  //     id: 444,
  //     UserName: "Sweta Niroula",
  //     Address: "Dharan",
  //     Phoneno: "9865960960",
  //     Status: "ISActive",
  //   },
  //   {
  //     id: 555,
  //     UserName: "Sweta Niroula",
  //     Address: "Dharannn",
  //     Phoneno: "9865960960",
  //     Status: "ISActive",
  //   },
  //   {
  //     id: 666,
  //     UserName: "Sweta Niroula",
  //     Address: "Dharannn",
  //     Phoneno: "9865960960",
  //     Status: "ISActive",
  //   },
  //   {
  //     id: 777,
  //     UserName: "Sweta Niroula",
  //     Address: "Dharannn",
  //     Phoneno: "9865960960",
  //     Status: "ISActive",
  //   },
  // ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-between items-center p-6 ">
          <div className="flex items-center">
            <button
              onClick={() => navigate("/")}
              className="mr-4 p-2 rounded-lg hover:bg-gray-100"
            >
              <IoArrowBackCircleSharp className="text-2xl text-black-500" />
            </button>
          </div>
          <h1 className="text-2xl font-bold text-teal-500 mb-4 sm:mb-0">
            User Details
          </h1>
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search users..."
              value={serachData}
              onChange={(e) => setSearchData(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <CiSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>

        {/* User Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-teal-500">
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                  User ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                  Username
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                  Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                  Phone No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                  First Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                  Last Name
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filterData.length > 0 ? (
                filterData.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm">{user.id}</td>
                    <td className="px-6 py-4 text-sm font-medium text-teal-500">
                      {user.username}
                    </td>
                    <td className="px-6 py-4 text-sm">{user.address}</td>
                    <td className="px-6 py-4 text-sm">{user.phone_number}</td>
                    <td className="px-6 py-4 text-sm">{user.first_name}</td>
                    <td className="px-6 py-4 text-sm">{user.last_name}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/////////pagination///////////////////////////////

// import { useEffect, useState } from "react";
// import { useLocation } from "react-router";
// import { useNavigate } from "react-router";
// import { useCallback } from "react";

// interface Users {
//   id: number;
//   username: string;
//   email: string;
//   first_name: number;
//   last_name: string;
//   address: string;
//   phone_number: number;
// }
// interface UserResponse {
//   pagination: Pagination;
//   status: string;
//   message: string;
//   results: Users[];
// }

// interface Pagination {
//   current_page: number;
//   has_next?: boolean;
//   has_previous?: boolean;
//   total_items?: number;
//   total_pages?: number;
// }
// const USERS_Url = "https://2k8mf0hg-8001.inc1.devtunnels.ms/api/user/users/";
// export default function Users() {
//   const [userData, setUserData] = useState<Users[]>([]);
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const page = queryParams.get("page");
//   const [pagination, setPagination] = useState<Pagination>({
//     current_page: page ? parseInt(page) : 1,
//   });
//   const navigate = useNavigate();
//   // const [formData, setFormData] = useState({
//   //   id: 0,
//   //   username: "",
//   //   address: "",
//   //   phone_number: 0,
//   //   fist_name: "",
//   //   last_name: "",
//   // });

//   const fetchUsers = useCallback(async () => {
//     try {
//       const response = await fetch(USERS_Url + `?page=${page}`);

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data: UserResponse = await response.json();
//       setUserData(data.results);
//       setPagination(data.pagination);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   }, [page]);

//   useEffect(() => {
//     fetchUsers();
//   }, [fetchUsers]);

//   const nextPage = () => {
//     if (!pagination.has_next) return;
//     const nPage = pagination.current_page + 1;
//     navigate(`/assets?page=${nPage}`);
//   };
//   const prevPage = () => {
//     if (!pagination.has_previous) return;
//     const nPage = pagination.current_page - 1;
//     navigate(`/assets?page=${nPage}`);
//   };
//   // const fetchUsers = async () => {
//   //   try {
//   //     const response = await fetch(
//   //       "http://https://2k8mf0hg-8001.inc1.devtunnels.ms//api/user/"
//   //     );
//   //     const data = await response.json();
//   //     setUserData(data);
//   //   } catch (error) {
//   //     console.error("Error fetching users:", error);
//   //   }
//   // };
//   // useEffect(() => {
//   //   fetchUsers();
//   // }, []);

//   //
//   // ];

//   return (
//     <>
//       <div className="h-full border-1 border-gray-200 shadow-xl mt-7 ml-5 mr-5 ">
//         <div className="w-full h-15 flex justify-between border-b-2 border-b-gray-100 shadow-xl ">
//           <h1 className="text-3xl mt-2 ml-4">Users Details</h1>
//         </div>
//         <table className="w-full table-auto">
//           <thead className="bg-gray-100 border-b border-blue-200">
//             <tr className="flex gap-19 pl-3 py-3 font-semibold">
//               <th className="w-1/6 text-left">UserID</th>
//               <th className="w-1/6 text-left">UserName</th>
//               <th className="w-1/6 text-left">Address</th>
//               <th className="w-1/6 text-left">PhoneNo</th>
//               <th className="w-1/6 text-left">First_Name</th>
//               <th className="w-1/6 text-left">Last_Name</th>
//             </tr>
//           </thead>
//           <tbody>
//             {Array.isArray(userData) &&
//               userData.map((user) => (
//                 <tr
//                   key={user.id}
//                   className="flex gap-21 pl-4 py-3 border-b border-blue-100 bg-white hover:bg-blue-50"
//                 >
//                   <td className="w-1/6">{user.id}</td>
//                   <td className="w-1/6">{user.username}</td>
//                   <td className="w-1/6">{user.address}</td>
//                   <td className="w-1/6">{user.phone_number}</td>
//                   <td className="w-1/6">{user.first_name}</td>
//                   <td className="w-1/6">{user.last_name}</td>
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//         <div className="flex justify-between mt-4">
//           <button
//             disabled={!pagination.has_previous}
//             className={
//               "bg-blue-500 text-white px-4 py-2 rounded" +
//               (!pagination.has_previous ? " opacity-50 cursor-not-allowed" : "")
//             }
//             onClick={prevPage}
//           >
//             Previous
//           </button>
//           <button
//             disabled={!pagination.has_next}
//             className={
//               "bg-blue-500 text-white px-4 py-2 rounded" +
//               (!pagination.has_next ? " opacity-50 cursor-not-allowed" : "")
//             }
//             onClick={nextPage}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }
