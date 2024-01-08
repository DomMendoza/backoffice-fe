import React, { useEffect, useState } from "react";
import { SampleDataGrid } from "../components/SampleDataGrid";
import BreadCrumbs from "../components/BreadCrumbs";

function GrossGamingRevenue() {
  return (
    <div className="main-container h-full flex justify-center">
      <div className="items-container w-[95%] flex flex-col justify-center gap-4 ">
        <BreadCrumbs route="Report" pathName="Gross Gaming Revenue" />
        <div className="flex justify-between items-center ">
          <div className="flex flex-col ">
            <p className="capitalize text-3xl font-semibold font-['Poppins']">
              Gross Gaming Revenue
            </p>
            <p className="capitalize text-base font-['Poppins'] text-gray-600">
              Manage your game reports here.
            </p>
          </div>
        </div>
        <SampleDataGrid />
      </div>
    </div>
  );
}

export default GrossGamingRevenue;
