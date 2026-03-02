import React, { useEffect, useState } from "react";
import { createCategories, deleteCategory, getAllCategory } from "../../services/CategoriesService";

function Categories() {
  const [data, setData] = useState([]);
  const [newCat, addNewcat] = useState({ name: "" });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getAllCategory();
        if (res.data.success) {
          setData(res.data.category);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    try {
      const res = await createCategories(newCat);
      if (res.data.success) {
        setData((prev) => ([...prev, res.data.category]));
        addNewcat({ name: "" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      const res = await deleteCategory(id);
      if (res.data.success) {
        setData((prev) => prev.filter((val) => val._id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f0e8] px-6 py-10">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#5c3d1e] tracking-widest uppercase">Categories</h1>
        <div className="w-12 h-0.5 bg-[#c9a96e] mt-2"></div>
      </div>

      {/* Add Category */}
      <div className="bg-[#fdf8f0] border border-[#c9a96e] rounded-sm shadow-sm p-5 mb-8 flex gap-3 items-center">
        <input
          type="text"
          name="name"
          placeholder="New category name..."
          value={newCat.name}
          onChange={(e) => addNewcat({ name: e.target.value })}
          className="flex-1 border border-[#c9a96e] bg-[#f5f0e8] rounded-sm px-3 py-2 text-[#5c3d1e] text-sm focus:outline-none focus:border-[#5c3d1e] transition-colors"
        />
        <button
          onClick={handleAddCategory}
          className="bg-[#5c3d1e] text-[#f5f0e8] px-5 py-2 rounded-sm text-sm font-semibold uppercase tracking-widest hover:bg-[#c9a96e] transition-colors"
        >
          + Add
        </button>
      </div>

      {/* Table */}
      <div className="bg-[#fdf8f0] border border-[#c9a96e] rounded-sm shadow-sm overflow-hidden">
        <table className="w-full text-sm text-[#5c3d1e]">
          <thead className="bg-[#e8dcc8] border-b border-[#c9a96e]">
            <tr>
              <th className="text-left px-5 py-3 font-semibold uppercase tracking-widest text-xs">ID</th>
              <th className="text-left px-5 py-3 font-semibold uppercase tracking-widest text-xs">Name</th>
              <th className="text-left px-5 py-3 font-semibold uppercase tracking-widest text-xs">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((cat, index) => (
              <tr key={cat._id} className={`border-b border-[#e8dcc8] ${index % 2 === 0 ? 'bg-[#fdf8f0]' : 'bg-[#f5f0e8]'} hover:bg-[#e8dcc8] transition-colors`}>
                <td className="px-5 py-3 text-xs text-[#8a6d4b]">{cat._id}</td>
                <td className="px-5 py-3 font-medium">{cat.name}</td>
                <td className="px-5 py-3">
                  <button
                    onClick={() => handleDeleteCategory(cat._id)}
                    className="border border-red-400 text-red-600 px-3 py-1 rounded-sm text-xs font-semibold uppercase tracking-wide hover:bg-red-50 transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {data.length === 0 && (
          <p className="text-center text-[#8a6d4b] italic text-sm py-10">No categories yet. Add one!</p>
        )}
      </div>
    </div>
  );
}

export default Categories;