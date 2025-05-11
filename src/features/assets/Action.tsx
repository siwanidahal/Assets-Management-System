import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router";

const Action = ({ assetId }: { assetId: number }) => {
  const [showData, setShowData] = useState<number | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const closeData = () => setShowData(null);
    document.addEventListener("click", closeData);
    return () => {
      document.removeEventListener("click", closeData);
    };
  }, []);

  return (
    <div className="relative flex items-center">
      <div
        onClick={(e) => {
          e.stopPropagation();
          setShowData(showData === assetId ? null : assetId);
        }}
        className="cursor-pointer p-2 hover:bg-gray-200 rounded-full"
      >
        <BsThreeDotsVertical />
      </div>

      {showData && (
        <div className="absolute right-0 mt-2 w-23 bg-white border rounded-lg shadow-lg z-50">
          <button
            className="block w-full text-left px-4 py-1 hover:bg-gray-100"
            onClick={() => navigate(`/assets-details/${assetId}`)}
          >
            View
          </button>
          <button className="block w-full text-left px-4 py-1 hover:bg-gray-100">
            Edit
          </button>
          <button className="block w-full text-left px-4 py-1 hover:bg-gray-100">
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Action;
