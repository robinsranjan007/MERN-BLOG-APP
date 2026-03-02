import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../../services/postService";
import { getComment } from "../../services/commentService";

function Postdetails() {
  const [postdetails, setpostDetails] = useState({});
  const [commnents, setCommnets] = useState([]);
  const [laoding, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const getpostDetails = async () => {
      try {
        setLoading(true);
        const [postRes, commentRes] = await Promise.all([
          getPostById(id),
          getComment(id),
        ]);
        if (postRes.data.success) {
          setpostDetails(postRes.data.post);
        }
        if (commentRes) {
          setCommnets(commentRes.data.comment);
        }
      } catch (error) {
        setError(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };
    getpostDetails();
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      {laoding ? (
        <p className="text-center text-[#8a6d4b] tracking-widest uppercase text-sm pt-20">Loading...</p>
      ) : (
        <div className="max-w-3xl mx-auto px-6 py-12">
          {error ? (
            <p className="text-red-700 text-sm text-center">{error}</p>
          ) : (
            <div>
              {/* Post */}
              <div className="bg-[#fdf8f0] border border-[#c9a96e] rounded-sm shadow-sm p-8 mb-10">
                <p className="text-xs text-[#c9a96e] font-semibold uppercase tracking-widest mb-2">{postdetails.category?.name}</p>
                <h1 className="text-3xl font-bold text-[#5c3d1e] mb-4 leading-snug">{postdetails.title}</h1>
                <div className="w-12 h-0.5 bg-[#c9a96e] mb-4"></div>
                <p className="text-[#5c3d1e] text-sm italic mb-6">By {postdetails.createdBy?.name}</p>
                <p className="text-[#5c3d1e] leading-relaxed">{postdetails.body}</p>
              </div>

              {/* Comments */}
              <div>
                <h2 className="text-xl font-bold text-[#5c3d1e] tracking-widest uppercase mb-4">Comments</h2>
                <div className="w-12 h-0.5 bg-[#c9a96e] mb-6"></div>

                {commnents.length === 0 ? (
                  <p className="text-[#8a6d4b] italic text-sm">No comments yet.</p>
                ) : (
                  commnents.map((comment) => (
                    <div key={comment._id} className="bg-[#fdf8f0] border border-[#e8dcc8] rounded-sm p-4 mb-3">
                      <p className="text-xs font-semibold text-[#c9a96e] uppercase tracking-wide mb-1">{comment.commentedBy?.name}</p>
                      <p className="text-[#5c3d1e] text-sm">{comment.text}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Postdetails;