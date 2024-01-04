import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Cookies from "js-cookie";

import Dashboard from "./Dashboard";
import Record from "./Record";
import NavBar from "../components/NavBar";

function ProtectedRoute() {
  const token = Cookies.get("token");
  return (
    <Routes>
      <Route path="/" element={token ? <NavBar /> : <Navigate to="/login" />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="record" element={<Record />} />
      </Route>
    </Routes>
  );
}

export default ProtectedRoute;
