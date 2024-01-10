import React, { useEffect, useState, useRef, useCallback } from "react";
import BreadCrumbs from "../components/BreadCrumbs";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";
import ArticleIcon from "@mui/icons-material/Article";
import Button from "@mui/material/Button";
import { GameHistoryDataGrid } from "../layout/GameHistoryDataGrid";

function GameHistory() {
  const gridRef = useRef();
  const [isRefresh, setIsRefresh] = useState(false);
  const [rotateClass, setRotateClass] = useState("");
  const [dataCount, setDataCount] = useState(0);

  const onBtnExport = useCallback(() => {
    const params = {
      fileName: "game-history.csv",
    };
    gridRef.current.api.exportDataAsCsv(params);
  }, []);

  useEffect(() => {
    // Update rotateClass based on isRefresh changes
    setRotateClass(isRefresh ? "rotate-180" : "");
  }, [isRefresh]);

  return (
    <div className="main-container h-full flex justify-center">
      <div className="items-container w-[95%] flex flex-col justify-center gap-4 ">
        <BreadCrumbs route="Report" pathName="Game History" />
        <div className="flex justify-between items-center">
          <div className="flex justify-center items-center gap-4">
            <div className="flex flex-col">
              <p className="capitalize text-3xl font-semibold font-['Poppins']">
                Game History
              </p>
              <p className="capitalize text-base font-['Poppins'] text-gray-600">
                View game history report.
              </p>
            </div>
            <div
              onClick={() => setIsRefresh(!isRefresh)}
              className={`transition-transform duration-300 ease-in-out rounded-lg cursor-pointer ${rotateClass}`}
            >
              <CachedOutlinedIcon
                style={{
                  borderRadius: 100,
                  fontSize: "2rem",
                }}
              />
            </div>
          </div>
          <div className="flex justify-center items-center gap-5">
            <p className="italic">{dataCount} results</p>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#182c34",
                cursor: "pointer",
                display: "flex",
                gap: "5px",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                fontFamily: "Poppins",
                padding: "8px 12px",
                borderRadius: "4px",
              }}
              onClick={onBtnExport}
            >
              <ArticleIcon />
              <p className="text-base">Export</p>
            </Button>
          </div>
        </div>
        <GameHistoryDataGrid
          gridRef={gridRef}
          isRefresh={isRefresh}
          setDataCount={setDataCount}
        />
      </div>
    </div>
  );
}

export default GameHistory;
