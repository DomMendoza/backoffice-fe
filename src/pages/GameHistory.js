import React from "react";
import { GameHistoryDataGrid } from "../layout/GameHistoryDataGrid";
import BreadCrumbs from "../components/BreadCrumbs";

function GameHistory() {
  return (
    <div className="main-container h-full flex justify-center">
      <div className="items-container w-[95%] flex flex-col justify-center gap-4 ">
        <BreadCrumbs route="Report" pathName="Game History" />
        <div className="flex justify-between items-center ">
          <div className="flex flex-col ">
            <p className="capitalize text-3xl font-semibold font-['Poppins']">
              Game History
            </p>
            <p className="capitalize text-base font-['Poppins'] text-gray-600">
              View game history report.
            </p>
          </div>
        </div>
        <GameHistoryDataGrid />
      </div>
    </div>
  );
}

export default GameHistory;
