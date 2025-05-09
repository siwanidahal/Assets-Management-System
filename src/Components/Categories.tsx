import { useEffect, useState } from "react";

interface Category {
  id: number | string;
  name: string;
}

export default function Categories() {
  const [showForm, setShowForm] = useState(false);
  const [categoryData, setCategoryData] = useState<Category[]>([]);
  const [formData, setFormData] = useState<Category>({
    id: "",
    name: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://2k8mf0hg-8001.inc1.devtunnels.ms/api/categories/"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Category[] = await response.json();
        setCategoryData(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === "id" ? value : value });
  };
  const handleSubmit = () => {
    if (!formData.id || !formData.name) {
      alert("Please fill out both ID and Name fields.");
      return;
    }
    const newCategory: Category = {
      id: Number(formData.id),
      name: formData.name,
    };
    setCategoryData((prev) => [...prev, newCategory]);

    setFormData({ id: 0, name: "" });

    setShowForm(false);
  };

  return (
    <div className="h-full border border-gray-200 shadow-xl mt-7 mx-5  ">
      <div className="flex justify-between border-b-2 shadow-xl p-4">
        <h1 className="text-3xl">Categories</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="text-white text-xl px-4 py-2 rounded-2xl"
        >
          {showForm ? "Cancel" : "Add Category"}
        </button>
      </div>

      {showForm && (
        <div className="p-5 space-x-2 space-y-3 flex flex-wrap">
          <input
            type="number"
            name="id"
            value={formData.id}
            placeholder="ID"
            className="border-2 p-1"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Name"
            className="border-2 p-1"
            onChange={handleInputChange}
          />
          <button
            onClick={handleSubmit}
            className="text-white bg-blue-500 px-4 py-1 rounded-2xl"
          >
            Submit
          </button>
        </div>
      )}

      <div className="flex gap-10 pl-3 py-3 font-semibold bg-gray-100 border-b border-blue-200">
        <h1>ID</h1>
        <h1>Name</h1>
      </div>

      {Array.isArray(categoryData) &&
        categoryData.map((category, index) => (
          <div
            key={index}
            className="flex gap-10 pl-3 py-3 border-b border-blue-100 bg-white hover:bg-blue-50"
          >
            <p>{category.id}</p>
            <p>{category.name}</p>
          </div>
        ))}
    </div>
  );
}
