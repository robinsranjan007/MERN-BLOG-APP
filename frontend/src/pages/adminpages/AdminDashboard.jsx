import React, { useEffect, useState } from "react";
import { deletePost, getPost } from "../../services/postService";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getAllPosts = async () => {
      try {
        const res = await getPost();
        if (res) {
          setPosts(res.data.posts);
        }
      } catch (error) {
        setError(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };
    getAllPosts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await deletePost(id);
      if (res.data.success) {
        setPosts((prev) => prev.filter((post) => post._id !== id));
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f0e8] px-6 py-10">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#5c3d1e] tracking-widest uppercase">All Posts</h1>
          <div className="w-12 h-0.5 bg-[#c9a96e] mt-2"></div>
        </div>
        <button
          onClick={() => navigate("/admin/create-post")}
          className="bg-[#5c3d1e] text-[#f5f0e8] px-5 py-2 rounded-sm text-sm font-semibold uppercase tracking-widest hover:bg-[#c9a96e] transition-colors"
        >
          + Create Post
        </button>
      </div>

      {error && <p className="text-red-700 text-sm mb-4">{error}</p>}

      {loading ? (
        <p className="text-center text-[#8a6d4b] tracking-widest uppercase text-sm">Loading...</p>
      ) : (
        <div className="bg-[#fdf8f0] border border-[#c9a96e] rounded-sm shadow-sm overflow-hidden">
          <table className="w-full text-sm text-[#5c3d1e]">
            <thead className="bg-[#e8dcc8] border-b border-[#c9a96e]">
              <tr>
                <th className="text-left px-5 py-3 font-semibold uppercase tracking-widest text-xs">Title</th>
                <th className="text-left px-5 py-3 font-semibold uppercase tracking-widest text-xs">Body</th>
                <th className="text-left px-5 py-3 font-semibold uppercase tracking-widest text-xs">Created By</th>
                <th className="text-left px-5 py-3 font-semibold uppercase tracking-widest text-xs">Category</th>
                <th className="text-left px-5 py-3 font-semibold uppercase tracking-widest text-xs">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, index) => (
                <tr key={post._id} className={`border-b border-[#e8dcc8] ${index % 2 === 0 ? 'bg-[#fdf8f0]' : 'bg-[#f5f0e8]'} hover:bg-[#e8dcc8] transition-colors`}>
                  <td className="px-5 py-3 font-medium">{post?.title}</td>
                  <td className="px-5 py-3 text-[#8a6d4b] max-w-xs truncate">{post?.body}</td>
                  <td className="px-5 py-3">{post?.createdBy?.name}</td>
                  <td className="px-5 py-3">{post?.category?.name}</td>
                  <td className="px-5 py-3 flex gap-2">
                    <button
                      onClick={() => navigate(`/admin/edit-post/${post._id}`)}
                      className="bg-[#5c3d1e] text-[#f5f0e8] px-3 py-1 rounded-sm text-xs font-semibold uppercase tracking-wide hover:bg-[#c9a96e] transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="border border-red-400 text-red-600 px-3 py-1 rounded-sm text-xs font-semibold uppercase tracking-wide hover:bg-red-50 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {posts.length === 0 && (
            <p className="text-center text-[#8a6d4b] italic text-sm py-10">No posts yet. Create one!</p>
          )}
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;