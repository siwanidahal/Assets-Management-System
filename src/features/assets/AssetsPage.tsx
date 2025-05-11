import { useCallback, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useLocation, useNavigate } from "react-router";
import Action from "./Action";

// interface Asset {
//   AssetId: number;
//   Name: string;
//   Shortname: string;
//   AssetCategory: number;
//   AssetCategoryName: string;
//   Unit: number;
//   Description: string;
// }

// interface PaginatedAssets {
//   count: number;
//   next: string | null;
//   previous: string | null;
//   results: Asset[];
// }

// export default function Assets() {
//   const [showForm, setShowForm] = useState(false);
//   const [nextPage, setNextPage] = useState<string | null>(null);
//   const [prevPage, setPrevPage] = useState<string | null>(null);
//   const [assetData, setAssetData] = useState<Asset[]>([]);
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     AssetId: 0,
//     Name: "",
//     Shortname: "",
//     AssetCategory: 67,
//     Unit: 0,
//     Description: "",
//   });

//   useEffect(() => {
//     fetchAssets();
//   }, []);

//   const fetchAssets = async (
//     url: string = "https://2k8mf0hg-8001.inc1.devtunnels.ms/api/assets/"
//   ): Promise<void> => {
//     try {
//       const response = await fetch(url);
//       if (!response.ok)
//         throw new Error(`HTTP error! status: ${response.status}`);
//       const data: PaginatedAssets = await response.json();

//       setAssetData(data.results);
//       setNextPage(data.next);
//       setPrevPage(data.previous);
//     } catch (error) {
//       console.error("Error fetching assets:", error);
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: name === "Unit" || name === "AssetId" ? Number(value) : value,
//     }));
//   };

//   const handleSubmit = async () => {
//     try {
//       const payload = {
//         Name: formData.Name,
//         Shortname: formData.Shortname,
//         Description: formData.Description,
//         Unit: String(formData.Unit),
//         AssetCategory: formData.AssetCategory,
//       };

//       const response = await fetch(
//         "https://2k8mf0hg-8001.inc1.devtunnels.ms/api/assets/",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(payload),
//         }
//       );

//       if (!response.ok) throw new Error("Failed to post data");

//       await fetchAssets();
//       setFormData({
//         AssetId: 0,
//         Name: "",
//         Shortname: "",
//         AssetCategory: 0,
//         Unit: 0,
//         Description: "",
//       });
//       setShowForm(false);
//     } catch (error) {
//       console.error("Error posting asset:", error);
//     }
//   };

//   return (
//     <div className="h-full border-1 border-gray-200 shadow-xl mt-7 ml-5 mr-5">
//       <div className="w-full h-15 flex justify-between border-b-2 border-b-gray-100  shadow-xl">
//         <h1 className="text-3xl mt-2 ml-4">Assets</h1>
//         <div className="relative flex items-center gap-4 mr-8 mt-3 mb-3">
//           <input
//             type="text"
//             placeholder="Search"
//             className="w-90 border-2 pl-5 pt-1 pb-2 border-gray-300 rounded-2xl"
//           />
//           <div className="absolute right-3 top-1/2 transform -translate-y-1/2 ">
//             <CiSearch />
//           </div>
//         </div>
//         <button
//           onClick={() => setShowForm(!showForm)}
//           className="text-white text-xl bg-blue-500 p-1 pl-4 mb-2 pr-4 mt-3 mr-8 rounded-2xl"
//         >
//           {showForm ? "X" : "Add Asset"}
//         </button>
//       </div>

//       {showForm && (
//         <div className="p-4">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
//             <div>
//               <label htmlFor="Name" className="block text-sm font-medium mb-1">
//                 Name
//               </label>
//               <input
//                 type="text"
//                 name="Name"
//                 placeholder="Name"
//                 className="w-80 border-2 p-2 rounded"
//                 value={formData.Name}
//                 onChange={handleChange}
//               />
//             </div>
//             <div>
//               <label
//                 htmlFor="Shortname"
//                 className="block text-sm font-medium mb-1"
//               >
//                 Short Name
//               </label>
//               <input
//                 type="text"
//                 name="Shortname"
//                 placeholder="Short Name"
//                 className="w-80 border-2 p-2 rounded"
//                 value={formData.Shortname}
//                 onChange={handleChange}
//               />
//             </div>
//             <div>
//               <label
//                 htmlFor="Description"
//                 className="block text-sm font-medium mb-1"
//               >
//                 Description
//               </label>
//               <input
//                 type="text"
//                 name="Description"
//                 placeholder="Description"
//                 className="w-80 border-2 p-2 rounded"
//                 value={formData.Description}
//                 onChange={handleChange}
//               />
//             </div>
//             {/* <div>
//               <label htmlFor="Unit" className="block text-sm font-medium mb-1">
//                 Unit
//               </label>
//               <input
//                 type="number"
//                 name="Unit"
//                 placeholder="Unit"
//                 className="w-80 border-2 p-2 rounded"
//                 value={formData.Unit}
//                 onChange={handleChange}
//               />
//             </div> */}
//             <div>
//               <label
//                 htmlFor="AssetCategory"
//                 className="block text-sm font-medium mb-1"
//               >
//                 Asset Category
//               </label>
//               <input
//                 type="number"
//                 name="AssetCategory"
//                 placeholder="Category ID"
//                 className="w-80 border-2 p-2 rounded"
//                 value={formData.AssetCategory}
//                 onChange={(e) =>
//                   setFormData((prev) => ({
//                     ...prev,
//                     AssetCategory: Number(e.target.value),
//                   }))
//                 }
//               />
//             </div>
//             <div className="flex items-end">
//               <button
//                 onClick={handleSubmit}
//                 className="w-50 text-white text-xl bg-blue-500 p-2 rounded"
//               >
//                 Submit
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <table className="w-full table-auto border-collapse mt-5">
//         <thead>
//           <tr className="bg-gray-100 border-b border-blue-200">
//             <th className="px-4 py-2 text-left">AssetId</th>
//             <th className="px-4 py-2 text-left">Asset Name</th>
//             <th className="px-4 py-2 text-left">Short Name</th>
//             <th className="px-4 py-2 text-left">Description</th>
//             <th className="px-4 py-2 text-left">Unit</th>
//             {/* <th className="px-4 py-2 text-left">Asset Category</th> */}
//             <th className="px-4 py-2 text-left">Asset Category</th>
//           </tr>
//         </thead>
//         <tbody>
//           {Array.isArray(assetData) &&
//             assetData.map((asset) => (
//               <tr
//                 key={asset.AssetId}
//                 className="border-b border-blue-100 hover:bg-blue-50"
//                 onClick={() => navigate(`/assets/${asset.AssetId}`)}
//               >
//                 <td className="px-4 py-2">{asset.AssetId}</td>
//                 <td className="px-4 py-2">{asset.Name}</td>
//                 <td className="px-4 py-2">{asset.Shortname}</td>
//                 <td className="px-4 py-2">{asset.Description}</td>
//                 <td className="px-4 py-2">{asset.Unit}</td>
//                 {/* <td className="px-4 py-2">{asset.AssetCategory}</td> */}
//                 <td className="px-4 py-2">{asset.AssetCategoryName}</td>
//               </tr>
//             ))}
//         </tbody>
//       </table>

