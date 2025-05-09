// export default function Users() {
//   return (
//     <div className=" ml-10 pt-3  mt-10 bg-white shadow-xl">
//       <div className="flex">
//         <table>
//           <thead>
//             <tr className="border-b-3 border-2 border-r-2 border-gray-300 bg-blue-300">
//               <th className="pl-3 pb-3 pr-15 border-r-2 border-gray-100">
//                 UserID
//               </th>
//               <th className="pl-3 pb-3 pr-15 border-r-2 border-gray-100">
//                 UserName
//               </th>
//               <th className="pl-3 pb-3 pr-15 border-r-2 border-gray-100">
//                 Address
//               </th>
//               <th className="pl-3 pb-3 pr-15 border-r-2 border-gray-100">
//                 Phone no
//               </th>
//               <th className="pl-3 pb-3 pr-15 border-r-2 border-gray-100">
//                 Status
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {heading.map((user) => (
//               <tr key={user.id} className="border-b border-gray-300 border-2 ">
//                 <td className="pl-3 pb-3 border-r-4 border-gray-100">
//                   {user.id}
//                 </td>
//                 <td className="pl-3 pb-3 border-r-2 border-gray-100">
//                   {user.UserName}
//                 </td>
//                 <td className="pl-3 pb-3 border-r-2 border-gray-100">
//                   {user.Address}
//                 </td>
//                 <td className="pl-3 pb-3 border-r-2 border-gray-100">
//                   {user.Phoneno}
//                 </td>
//                 <td className="pl-3 pb-3 border-r-2 border-gray-100">
//                   {user.Status}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";

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
  // const [formData, setFormData] = useState({
  //   id: 0,
  //   username: "",
  //   address: "",
  //   phone_number: 0,
  //   fist_name: "",
  //   last_name: "",
  // });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://2k8mf0hg-8001.inc1.devtunnels.ms/api/user/users/"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Users[] = await response.json();
        setUserData(data);
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
    <>
      <div className="h-full border-1 border-gray-200 shadow-xl mt-7 ml-5 mr-5 ">
        <div className="w-full h-15 flex justify-between border-b-2 border-b-gray-100 shadow-xl ">
          <h1 className="text-3xl mt-2 ml-4">Users Details</h1>
        </div>
        <table className="w-full table-auto">
          <thead className="bg-gray-100 border-b border-blue-200">
            <tr className="flex gap-19 pl-3 py-3 font-semibold">
              <th className="w-1/6 text-left">UserID</th>
              <th className="w-1/6 text-left">UserName</th>
              <th className="w-1/6 text-left">Address</th>
              <th className="w-1/6 text-left">PhoneNo</th>
              <th className="w-1/6 text-left">First_Name</th>
              <th className="w-1/6 text-left">Last_Name</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user) => (
              <tr
                key={user.id}
                className="flex gap-21 pl-4 py-3 border-b border-blue-100 bg-white hover:bg-blue-50"
              >
                <td className="w-1/6">{user.id}</td>
                <td className="w-1/6">{user.username}</td>
                <td className="w-1/6">{user.address}</td>
                <td className="w-1/6">{user.phone_number}</td>
                <td className="w-1/6">{user.first_name}</td>
                <td className="w-1/6">{user.last_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
