import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { CiSearch } from "react-icons/ci";
import { IoArrowBack } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";

interface AssetDetails {
  Sn: number;
  Asset: number;
  AssetName: string;
  AssetCode: string;
  Price: number;
  PurchaseDate: string;
  Remarks: string;
  Status: string;
}

interface Pagination {
  current_page: number;
  has_next: boolean;
  has_previous: boolean;
  total_items?: number;
  total_pages?: number;
}

interface AssetDetailsResponse {
  pagination: Pagination;
  status: string;
  message: string;
  results: AssetDetails[];
}

const AssetDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const [assetData, setAssetData] = useState<AssetDetails[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    current_page: 1,
    has_next: false,
    has_previous: false,
  });
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [searchTerm, setSearchTerm] = useState("");
  const pageParam = queryParams.get("page") || "1";
  const currentPage = pageParam ? parseInt(pageParam) : 1;

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await fetch(
          `https://2k8mf0hg-8001.inc1.devtunnels.ms/api/asset-details/?page=${currentPage}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: AssetDetailsResponse = await response.json();
        setAssetData(data.results);
        setPagination(data.pagination);
      } catch (error) {
        console.error("Error fetching assets:", error);
      }
    };

    fetchAssets();
  }, [currentPage]);

  const nextPage = () => {
    if (!pagination.has_next) return;
    const nextPage = pagination.current_page + 1;
    navigate(`/asset-details?page=${nextPage}`);
  };

  const prevPage = () => {
    if (!pagination.has_previous) return;
    const prevPage = pagination.current_page - 1;
    navigate(`/asset-details?page=${prevPage}`);
  };
  const filteredAssets = assetData.filter((asset) =>
    asset.AssetName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-1">
      {openMenu && (
        <div
          onClick={() => setOpenMenu(null)}
          className="fixed inset-0 h-full w-screen bg-white/20"
        />
      )}

      <div className="min-h-screen bg-gray-50 p-1">
        <div className="flex flex-col sm:flex-row justify-between items-center p-6 ">
          <div className="flex items-center">
            <button
              onClick={() => navigate("/")}
              className="mr-4 p-2 rounded-full bg-white shadow"
            >
              <IoArrowBack className="text-2xl text-black-500 font-light " />
            </button>
          </div>
          <h1 className="text-3xl font-semibold text-teal-600 mb-4 ">
            Assets Details
          </h1>
          <div className="relative w-full sm:w-64 shadow-md rounded-lg text-lg">
            <input
              type="text"
              placeholder="Search assets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
            <CiSearch className="absolute left-3 top-3  text-lg" />
          </div>
        </div>

        <div className="overflow-x-auto shadow-md rounded-lg m-4">
          <table className="min-w-full divide-y divide-gray-200 ">
            <thead className="bg-teal-500 text-white ">
              <tr>
                {/* <th className="px-6 py-3 text-left text-sm font-semibold  uppercase">
                  Sn
                </th> */}
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  Asset ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  Code
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  Purchase Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  Remarks
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAssets.map((asset) => (
                <tr
                  key={asset.Sn}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {/* <td className="px-6 py-4 text-sm">{asset.Sn}</td> */}
                  <td className="px-6 py-4 text-sm ">{asset.Asset}</td>
                  <td className="px-6 py-4 text-sm text-teal-700">
                    {asset.AssetName}
                  </td>
                  <td className="px-6 py-4 text-sm">{asset.AssetCode}</td>
                  <td className="px-6 py-4 text-sm">
                    {asset.Price.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm">{asset.PurchaseDate}</td>
                  <td className="px-6 py-4 text-sm">{asset.Remarks}</td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        asset.Status === "working"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {asset.Status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm relative">
                    <div className="relative inline-block text-left">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log(openMenu, asset.Asset);
                          setOpenMenu(openMenu === asset.Sn ? null : asset.Sn);
                        }}
                        className="text-black focus:outline-none"
                      >
                        <BsThreeDotsVertical className="" />
                      </button>
                      {openMenu === asset.Sn && (
                        <div className="absolute left-0 mt-1 w-20 rounded shadow z-10 bg-white border text-xs">
                          <button className="block w-full text-left px-2 py-1 hover:bg-gray-100">
                            View
                          </button>
                          <button className="block w-full text-left px-2 py-1 hover:bg-gray-100">
                            Edit
                          </button>
                          <button className="block w-full text-left px-2 py-1 hover:bg-gray-100 text-red-500">
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-6 py-4 bg-gray-50 ">
          <div className="text-sm ">Page {pagination.current_page}</div>
          <div className="flex space-x-2">
            <button
              onClick={prevPage}
              disabled={!pagination.has_previous}
              className={`px-4 py-2 border border-gray-300 rounded-md text-sm font-medium ${
                pagination.has_previous
                  ? "bg-blue-600 text-white hover:bg-gray-50"
                  : "bg-teal-500 text-white "
              }`}
            >
              Previous
            </button>
            <button
              onClick={nextPage}
              disabled={!pagination.has_next}
              className={`px-4 py-2 border border-gray-300 rounded-md text-sm font-medium ${
                pagination.has_next
                  ? "bg-blue-600 text-white hover:bg-gray-50"
                  : "bg-teal-500  text-white"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetDetailsPage;
