import React from "react";
import ArticleIcon from "@mui/icons-material/Article";
import { SampleDataGrid } from "../components/SampleDataGrid";

function Record() {
  return (
    <div className="main-container h-full flex justify-center">
      <div className="items-container w-[95%]  flex flex-col justify-center gap-2">
        <div className="flex justify-between items-center ">
          <div className="flex flex-col">
            <p className="capitalize text-3xl font-semibold font-['Poppins']">
              Gross Gaming Revenue
            </p>
            <p className="capitalize text-base font-['Poppins'] text-gray-600">
              Manage your game reports here.
            </p>
          </div>
          {/* <div className="bg-[#182c34] flex gap-2 justify-center items-center text-white font-['Poppins'] px-3 py-2 rounded-md">
            <ArticleIcon />
            <p className="text-lg">Export</p>
          </div> */}
        </div>
        <SampleDataGrid />
      </div>
    </div>
  );
}

export default Record;
