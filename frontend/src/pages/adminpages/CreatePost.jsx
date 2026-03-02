import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../services/postService";
import { getAllCategory } from "../../services/CategoriesService";

function CreatePost() {
  const [data, setData] = useState({
    title: "",
    body: "",
    category: "",
    isPublished: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getAllCategory();
      if (res.data.success) setCategory(res.data.category);
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await createPost(data);
      if (res.data.success) navigate("/admin");
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f0e8] flex items-center justify-center py-10">
      <div className="bg-[#fdf8f0] border border-[#c9a96e] rounded-sm shadow-sm p-8 w-full max-w-xl">

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#5c3d1e] tracking-widest uppercase">Create Post</h1>
          <div className="w-12 h-0.5 bg-[#c9a96e] mt-2"></div>
        </div>

        {error && <p className="text-red-700 text-sm bg-red-50 border border-red-200 rounded px-3 py-2 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[#5c3d1e] text-xs font-semibold uppercase tracking-widest mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={data.title}
              onChange={handleChange}
              className="w-full border border-[#c9a96e] bg-[#f5f0e8] rounded-sm px-3 py-2 text-[#5c3d1e] text-sm focus:outline-none focus:border-[#5c3d1e] transition-colors"
            />
          </div>

          <div>
            <label className="block text-[#5c3d1e] text-xs font-semibold uppercase tracking-widest mb-1">Body</label>
            <textarea
              name="body"
              value={data.body}
              onChange={handleChange}
              rows={6}
              className="w-full border border-[#c9a96e] bg-[#f5f0e8] rounded-sm px-3 py-2 text-[#5c3d1e] text-sm focus:outline-none focus:border-[#5c3d1e] transition-colors resize-none"
            />
          </div>

          <div>
            <label className="block text-[#5c3d1e] text-xs font-semibold uppercase tracking-widest mb-1">Category</label>
            <select
              name="category"
              value={data.category}
              onChange={handleChange}
              className="w-full border border-[#c9a96e] bg-[#f5f0e8] rounded-sm px-3 py-2 text-[#5c3d1e] text-sm focus:outline-none focus:border-[#5c3d1e] transition-colors"
            >
              <option value="">Select a Category</option>
              {category.map((cat) => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isPublished"
              checked={data.isPublished}
              onChange={handleChange}
              className="accent-[#5c3d1e]"
            />
            <label className="text-[#5c3d1e] text-sm font-medium">Publish Post</label>
          </div>

          <button
            disabled={loading}
            className="w-full bg-[#5c3d1e] text-[#f5f0e8] py-2 rounded-sm font-semibold uppercase tracking-widest text-sm hover:bg-[#c9a96e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating..." : "Create Post"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;