import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Cookies from "js-cookie";

import Dashboard from "./Dashboard";
import SignUp from "./SignUp";
import GrossGamingRevenue from "./GrossGamingRevenue";
import BetHistory from "./BetHistory";
import GameHistory from "./GameHistory";
import NavBar from "../components/NavBar";

function ProtectedRoute() {
  const token = Cookies.get("token");
  return (
    <Routes>
      <Route path="/" element={token ? <NavBar /> : <Navigate to="/login" />}>
        {/* <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} /> */}
        <Route index element={<GrossGamingRevenue />} />
        <Route path="/reports/ggr" element={<GrossGamingRevenue />} />
        <Route path="/reports/history" element={<BetHistory />} />
        <Route path="/reports/game" element={<GameHistory />} />
        <Route path="/accounts/signup" element={<SignUp />} />
      </Route>
    </Routes>
  );
}

export default ProtectedRoute;
