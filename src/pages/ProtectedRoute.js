import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Cookies from "js-cookie";

import Dashboard from "./Dashboard";
import ManageMembers from "./ManageMembers";
import GrossGamingRevenue from "./GrossGamingRevenue";
import BetHistory from "./BetHistory";
import NavBar from "../components/NavBar";

function ProtectedRoute() {
  const token = Cookies.get("token");
  return (
    <Routes>
      <Route path="/" element={token ? <NavBar /> : <Navigate to="/login" />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="/members/manage" element={<ManageMembers />} />
        <Route path="/reports/ggr" element={<GrossGamingRevenue />} />
        <Route path="/reports/history" element={<BetHistory />} />
      </Route>
    </Routes>
  );
}

export default ProtectedRoute;
