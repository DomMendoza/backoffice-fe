import React from "react";
import BreadCrumbs from "../components/BreadCrumbs";

function ManageMembers() {
  return (
    <div className="main-container h-full flex justify-center">
      <div className="items-container w-[95%] flex flex-col justify-center gap-4 ">
        <BreadCrumbs route="Members" pathName="Member Management" />
        <div className="flex justify-between items-center ">
          <div className="flex flex-col ">
            <p className="capitalize text-3xl font-semibold font-['Poppins']">
              Member Management
            </p>
            <p className="capitalize text-base font-['Poppins'] text-gray-600">
              Manage your members and their permission here.
            </p>
          </div>
        </div>
        {/* <SampleDataGrid /> */}
      </div>
    </div>
  );
}

export default ManageMembers;
