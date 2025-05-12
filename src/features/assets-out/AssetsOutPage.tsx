///project-name: asset-management
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

interface Row {
  id: number;
  Outdate: string;
  DateToReturn: string;
  ReturnDate: string;
  Remarks: string;
  AssetDetail: string;
  OutTo: string;
}

interface Asset {
  Sn: number;
  Asset: number;
  AssetCode: string;
  Price: number;
  PurchaseDate: string;
  Remarks: string;
  Status: string;
  AssetName: string;
}

interface User {
  id: number; // Note: The API returns numbers for id
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string | null;
  address: string | null;
}

interface Pagination {
  current_page: number;
  has_next?: boolean;
  has_previous?: boolean;
  total_items?: number;
  total_pages?: number;
}

export default function AssetTable() {
  const [rows, setRows] = useState<Row[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    Outdate: "",
    DateToReturn: "",
    ReturnDate: "",
    Remarks: "",
    AssetDetail: "",
    OutTo: "",
  });
  const [assets, setAssets] = useState<Asset[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ current_page: 1 });
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get("page");
  const navigate = useNavigate();

  // Fetch rows from the API
  useEffect(() => {
    const fetchRows = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://2k8mf0hg-8001.inc1.devtunnels.ms/api/asset-out/?page=${
            page || 1
          }`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Map API response to match Row interface
        const mappedRows = data.results.map((item: any) => ({
          id: item.Sn, // Map Sn to id
          Outdate: item.Outdate,
          DateToReturn: item.DateToReturn,
          ReturnDate: item.ReturnDate,
          Remarks: item.Remarks,
          AssetDetail: item.AssetCodeName, // Map AssetCodeName to AssetDetail
          OutTo: item.OutToName, // Map OutToName to OutTo
        }));

        setRows(mappedRows);
        setPagination(data.pagination);
      } catch (error) {
        console.error("Error fetching rows:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRows();
  }, [page]);

  // Fetch assets from the API
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://2k8mf0hg-8001.inc1.devtunnels.ms/api/asset-details/"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAssets(data.results); // Make sure to use data.results
      } catch (error) {
        console.error("Error fetching assets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssets();
  }, []);

  // Fetch users from the API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://2k8mf0hg-8001.inc1.devtunnels.ms/api/user/users/"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: User[] = await response.json();
        console.log("Fetched users:", data);
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Add a new row
  const handleAddRow = async () => {
    if (
      !formData.OutTo ||
      !formData.Outdate ||
      !formData.DateToReturn ||
      !formData.AssetDetail
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      const response = await fetch(
        "https://2k8mf0hg-8001.inc1.devtunnels.ms/api/asset-out/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json(); // Parse the error response
        console.error("Error details:", errorData); // Log the error details
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newRow: Row = await response.json();
      setRows([...rows, newRow]);
      setFormData({
        Outdate: "",
        DateToReturn: "",
        ReturnDate: "",
        Remarks: "",
        AssetDetail: "",
        OutTo: "",
      });
      setIsFormOpen(false);
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Failed to save data. Please try again.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextPage = () => {
    if (!pagination || !pagination.has_next) return;
    const nextPage = pagination.current_page + 1;
    navigate(`/assets-out?page=${nextPage}`);
  };

  const prevPage = () => {
    if (!pagination || !pagination.has_previous) return;
    const prevPage = pagination.current_page - 1;
    navigate(`/assets-out?page=${prevPage}`);
  };

  return (
    <div>
      <h1 className="underline font-bold pl-1.5 text-2xl mt-20 flex item-center justify-center">
        Asset-Out Details
      </h1>
      {/* <div className="mt-3 py-2 flex pr-8 justify-end relative">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 pl-7 pr-10 rounded-2xl w-full text-ellipsis text-2xl" // Added padding on right
          />
          <button
            onClick={() => setIsFormOpen((prev) => !prev)}
            className="absolute right-0 top-0 h-full px-4 rounded-r-2xl flex items-center gap-2 text-slate-50 hover:bg-slate-600 bg-slate-800"
          >
            {isFormOpen ? (
              "Cancel"
            ) : (
              <>
                <span>➕</span>
                <span className="hidden md:flex">Add</span>
              </>
            )}
          </button>
        </div>
      </div> */}

      <div className="mt-3 py-2 flex pr-8 justify-end">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 text-ellipsis rounded-l-2xl rounded text-sm"
        />
        <button
          onClick={() => setIsFormOpen((prev) => !prev)}
          className="px-4 rounded-r-2xl py-2 flex gap-2 text-slate-50 hover:bg-slate-600 bg-slate-800"
        >
          {isFormOpen ? (
            "Cancel"
          ) : (
            <>
              <span>➕</span>
              <span className="hidden md:flex">Add</span>
            </>
          )}
        </button>
      </div>

      {isFormOpen && (
        <div className="bg-white shadow-4xl border-2 overflow-hidden min-w-[400px] max-w-[800px] mx-auto p-4">
          <h3 className="text-lg font-semibold mb-3">Add New Record</h3>
          <div className="flex flex-wrap gap-4">
            {/* Out To Field */}
            <div className="flex-1">
              <label
                htmlFor="OutTo"
                className="block text-gray-700 text-sm mb-1"
              >
                Out To
              </label>
              <select
                id="OutTo"
                name="OutTo"
                value={formData.OutTo}
                onChange={handleChange}
                className="border p-2 rounded w-full text-sm"
              >
                <option value="">Select User</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {`${user.first_name} ${user.last_name}`.trim() ||
                      user.username}
                  </option>
                ))}
              </select>
            </div>

            {/* Outdate Field */}
            <div className="flex-1">
              <label
                htmlFor="Outdate"
                className="block text-gray-700 text-sm mb-1"
              >
                Outdate
              </label>
              <input
                type="date"
                id="Outdate"
                name="Outdate"
                value={formData.Outdate}
                onChange={handleChange}
                className="border p-2 rounded w-full text-sm"
              />
            </div>

            {/* Date To Return Field */}
            <div className="flex-1">
              <label
                htmlFor="DateToReturn"
                className="block text-gray-700 text-sm mb-1"
              >
                Date To Return
              </label>
              <input
                type="date"
                id="DateToReturn"
                name="DateToReturn"
                value={formData.DateToReturn}
                onChange={handleChange}
                className="border p-2 rounded w-full text-sm"
              />
            </div>

            {/* Return Date Field */}
            <div className="flex-1">
              <label
                htmlFor="ReturnDate"
                className="block text-gray-700 text-sm mb-1"
              >
                Return Date
              </label>
              <input
                type="date"
                id="ReturnDate"
                name="ReturnDate"
                value={formData.ReturnDate}
                onChange={handleChange}
                className="border p-2 rounded w-full text-sm"
              />
            </div>

            {/* Asset Detail Field */}
            <div className="flex-1">
              <label
                htmlFor="AssetDetail"
                className="block text-gray-700 text-sm mb-1"
              >
                Asset Detail
              </label>
              <select
                id="AssetDetail"
                name="AssetDetail"
                value={formData.AssetDetail}
                onChange={handleChange}
                className="border p-2 rounded w-full text-sm"
              >
                <option value="">Select Asset</option>
                {Array.isArray(assets) &&
                  assets.map((asset) => (
                    <option
                      key={`${asset.Asset}-${asset.AssetCode}`}
                      value={asset.Asset}
                    >
                      {asset.AssetCode}
                    </option>
                  ))}
              </select>
            </div>

            {/* Remarks Field */}
            <div className="flex-1">
              <label
                htmlFor="Remarks"
                className="block text-gray-700 text-sm mb-1"
              >
                Remarks
              </label>
              <input
                type="text"
                id="Remarks"
                name="Remarks"
                placeholder="Remarks"
                value={formData.Remarks}
                onChange={handleChange}
                className="border p-2 rounded w-full text-sm"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={handleAddRow}
              className="bg-gray-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
            >
              Save
            </button>
            <button
              onClick={() => setIsFormOpen(false)}
              className="bg-gray-400 text-white px-4 py-2 rounded text-sm hover:bg-blue-500"
            >
              Don't Save
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-2 mt-3 ">
            <thead className=" text-black text-xs uppercase bg-teal-500">
              <tr>
                <th className="px-4 py-3 border-r-2">Out To</th>
                <th className="px-4 py-3 border-r-2">Outdate</th>
                <th className="px-4 py-3 border-r-2">Date To Return</th>
                <th className="px-4 py-3 border-r-2">Return Date</th>
                <th className="px-4 py-3 border-r-2">Asset Detail</th>
                <th className="px-4 py-3 border-r-2">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {rows.length > 0 ? (
                rows.map((row, index) => (
                  <tr
                    key={`${row.id}-${index}`}
                    className="border-b border-l-2 hover:bg-gray-50"
                  >
                    <td className="px-4 py-2 border-r-2">{row.OutTo}</td>
                    <td className="px-4 py-2 border-r-2">{row.Outdate}</td>
                    <td className="px-4 py-2 border-r-2">{row.DateToReturn}</td>
                    <td className="px-4 py-2 border-r-2">{row.ReturnDate}</td>
                    <td className="px-4 py-2 border-r-2">{row.AssetDetail}</td>
                    <td className="px-4 py-2 border-r-2">{row.Remarks}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-4">
                    No data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex justify-between items-center p-4">
        <button
          onClick={prevPage}
          disabled={!pagination?.has_previous}
          className="bg-blue-400 px-4 py-2 rounded text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <p className="text-gray-700">
          Page {pagination?.current_page} of {pagination?.total_pages}
        </p>
        <button
          onClick={nextPage}
          disabled={!pagination?.has_next}
          className="bg-blue-400 px-4 py-2 rounded text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
}
