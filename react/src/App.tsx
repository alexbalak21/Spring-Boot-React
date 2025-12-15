import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import ApiDemo from "./pages/ApiDemo";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import ToastContainer from "./components/ToastContainer";
import UserLayout from "./layouts/UserLayout";
import Profile from "./pages/User/Profile";
import UpdateUser from "./pages/User/UpdateUser";
import UpdateUserPassword from "./pages/User/UpdateUserPassword";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />

        <div className="flex flex-1">
          <Routes>
            {/* Normal pages without sidebar */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/demo" element={<ApiDemo />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* User-related pages with sidebar */}
            <Route element={<UserLayout />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/update-profile" element={<UpdateUser />} />
              <Route path="/update-password" element={<UpdateUserPassword />} />
            </Route>
          </Routes>
        </div>

        <ToastContainer position="top-right" />
      </div>
    </Router>
  );
}
