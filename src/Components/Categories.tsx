
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

interface Category {
  id: number;  // Changed from Id to id
  name: string; // Changed from Name to name
}

interface CategoryResponse {
  pagination: Pagination;
  status: string;
  message: string;
  results: Category[];
}

interface Pagination {
  current_page: number;
  has_next?: boolean;
  has_previous?: boolean;
  total_items?: number;
  total_pages?: number;
}

const CATEGORY_URL = "https://2k8mf0hg-8001.inc1.devtunnels.ms/api/categories/";

export default function Categories() {
  const [categoryData, setCategoryData] = useState<Category[]>([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get("page");
  const navigate = useNavigate();

  const [pagination, setPagination] = useState<Pagination>({
    current_page: page ? parseInt(page) : 1,
  });

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch(CATEGORY_URL + `?page=${page}`);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data: CategoryResponse = await response.json();
      
      // Transform data to match the expected format
      const formattedData = data.results.map(item => ({
        id: item.id || item.id, // Handle both cases
        name: item.name || item.name // Handle both cases
      }));
      
      setCategoryData(formattedData);
      setPagination(data.pagination);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, [page]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const nextPage = () => {
    if (!pagination.has_next) return;
    const nPage = pagination.current_page + 1;
    navigate(`/categories?page=${nPage}`);
  };

  const prevPage = () => {
    if (!pagination.has_previous) return;
    const nPage = pagination.current_page - 1;
    navigate(`/categories?page=${nPage}`);
  };

  return (
    <div className="h-full border-1 border-gray-200 shadow-xl mt-7 ml-5 mr-5">
      <div className="w-full h-15 flex justify-between border-b-2 border-b-gray-100 shadow-xl">
        <h1 className="text-3xl mt-2 ml-4">Categories</h1>
      </div>

      <table className="w-full table-auto border-collapse mt-5">
        <thead>
          <tr className="bg-gray-100 border-b border-blue-200">
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Name</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(categoryData) &&
            categoryData.map((category) => (
              <tr
                key={category.id}
                className="border-b border-blue-100 hover:bg-blue-50"
              >
                <td className="px-4 py-2">{category.id}</td>
                <td className="px-4 py-2">{category.name}</td>
              </tr>
            ))}
        </tbody>
      </table>

      <div className="flex justify-between p-4">
        <button
          onClick={prevPage}
          disabled={!pagination.has_previous}
          className="bg-blue-400 px-4 py-2 rounded text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={nextPage}
          disabled={!pagination.has_next}
          className="bg-blue-400 px-4 py-2 rounded text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
}