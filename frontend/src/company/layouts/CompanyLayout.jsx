import React from "react";
import { Outlet } from "react-router-dom";
import CompanyNavbar from "../components/CompanyNavbar";

const CompanyLayout = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      <CompanyNavbar />
      <main className="pt-28 pb-12 px-6 max-w-6xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default CompanyLayout;
