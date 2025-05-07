// import { useEffect, useState } from "react";

// interface Asset {
//   AssetId: number;
//   Name: string;
//   Shortname: string;
//   Assetcategory: string;
//   Unit: number;
// }

// export default function Assets() {
//   const [showForm, setShowForm] = useState(false);
//   const [assetData, setAssetData] = useState<Asset[]>([]);
//   const [formData, setFormData] = useState({
//     AssetId: 0,
//     Name: "",
//     Shortname: "",
//     Assetcategory: "",
//     Unit: 0,
//   });

//   useEffect(() => {
//     const fetchAssets = async () => {
//       try {
//         const response = await fetch(
//           "https://2k8mf0hg-8001.inc1.devtunnels.ms/api/assets/"
//         );
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data: Asset[] = await response.json();
//         setAssetData(data);
//       } catch (error) {
//         console.error("Error fetching assets:", error);
//       }
//     };
//     fetchAssets();
//   }, []);

//   // const handleSubmit = async () => {
//   //   try{
//   //     const response =await fetch("https://2k8mf0hg-8001.inc1.devtunnels.ms/api/assets/", {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //       body: JSON.stringify(formData),
//   //     });
//   //     if (!response.ok){
//   //       throw new Error("Failed to post data");

//   //     }
//   //   }
//   // }

//   // const assetDatas = [
//   //   {
//   //     AssetId: 1,
//   //     Name: "Laptop",
//   //     Shortname: "lp",
//   //     Assetcategory: "Electronics",
//   //     Unit: 1,
//   //   },
//   //   {
//   //     AssetId: 2,
//   //     Name: "Laptop",
//   //     Shortname: "lp",
//   //     Assetcategory: "Electronics",
//   //     Unit: 1,
//   //   },
//   //   {
//   //     AssetId: 3,
//   //     Name: "Laptop",
//   //     Shortname: "lp",
//   //     Assetcategory: "Electronics",
//   //     Unit: 1,
//   //   },
//   // ];

//   return (
//     <>
//       <div className="h-full border-1 border-gray-200 shadow-xl mt-7 ml-5 mr-5 ">
//         <div className="w-full h-15 flex justify-between border-b-2 border-b-gray-100 shadow-xl ">
//           <h1 className="text-3xl mt-2 ml-4">Assets</h1>
//           <div>
//             <button
//               onClick={() => setShowForm(!showForm)}
//               className="text-white text-xl bg-blue-500 p-1 pl-4 pr-4 mt-3 mr-8 rounded-2xl"
//             >
//               {showForm ? "X" : "Add Asset"}
//             </button>
//           </div>
//         </div>
//         {showForm && (
//           <div className="sm:h-31 md:h-20 mt-8 ml-5 mb-4 space-x-2 space-y-3">
//             <input
//               type="number"
//               name="AssetId"
//               placeholder="Id"
//               className="border-2 p-1"
//             />
//             <input
//               type="text"
//               name="name"
//               placeholder="Name"
//               className="border-2 p-1"
//             />
//             <input
//               type="text"
//               name="Shortname"
//               placeholder="ShortName"
//               className="border-2 p-1"
//             />
//             <input
//               type="number"
//               name="Unit"
//               placeholder="Unit"
//               className="border-2 p-1"
//             />
//             <input
//               type="text"
//               name="Assetcategory"
//               placeholder="Category"
//               className="border-2 p-1"
//             />
//             <input
//               type="number"
//               name="Description"
//               placeholder="Description"
//               className="border-2 p-1"
//             />
//             <button
//               onClick={handleSubmit}
//               className="text-white text-xl bg-blue-500 p-1 pl-2 pr-2 mt-1 mr-1 rounded-2xl"
//             >
//               Submit
//             </button>
//           </div>
//         )}

//         <div className="flex gap-7 pl-3 py-3 font-semibold bg-gray-100 border-b border-blue-200">
//           <h1>AssetId</h1>
//           <h1>Asset Name</h1>
//           <h1>Short Name</h1>
//           <h1>Unit</h1>
//           <h1>AssetCategory</h1>
//         </div>

//         {assetData.map((asset) => (
//           <div
//             key={asset.AssetId}
//             className="flex gap-22 pl-3 py-3 border-b border-blue-100 bg-white hover:bg-blue-50"
//           >
//             <p>{asset.AssetId}</p>
//             <p>{asset.Name}</p>
//             <p>{asset.Shortname}</p>
//             <p>{asset.Unit}</p>
//             <p>{asset.Assetcategory}</p>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }

import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";

interface Asset {
  AssetId: number;
  Name: string;
  Shortname: string;
  AssetCategory: number;
  AssetCategoryName: string;
  Unit: number;
  Description: string;
}