//       <div className="flex justify-between p-4">
//         <button
//           onClick={() => prevPage && fetchAssets(prevPage)}
//           disabled={!prevPage}
//           className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
//         >
//           Previous
//         </button>
//         <button
//           onClick={() => nextPage && fetchAssets(nextPage)}
//           disabled={!nextPage}
//           className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }

interface Asset {
  AssetId: number;
  Name: string;
  Shortname: string;
  AssetCategory: number;
  AssetCategoryName: string;
  Unit: number;
  Description: string;
}

interface AssetResponse {
  pagination: Pagination;
  status: string;
  message: string;
  results: Asset[];
}

interface Pagination {
  current_page: number;
  has_next?: boolean;
  has_previous?: boolean;
  total_items?: number;
  total_pages?: number;
}
const ASSETS_URL = "https://2k8mf0hg-8001.inc1.devtunnels.ms/api/assets/";
export default function Assets() {
  const [showForm, setShowForm] = useState(false);
  const [assetData, setAssetData] = useState<Asset[]>([]);
  const location = useLocation();
  console.log(location);
  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get("page") || "1";
  const [pagination, setPagination] = useState<Pagination>({
    current_page: page ? parseInt(page) : 1,
  });
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    AssetId: 0,
    Name: "",
    Shortname: "",
    AssetCategory: 67,
    Unit: 0,
    Description: "",
  });

  const fetchAssets = useCallback(async () => {
    try {
      const response = await fetch(ASSETS_URL + `?page=${page}`);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const data: AssetResponse = await response.json();

      setAssetData(data.results);
      setPagination(data.pagination);
    } catch (error) {
      console.error("Error fetching assets:", error);
    }
  }, [page]);
  useEffect(() => {
    fetchAssets();
  }, [fetchAssets]);
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
        AssetCategory: formData.AssetCategory,
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
  const nextPage = () => {
    if (!pagination.has_next) return;
    const nPage = pagination.current_page + 1;
    navigate(`/assets?page=${nPage}`);
  };
  const prevPage = () => {
    if (!pagination.has_previous) return;
    const nPage = pagination.current_page - 1;
    navigate(`/assets?page=${nPage}`);
  };
  return (
    <div className="h-full border-1 border-gray-200 shadow-xl mr-5">
      <div className="w-full h-15 flex justify-between border-b-2 border-b-gray-100 shadow-xl">
        <h1 className="text-3xl mt-2 ml-4">Assets</h1>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 nowrap">
            <div>
              <label htmlFor="Name" className="block text-sm font-medium mb-1 ">
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
            <th className="px-4 py-2 text-left">Asset Category</th>
            <th className="px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(assetData) &&
            assetData.map((asset) => (
              <tr
                key={asset.AssetId}
                className="border-b border-blue-100 hover:bg-blue-50"
                // onClick={() => navigate(`/assets-details/${asset.AssetId}`)}
              >
                <td className="px-4 py-2">{asset.AssetId}</td>
                <td className="px-4 py-2  text-balance">{asset.Name}</td>
                <td className="px-4 py-2">{asset.Shortname}</td>
                <td className="px-4 py-2 line-clamp-2 leading-8">
                  {asset.Description}
                </td>
                <td className="px-4 py-2">{asset.Unit}</td>
                <td className="px-4 py-2">{asset.AssetCategoryName}</td>
                <td className="px-4 py-2 relative">
                  <Action assetId={asset.AssetId} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <div className="flex justify-between mt-4">
        <button
          disabled={!pagination.has_previous}
          className={
            "bg-blue-500 text-white px-4 py-2 rounded" +
            (!pagination.has_previous ? " opacity-50 cursor-not-allowed" : "")
          }
          onClick={prevPage}
        >
          Previous
        </button>
        <button
          disabled={!pagination.has_next}
          className={
            "bg-blue-500 text-white px-4 py-2 rounded" +
            (!pagination.has_next ? " opacity-50 cursor-not-allowed" : "")
          }
          onClick={nextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}
