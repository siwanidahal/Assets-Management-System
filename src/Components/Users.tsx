// export default function Users() {
//   const heading = [
//     {
//       id: 111,
//       UserName: "Sweta Niroula",
//       Address: "Dharan",
//       Phoneno: "9865960960",
//       Status: "ISActive",
//     },
//     {
//       id: 222,
//       UserName: "Sweta Niroula",
//       Address: "Dharan",
//       Phoneno: "9865960960",
//       Status: "ISActive",
//     },
//     {
//       id: 333,
//       UserName: "Sweta Niroula",
//       Address: "Dharan",
//       Phoneno: "9865960960",
//       Status: "ISActive",
//     },
//     {
//       id: 444,
//       UserName: "Sweta Niroula",
//       Address: "Dharan",
//       Phoneno: "9865960960",
//       Status: "ISActive",
//     },
//     {
//       id: 555,
//       UserName: "Sweta Niroula",
//       Address: "Dharannn",
//       Phoneno: "9865960960",
//       Status: "ISActive",
//     },
//     {
//       id: 666,
//       UserName: "Sweta Niroula",
//       Address: "Dharannn",
//       Phoneno: "9865960960",
//       Status: "ISActive",
//     },
//     {
//       id: 777,
//       UserName: "Sweta Niroula",
//       Address: "Dharannn",
//       Phoneno: "9865960960",
//       Status: "ISActive",
//     },
//   ];

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

type Users = {
  id: number;
  UserName: string;
  Address: string;
  Phoneno: number;
  Status: string;
};

export default function Users() {
  const [showForm, setShowForm] = useState(false);
  const [userData, setUserData] = useState<Users[]>([]);
  const fetchUsers = async () => {
    try {
      const response = await fetch(
        "http://https://2k8mf0hg-8001.inc1.devtunnels.ms//api/user/"
      );
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  // const UserDataa = [
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
          <div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="text-white text-xl bg-blue-500 p-1 pl-4 pr-4 mt-3 mr-8 rounded-2xl"
            >
              {showForm ? "X" : "Add Asset"}
            </button>
          </div>
        </div>
        {showForm && (
          <div className="sm:h-31 md:h-20 mt-8 ml-5 mb-4 space-x-2 space-y-3">
            <input
              type="number"
              name="AssetId"
              placeholder="Id"
              className="border-2 p-1"
            />
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="border-2 p-1"
            />
            <input
              type="text"
              name="Shortname"
              placeholder="ShortName"
              className="border-2 p-1"
            />
            <input
              type="text"
              name="Assetcategory"
              placeholder="Category"
              className="border-2 p-1"
            />
            <button className="text-white text-xl bg-blue-500 p-1 pl-2 pr-2 mt-1 mr-1 rounded-2xl">
              Submit
            </button>
          </div>
        )}

        <div className="flex gap-19 pl-3 py-3 font-semibold bg-gray-100 border-b border-blue-200">
          <h1>UserID</h1>
          <h1> UserName</h1>
          <h1> Address</h1>
          <h1> Phone no</h1>
          <h1>Status</h1>
        </div>

        {userData.map((user) => (
          <div
            key={user.id}
            className="flex gap-21 pl-4 py-3 border-b border-blue-100 bg-white hover:bg-blue-50"
          >
            <p>{user.id}</p>
            <p>{user.UserName}</p>
            <p>{user.Address}</p>
            <p>{user.Phoneno}</p>
            <p>{user.Status}</p>
          </div>
        ))}
      </div>
    </>
  );
}
