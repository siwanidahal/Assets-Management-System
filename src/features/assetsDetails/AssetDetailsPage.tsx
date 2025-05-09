
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";

interface AssetDetails {
  Sn: number;
  AssetCode: string;
  Price: string;
  PurchaseDate: string;
  Remarks: string;
  Status: string;
  Asset: {
    AssetName: string;
  };
}

export default function Assets() {
  const [showForm, setShowForm] = useState(false);
  const [assetData, setAssetData] = useState<AssetDetails[]>([]);
  const [formData, setFormData] = useState({
    Sn: 0,
    AssetCode: "",
    Price: "",
    PurchaseDate: "",
    Remarks: "",
    Status: "",
    Asset: "",
  });

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await fetch(
          "https://2k8mf0hg-8001.inc1.devtunnels.ms/api/asset-details/"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: AssetDetails[] = await response.json();
        setAssetData(data);
      } catch (error) {
        console.error("Error fetching assets:", error);
      }
    };

    fetchAssets();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (!formData.Sn || !formData.AssetCode) {
      alert("Please fill out both ID and Name fields.");
      return;
    }

    const newAsset: AssetDetails = {
      Sn: formData.Sn,
      AssetCode: formData.AssetCode,
      Price: formData.Price,
      PurchaseDate: formData.PurchaseDate,
      Remarks: formData.Remarks,
      Status: formData.Status,
      Asset: {
        AssetName: formData.Asset,
      },
    };

    setAssetData((prev) => [...prev, newAsset]);

    setFormData({
      Sn: 0,
      AssetCode: "",
      Price: "",
      PurchaseDate: "",
      Remarks: "",
      Status: "",
      Asset: "",
    });

    setShowForm(false);
  };

  return (
    <div className="h-full border-1 border-gray-200 shadow-xl mt-7 ml-5 mr-5">

      {/* Header */}
      <div className="w-full h-15 flex justify-between border-b-2 border-b-gray-100 shadow-xl">
        <h1 className="text-3xl mt-2 ml-4">Assets Details</h1>
        <div className="relative flex items-center gap-4 mr-8 mt-3 mb-3">
          <input
            type="text"
            placeholder="Search"
            className="w-64 border-2 pl-5 pt-1 pb-2 border-gray-300 rounded-2xl"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <CiSearch />
          </div>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="text-white text-xl bg-blue-500 px-4 py-2 rounded-2xl"
        >
          {showForm ? "Cancel" : "Add Asset"}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="p-5 space-x-2 space-y-3 flex flex-wrap">
          {Object.keys(formData).map((key) => (
            <input
              key={key}
              type={
                key === "SN"
                  ? "number"
                  : key === "PurchaseDate"
                  ? "date"
                  : "text"
              }
              name={key}
              value={formData[key as keyof typeof formData]}
              placeholder={key}
              className="border-2 p-1"
              onChange={handleInputChange}
            />
          ))}
          <button
            onClick={handleSubmit}
            className="text-white bg-blue-500 px-4 py-1 rounded-2xl"
          >
            Submit
          </button>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        {/* Header */}
        <div className="pl-3 py-3 font-semibold border-b border-blue-200   gap-6 text-blue-900 ">
          <div className=" mb-3 border-2 text-bla w-fit  pl-5 pr-7">Asset</div>
          <div className=" mb-3">S.N :</div>
          <div className=" mb-3">AssetCode : </div>
          <div className=" mb-3">Price : </div>
          <div className=" mb-3">PurchaseDate : </div>
          <div className="mb-3">Remarks : </div>
          <div className=" mb-3">Status : </div>
        </div>

        {/* Body */}
        {Array.isArray(assetData) &&
          assetData.map((asset, index) => (
            <div
              key={index}
              className="flex gap-6 pl-3 py-3 border-b border-blue-100 bg-white  min-w-[800px]"
            >
              <div className="mb-3 border w-fit  pl-5 pr-7">{asset.Asset.AssetName}</div>
              <div className="mb-3">{asset.Sn}</div>
              <div className="mb-3">{asset.AssetCode}</div>
              <div className="mb-3">{asset.Price}</div>
              <div className="mb-3">{asset.PurchaseDate}</div>
              <div className="mb-3">{asset.Remarks}</div>
              <div className="mb-3">{asset.Status}</div>
            </div>
          ))}
      </div>
    </div>
  );
}

     
   