export default function Assets() {
  const [showForm, setShowForm] = useState(false);
  const [assetData, setAssetData] = useState<Asset[]>([]);
  const [formData, setFormData] = useState({
    AssetId: 0,
    Name: "",
    Shortname: "",
    AssetCategory: 67,
    Unit: 0,
    Description: "",
  });

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      const response = await fetch(
        "https://2k8mf0hg-8001.inc1.devtunnels.ms/api/assets/"
      );
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data: Asset[] = await response.json();
      setAssetData(data);
    } catch (error) {
      console.error("Error fetching assets:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "Unit" || name === "AssetId" ? Number(value) : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        Name: formData.Name,
        Shortname: formData.Shortname,
        Description: formData.Description,
        Unit: String(formData.Unit),
        AssetCategory: formData.AssetCategory, // must match backend format
      };

      const response = await fetch(
        "https://2k8mf0hg-8001.inc1.devtunnels.ms/api/assets/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) throw new Error("Failed to post data");

      await fetchAssets();
      setFormData({
        AssetId: 0,
        Name: "",
        Shortname: "",
        AssetCategory: 0,
        Unit: 0,
        Description: "",
      });
      setShowForm(false);
    } catch (error) {
      console.error("Error posting asset:", error);
    }
  };

  return (
    <div className="h-full border-1 border-gray-200 shadow-xl mt-7 ml-5 mr-5">
      <div className="w-full h-15 flex justify-between border-b-2 border-b-gray-100  shadow-xl">
        <h1 className="text-3xl mt-2 ml-4">Assets Management</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio,
          quibusdam, nobis doloremque, ullam aliquam incidunt rem ipsam possimus
          velit ab accusamus minus molestiae recusandae sed corporis adipisci
          praesentium. Alias, odio!
        </p>
        <div className="relative flex items-center gap-4 mr-8 mt-3 mb-3">
          <input
            type="text"
            placeholder="Search"
            className="w-90 border-2 pl-5 pt-1 pb-2 border-gray-300 rounded-2xl"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 ">
            <CiSearch />
          </div>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="text-white text-xl bg-blue-500 p-1 pl-4 mb-2 pr-4 mt-3 mr-8 rounded-2xl"
        >
          {showForm ? "X" : "Add Asset"}
        </button>
      </div>

      {showForm && (
        <div className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <div>
              <label htmlFor="Name" className="block text-sm font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                name="Name"
                placeholder="Name"
                className="w-80 border-2 p-2 rounded"
                value={formData.Name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="Shortname"
                className="block text-sm font-medium mb-1"
              >
                Short Name
              </label>
              <input
                type="text"
                name="Shortname"
                placeholder="Short Name"
                className="w-80 border-2 p-2 rounded"
                value={formData.Shortname}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="Description"
                className="block text-sm font-medium mb-1"
              >
                Description
              </label>
              <input
                type="text"
                name="Description"
                placeholder="Description"
                className="w-80 border-2 p-2 rounded"
                value={formData.Description}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="Unit" className="block text-sm font-medium mb-1">
                Unit
              </label>
              <input
                type="number"
                name="Unit"
                placeholder="Unit"
                className="w-80 border-2 p-2 rounded"
                value={formData.Unit}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="AssetCategory"
                className="block text-sm font-medium mb-1"
              >
                Asset Category
              </label>
              <input
                type="number"
                name="AssetCategory"
                placeholder="Category ID"
                className="w-80 border-2 p-2 rounded"
                value={formData.AssetCategory}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    AssetCategory: Number(e.target.value),
                  }))
                }
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={handleSubmit}
                className="w-50 text-white text-xl bg-blue-500 p-2 rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      <table className="w-full table-auto border-collapse mt-5">
        <thead>
          <tr className="bg-gray-100 border-b border-blue-200">
            <th className="px-4 py-2 text-left">AssetId</th>
            <th className="px-4 py-2 text-left">Asset Name</th>
            <th className="px-4 py-2 text-left">Short Name</th>
            <th className="px-4 py-2 text-left">Description</th>
            <th className="px-4 py-2 text-left">Unit</th>
            {/* <th className="px-4 py-2 text-left">Asset Category</th> */}
            <th className="px-4 py-2 text-left">Asset Category</th>
          </tr>
        </thead>
        <tbody>
          {assetData.map((asset) => (
            <tr
              key={asset.AssetId}
              className="border-b border-blue-100 hover:bg-blue-50"
            >
              <td className="px-4 py-2">{asset.AssetId}</td>
              <td className="px-4 py-2">{asset.Name}</td>
              <td className="px-4 py-2">{asset.Shortname}</td>
              <td className="px-4 py-2">{asset.Description}</td>
              <td className="px-4 py-2">{asset.Unit}</td>
              {/* <td className="px-4 py-2">{asset.AssetCategory}</td> */}
              <td className="px-4 py-2">{asset.AssetCategoryName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
