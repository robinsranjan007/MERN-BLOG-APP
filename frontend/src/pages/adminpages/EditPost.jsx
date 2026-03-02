import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPostById, updatePost } from "../../services/postService";
import { getAllCategory } from "../../services/CategoriesService";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    title: "",
    body: "",
    category: "",
    isPublished: false,
  });
  const [category, setCategory] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  useEffect(() => {
    const postDetails = async () => {
      const [postRes, categoriesRes] = await Promise.all([
        getPostById(id),
        getAllCategory(),
      ]);
      if (postRes.data.success) setData(postRes.data.post);
      if (categoriesRes.data.success) setCategory(categoriesRes.data.category);
    };
    postDetails();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updatePost(data, id);
      if (res.data.success) navigate("/admin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f0e8] flex items-center justify-center py-10">
      <div className="bg-[#fdf8f0] border border-[#c9a96e] rounded-sm shadow-sm p-8 w-full max-w-xl">

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#5c3d1e] tracking-widest uppercase">Edit Post</h1>
          <div className="w-12 h-0.5 bg-[#c9a96e] mt-2"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[#5c3d1e] text-xs font-semibold uppercase tracking-widest mb-1">Title</label>
            <input
              type="text"
              value={data.title}
              name="title"
              onChange={handleChange}
              className="w-full border border-[#c9a96e] bg-[#f5f0e8] rounded-sm px-3 py-2 text-[#5c3d1e] text-sm focus:outline-none focus:border-[#5c3d1e] transition-colors"
            />
          </div>

          <div>
            <label className="block text-[#5c3d1e] text-xs font-semibold uppercase tracking-widest mb-1">Body</label>
            <textarea
              value={data.body}
              name="body"
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
            type="submit"
            className="w-full bg-[#5c3d1e] text-[#f5f0e8] py-2 rounded-sm font-semibold uppercase tracking-widest text-sm hover:bg-[#c9a96e] transition-colors"
          >
            Update Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditPost;