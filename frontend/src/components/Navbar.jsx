import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLogout } from "../redux/slices/authSlice";
import { logout } from "../services/authService.js";

function Navbar() {
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await logout();
    dispatch(setLogout());
    navigate("/login");
  };

  return (
    <div className="bg-[#f5f0e8] border-b-2 border-[#c9a96e] px-6 py-4 flex justify-between items-center shadow-sm">
      <div>
        {isLoggedIn && user.role === "admin" ? (
          <Link to="/admin/create-post" className="text-[#5c3d1e] font-medium text-base hover:text-[#c9a96e] transition-colors tracking-wide">
            Posts
          </Link>
        ) : (
          <Link to="/" className="text-[#5c3d1e] font-medium text-base hover:text-[#c9a96e] transition-colors tracking-wide">
            Home
          </Link>
        )}
      </div>

      <div>
        {isLoggedIn && user?.role === "admin" ? (
          <h1 className="text-2xl font-bold text-[#5c3d1e] tracking-widest uppercase">Admin Dashboard</h1>
        ) : (
          <h1 className="text-2xl font-bold text-[#5c3d1e] tracking-widest uppercase">Toronto Blogs</h1>
        )}
      </div>

      {isLoggedIn && user.role === "admin" ? (
        <div className="flex items-center gap-3">
          <span className="text-[#5c3d1e] font-semibold text-sm tracking-wide">Admin</span>
          <button onClick={handleLogout} className="bg-[#5c3d1e] text-[#f5f0e8] px-4 py-1.5 rounded text-sm font-medium hover:bg-[#c9a96e] transition-colors cursor-pointer tracking-wide">
            Logout
          </button>
        </div>
      ) : (
        <div>
          {isLoggedIn && user.role === "user" ? (
            <div className="flex items-center gap-3">
              <span className="text-[#5c3d1e] font-semibold text-sm tracking-wide">{user?.name}</span>
              <button onClick={handleLogout} className="bg-[#5c3d1e] text-[#f5f0e8] px-4 py-1.5 rounded text-sm font-medium hover:bg-[#c9a96e] transition-colors cursor-pointer tracking-wide">
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-3">
              <Link to="/login" className="bg-[#5c3d1e] text-[#f5f0e8] px-4 py-1.5 rounded text-sm font-medium hover:bg-[#c9a96e] transition-colors tracking-wide">
                Sign In
              </Link>
              <Link to="/register" className="border border-[#5c3d1e] text-[#5c3d1e] px-4 py-1.5 rounded text-sm font-medium hover:bg-[#e8dcc8] transition-colors tracking-wide">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;