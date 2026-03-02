import React, { useEffect, useState } from 'react'
import { getPost } from '../../services/postService'
import { useNavigate } from 'react-router-dom'

function Home() {
  const [loading, setLoading] = useState(false)
  const [postdata, setPostdata] = useState([])
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchpost = async () => {
      try {
        setLoading(true)
        const res = await getPost()
        if (res.data.success) {
          setPostdata(res.data.post)
        }
      } catch (error) {
        setError(error.response.data.message)
      } finally {
        setLoading(false)
      }
    }
    fetchpost()
  }, [])

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      
      {/* Header */}
      <div className="text-center py-12 border-b-2 border-[#c9a96e]">
        <h1 className="text-4xl font-bold text-[#5c3d1e] tracking-widest uppercase">Stories Worth Reading</h1>
        <div className="w-24 h-0.5 bg-[#c9a96e] mx-auto mt-3"></div>
        <p className="text-[#8a6d4b] italic mt-3 text-sm tracking-wide">Curated stories from Toronto and beyond</p>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        
        {error && <p className="text-red-700 text-sm text-center mb-6">{error}</p>}
        
        {loading ? (
          <p className="text-center text-[#8a6d4b] tracking-widest uppercase text-sm">Loading stories...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {postdata?.map((posts) => (
              <div key={posts._id} className="bg-[#fdf8f0] border border-[#c9a96e] rounded-sm shadow-sm hover:shadow-md transition-shadow flex flex-col">
                
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-xs text-[#c9a96e] font-semibold uppercase tracking-widest mb-2">{posts.category?.name}</span>
                  <h2 className="text-xl font-bold text-[#5c3d1e] mb-3 leading-snug">{posts.title}</h2>
                  <p className="text-[#8a6d4b] text-sm leading-relaxed flex-1 line-clamp-3">{posts.body}</p>
                  
                  <div className="mt-4 pt-4 border-t border-[#e8dcc8] flex items-center justify-between">
                    <span className="text-xs text-[#8a6d4b] italic">By {posts.createdBy?.name}</span>
                    <button
                      onClick={() => navigate(`/posts/${posts._id}`)}
                      className="text-xs text-[#5c3d1e] font-semibold uppercase tracking-wide hover:text-[#c9a96e] transition-colors"
                    >
                      Read More →
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

        {!loading && postdata.length === 0 && (
          <p className="text-center text-[#8a6d4b] italic mt-10">No stories yet. Check back soon.</p>
        )}
      </div>
    </div>
  )
}

export default Home