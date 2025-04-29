import { useEffect, useState } from "react";

type Asset = {
  AssetId: number;
  Name: string;
  Shortname: string;
  Assetcategory: string;
  Unit: number;
};

export default function Assets() {
  const [showForm, setShowForm] = useState(false);
  const [assetData, setAssetData] = useState<Asset[]>([]);

  const fetchAssets = async () => {
    try {
      const response = await fetch(
        "http://https://2k8mf0hg-8001.inc1.devtunnels.ms//api/assets/"
      );
      const data = await response.json();
      setAssetData(data);
    } catch (error) {
      console.error("Error fetching assets:", error);
    }
  };
  useEffect(() => {
    fetchAssets();
  }, []);

  // const assetDatas = [
  //   {
  //     AssetId: 1,
  //     Name: "Laptop",
  //     Shortname: "lp",
  //     Assetcategory: "Electronics",
  //     Unit: 1,
  //   },
  //   {
  //     AssetId: 2,
  //     Name: "Laptop",
  //     Shortname: "lp",
  //     Assetcategory: "Electronics",
  //     Unit: 1,
  //   },
  //   {
  //     AssetId: 3,
  //     Name: "Laptop",
  //     Shortname: "lp",
  //     Assetcategory: "Electronics",
  //     Unit: 1,
  //   },
  // ];

  return (
    <>
      <div className="h-full border-1 border-gray-200 shadow-xl mt-7 ml-5 mr-5 ">
        <div className="w-full h-15 flex justify-between border-b-2 border-b-gray-100 shadow-xl ">
          <h1 className="text-3xl mt-2 ml-4">Assets</h1>
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
              type="number"
              name="Unit"
              placeholder="Unit"
              className="border-2 p-1"
            />
            <input
              type="text"
              name="Assetcategory"
              placeholder="Category"
              className="border-2 p-1"
            />
            <input
              type="number"
              name="Description"
              placeholder="Description"
              className="border-2 p-1"
            />
            <button className="text-white text-xl bg-blue-500 p-1 pl-2 pr-2 mt-1 mr-1 rounded-2xl">
              Submit
            </button>
          </div>
        )}

        <div className="flex gap-7 pl-3 py-3 font-semibold bg-gray-100 border-b border-blue-200">
          <h1>AssetId</h1>
          <h1>Asset Name</h1>
          <h1>Short Name</h1>
          <h1>Unit</h1>
          <h1>AssetCategory</h1>
        </div>

        {assetData.map((asset) => (
          <div
            key={asset.AssetId}
            className="flex gap-22 pl-3 py-3 border-b border-blue-100 bg-white hover:bg-blue-50"
          >
            <p>{asset.AssetId}</p>
            <p>{asset.Name}</p>
            <p>{asset.Shortname}</p>
            <p>{asset.Unit}</p>
            <p>{asset.Assetcategory}</p>
          </div>
        ))}
      </div>
    </>
  );
}
