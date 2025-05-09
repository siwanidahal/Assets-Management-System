// import { useEffect, useState } from "react";
// import { useParams } from "react-router";
// interface AssetDetails {
//   Sn: number;
//   AssetCode: string;
//   Price: string;
//   PurchaseDate: string;
//   Remarks: string;
//   Status: string;
//   Asset: {
    
//     AssetName:string
//   }

// }

// export default function Assets() {
//   const { id } = useParams<{ id: string }>();
//   const [showForm, setShowForm] = useState(false);
//   const [assetData, setAssetData] = useState<AssetDetails[]>([]);
//   const [formData, setFormData] = useState({
//     Sn: 0,
//     AssetCode: "",
//     Price: "",
//     PurchaseDate: "",
//     Remarks: "",
//     Status: "",
//     Asset: "",
//     Info:""
//   });

//   useEffect(() => {
//     const fetchAssets = async () => {
//       try {
//         const response = await fetch(
//           "https://2k8mf0hg-8001.inc1.devtunnels.ms/api/asset-details/"
//         );
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data: AssetDetails[] = await response.json();
//         setAssetData(data);
//       } catch (error) {
//         console.error("Error fetching assets:", error);
//       }
//     };

//     fetchAssets();
//   }, [id]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };
//   const handleSubmit = () => {
//     if (!formData.Sn || !formData.AssetCode) {
//       alert("Please fill out both ID and Name fields.");
//       return;
//     }

//     const newAsset: AssetDetails = {
//       Sn: formData.Sn,
//       AssetCode: formData.AssetCode,
//       Price: formData.Price,
//       PurchaseDate: formData.PurchaseDate,
//       Remarks: formData.Remarks,
//       Status: formData.Status,
//       Asset: {
//         AssetName: formData.Asset,
//       },
//     };
//     setAssetData((prev) => [...prev, newAsset]);

//     setFormData({
//       Sn: 0,
//       AssetCode: "",
//       Price: "",
//       PurchaseDate: "",
//       Remarks: "",
//       Status: "",
//       Asset: "",
//       Info:""
//     });

//     setShowForm(false);
//   };

//   return (

    
//       <div className="h-full border border-gray-200 shadow-xl mt-7 mx-5">
//         <div className="flex justify-between border-b-2 shadow-xl p-4">
//           <h1 className="text-3xl">Assets Details</h1>
//           <button
//             onClick={() => setShowForm(!showForm)}
//             className="text-white text-xl bg-blue-500 px-4 py-2 rounded-2xl"
//           >
//             {showForm ? "Cancel" : "Add Asset"}
//           </button>
//         </div>

//       {showForm && (
//         <div className="p-5 space-x-2 space-y-3 flex flex-wrap">
//           {Object.keys(formData).map((key) => (
//             <input
//               key={key}
//               type={
//                 key === "SN"
//                   ? "number"
//                   : key === "PurchaseDate"
//                   ? "date"
//                   : "text"
//               }
//               name={key}
//               value={formData[key as keyof typeof formData]}
//               placeholder={key}
//               className="border-2 p-1"
//               onChange={handleInputChange}
//             />
//           ))}
//           <button
//             onClick={handleSubmit}
//             className="text-white bg-blue-500 px-4 py-1 rounded-2xl"
//           >
//             Submit
//           </button>
//         </div>
//       )}

        
//         <div className="flex gap-20 pl-3 py-3 font-semibold bg-gray-100 border-b border-blue-200">
//           <div  className="w-20">S.N</div>
//           <div className="w-40">AssetCode</div>
//           <div className="w-24">Price</div>
//           <div className="w-24" >PurchaseDate</div>
//           <div className="w-40">Remarks</div>
//           <div className="w-32">Status</div>
//           <div className="w-40">Asset</div>
//         </div>

        
//         {assetData.map((asset, index) => (
//           <div
//             key={index}
//             className="flex  gap-20 pl-3 py-3 border-b border-blue-100 bg-white hover:bg-blue-50"
//           >
//             <div className="w-20">{asset.Sn}</div>
//             <div className="w-40" >{asset.AssetCode}</div>
//             <div className="w-24">{asset.Price}</div>
//             <div  className="w-24">{asset.PurchaseDate}</div>
//             <div  className="w-40" >{asset.Remarks}</div>
//             <div className="w-32">{asset.Status}</div>
//             <div className="w-40">{asset.Asset.AssetName}</div>
//           </div>
//         ))}
//       </div>
    
//   );
// }

