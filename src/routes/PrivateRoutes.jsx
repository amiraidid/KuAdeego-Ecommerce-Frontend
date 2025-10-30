import React from "react";
import { Route, Routes } from "react-router-dom";
import Admin from "../pages/admin";
import NotFoundPage from "../pages/NotFoundPage";
import Login from "../pages/admin/Login";
import ProtectedRoutes from "./ProtectedRoutes";

function PrivateRoutes() {
  return (
    <main>
      <Routes>
        <Route path="/auth/admin" element={<Login />} />
        <Route
          path="/admin"
          element={
            <AdminRoutes>
              <Admin />
            </AdminRoutes>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>
  );
}

function AdminRoutes({ children }) {
  const role = sessionStorage.getItem("admin");
  if (role !== "admin") {
    return <Login />;
  }
  return children;
}

export default PrivateRoutes;


