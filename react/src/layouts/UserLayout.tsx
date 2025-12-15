import { Routes, Route } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Profile from "../pages/User/Profile";
import UpdateUser from "../pages/User/UpdateUser";
import UpdateUserPassword from "../pages/User/UpdateUserPassword";

export default function UserLayout() {
  return (
    <div className="flex flex-1">
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Main content on the right */}
      <main className="flex-1 py-6 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/update-profile" element={<UpdateUser />} />
          <Route path="/update-password" element={<UpdateUserPassword />} />
        </Routes>
      </main>
      <div className="w-64 hidden lg:block"></div>
    </div>
  );
}
