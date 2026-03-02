import React, { useState } from "react";
import { register } from "../../services/authService";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [data, setData] = useState({ name: "", email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleOnchange = (e) => {
    const { name, value } = e.target
    setData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      setLoading(true)
      const res = await register(data)
      if (res.data.success) {
        navigate('/login')
      }
    } catch (error) {
      setError(error.response.data.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f0e8] flex items-center justify-center">
      <div className="bg-[#fdf8f0] border-2 border-[#c9a96e] rounded-sm shadow-lg p-8 w-full max-w-md">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#5c3d1e] tracking-widest uppercase">Toronto Blogs</h1>
          <div className="w-16 h-0.5 bg-[#c9a96e] mx-auto mt-2"></div>
          <p className="text-[#8a6d4b] text-sm mt-2 tracking-wide italic">Join our community</p>
        </div>

        {error && <p className="text-red-700 text-sm font-medium bg-red-50 border border-red-200 rounded px-3 py-2 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[#5c3d1e] text-sm font-semibold tracking-wide uppercase mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleOnchange}
              className="w-full border border-[#c9a96e] bg-[#fdf8f0] rounded-sm px-3 py-2 text-[#5c3d1e] focus:outline-none focus:border-[#5c3d1e] transition-colors"
            />
          </div>
          <div>
            <label className="block text-[#5c3d1e] text-sm font-semibold tracking-wide uppercase mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleOnchange}
              className="w-full border border-[#c9a96e] bg-[#fdf8f0] rounded-sm px-3 py-2 text-[#5c3d1e] focus:outline-none focus:border-[#5c3d1e] transition-colors"
            />
          </div>
          <div>
            <label className="block text-[#5c3d1e] text-sm font-semibold tracking-wide uppercase mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={handleOnchange}
              className="w-full border border-[#c9a96e] bg-[#fdf8f0] rounded-sm px-3 py-2 text-[#5c3d1e] focus:outline-none focus:border-[#5c3d1e] transition-colors"
            />
          </div>

          <button
            disabled={!data.email || !data.password || !data.name || loading}
            className="w-full bg-[#5c3d1e] text-[#f5f0e8] py-2 rounded-sm font-semibold tracking-widest uppercase hover:bg-[#c9a96e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <div className="text-center mt-6">
          <div className="w-full h-px bg-[#c9a96e] mb-4"></div>
          <p className="text-[#8a6d4b] text-sm">Already have an account?{' '}
            <Link to="/login" className="text-[#5c3d1e] font-semibold hover:text-[#c9a96e] transition-colors">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register