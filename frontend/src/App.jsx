import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/publicpages/Home";
import Postdetails from "./pages/publicpages/Postdetails";
import Login from "./pages/publicpages/Login";
import Register from "./pages/publicpages/Register";
import AdminDashboard from "./pages/adminpages/AdminDashboard";
import CreatePost from "./pages/adminpages/CreatePost";
import EditPost from "./pages/adminpages/EditPost";
import Categories from "./pages/adminpages/Categories";
import ProtectedRoutes from "./components/protectedRoutes";
import Layout from "./components/Layout";
import { useEffect } from "react";
import { getMe } from "./services/authService";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/slices/authSlice";

function App() {
const dispatch = useDispatch()

  useEffect(() => {
    const fetchUser = async () => {
        try {
            const res = await getMe()
            if(res.data.success) {
                dispatch(setUser(res.data.user))
            }
        } catch (error) {
            console.log(error)
        }
    }
    fetchUser()
}, [])

  return (

<Layout>
   <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/posts/:id" element={<Postdetails />} />

      {/* //admin */}
      <Route
        path="/admin"
        element={
          <ProtectedRoutes>
            <AdminDashboard />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/admin/create-post"
        element={
          <ProtectedRoutes>
            <CreatePost />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/admin/edit-post/:id"
        element={
          <ProtectedRoutes>
            <EditPost />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/admin/category"
        element={
          <ProtectedRoutes>
            <Categories />
          </ProtectedRoutes>
        }
      />
    </Routes>
</Layout>

 
  );
}

export default App;
