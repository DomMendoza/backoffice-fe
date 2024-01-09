import React from "react";
import BreadCrumbs from "../components/BreadCrumbs";
import { SampleDataGrid } from "../components/SampleDataGrid";

function Dashboard() {
  return (
    <div className="main-container h-full flex justify-center">
      <div className="items-container w-[95%] flex flex-col justify-center gap-4 ">
        <BreadCrumbs route="Dashboard" pathName="Member Management" />
        <div className="flex justify-between items-center ">
          <div className="flex flex-col ">
            <p className="capitalize text-3xl font-semibold font-['Poppins']">
              Welcome back, breddasdev
            </p>
            <p className="capitalize text-base font-['Poppins'] text-gray-600">
              Track and manage beats, deposits, withdrawals and more from here.
            </p>
          </div>
        </div>
        {/* <SampleDataGrid /> */}
      </div>
    </div>
  );
}

export default Dashboard;
