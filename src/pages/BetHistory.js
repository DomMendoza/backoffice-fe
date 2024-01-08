import React from "react";
import BreadCrumbs from "../components/BreadCrumbs";

function BetHistory() {
  return (
    <div className="main-container h-full flex justify-center">
      <div className="items-container w-[95%] flex flex-col justify-center gap-4 ">
        <BreadCrumbs route="Report" pathName="Bet History" />
        <div className="flex justify-between items-center ">
          <div className="flex flex-col ">
            <p className="capitalize text-3xl font-semibold font-['Poppins']">
              Bet History
            </p>
            <p className="capitalize text-base font-['Poppins'] text-gray-600">
              View bet history report.
            </p>
          </div>
        </div>
        {/* <SampleDataGrid /> */}
      </div>
    </div>
  );
}

export default BetHistory;
