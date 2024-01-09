import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  StrictMode,
  useEffect,
} from "react";
import { createRoot } from "react-dom/client";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import ToggleData from "../components/ToggleData";
import { getBetHistory } from "../services/getBetHistory";

const dateFilterParams = {
  comparator: (filterLocalDateAtMidnight, cellValue) => {
    const cellDate = asDate(cellValue);
    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }
    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }
    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
    return 0;
  },
};

const asDate = (dateAsString) => {
  const splitFields = dateAsString.split("/");
  return new Date(
    Number.parseInt(splitFields[2]),
    Number.parseInt(splitFields[1]) - 1,
    Number.parseInt(splitFields[0])
  );
};

export const BetHistoryDataGrid = ({ gridRef, isRefresh, setDataCount }) => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "80%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const gameType = [
    "ALL",
    "13 BALL BINGO WEB",
    "BINGO PARES WEB",
    "BINGO PERYAHAN WEB",
    "BINGO SWERTRES WEB",
    "DRAGON VS TIGER BINGO WEB",
    "FORTUNE 30 WEB",
    "GOLDEN FARM WEB",
    "GOLDEN ERA WEB",
    "PIRATE BABES WEB",
    "SEA RICHES WEB",
  ];
  const timeType = ["today", "yesterday", "last week"];
  const [rowData, setRowData] = useState();
  const [tab, setTab] = useState("ALL");
  const [timeTab, setTimeTab] = useState("today");
  const [columnDefs] = useState([
    {
      field: "id",
      filter: "agNumberColumnFilter",
      cellStyle: { fontFamily: "Poppins" },
      headerClass: "header-style",
      maxWidth: 100,
    },
    {
      field: "user_id",
      filter: "agTextColumnFilter",
      cellStyle: { fontFamily: "Poppins" },
      headerClass: "header-style",
    },
    {
      field: "game_type",
      filter: "agTextColumnFilter",
      cellStyle: { fontFamily: "Poppins" },
      headerClass: "header-style",
    },
    {
      field: "game_id",
      filter: "agNumberColumnFilter",
      cellStyle: { fontFamily: "Poppins" },
      headerClass: "header-style",
    },
    {
      field: "game_session",
      filter: "agNumberColumnFilter",
      cellStyle: { fontFamily: "Poppins" },
      headerClass: "header-style",
    },
    {
      field: "bet_ref_id",
      filter: "agTextColumnFilter",
      cellStyle: { fontFamily: "Poppins" },
      headerClass: "header-style",
    },
    {
      field: "bet_data",
      filter: "agNumberColumnFilter",
      cellStyle: { fontFamily: "Poppins" },
      headerClass: "header-style",
    },
    {
      field: "amount",
      filter: "agNumberColumnFilter",
      cellStyle: { fontFamily: "Poppins" },
      headerClass: "header-style",
    },
    {
      field: "created_date",
      filter: "agDateColumnFilter",
      filterParams: dateFilterParams,
      cellStyle: { fontFamily: "Poppins" },
      headerClass: "header-style",
    },
    {
      field: "updated_date",
      filter: "agDateColumnFilter",
      filterParams: dateFilterParams,
      cellStyle: { fontFamily: "Poppins" },
      headerClass: "header-style",
    },
    {
      field: "jackpot_contribution",
      filter: "agNumberColumnFilter",
      cellStyle: { fontFamily: "Poppins" },
      headerClass: "header-style",
    },
    {
      field: "winning_amount",
      filter: "agNumberColumnFilter",
      cellStyle: { fontFamily: "Poppins" },
      headerClass: "header-style",
    },
    {
      field: "jackpot_payout",
      filter: "agNumberColumnFilter",
      cellStyle: { fontFamily: "Poppins" },
      headerClass: "header-style",
    },
  ]);
  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      minWidth: 120,
      filter: true,
    }),
    []
  );

  const showLoadingOverlay = () => {
    if (gridRef.current && gridRef.current.api) {
      gridRef.current.api.showLoadingOverlay();
    }
  };

  const hideLoadingOverlay = () => {
    if (gridRef.current && gridRef.current.api) {
      gridRef.current.api.hideOverlay();
    }
  };

  const fetchData = async (tab) => {
    try {
      showLoadingOverlay();

      const result = await getBetHistory(timeTab);
      //rowData converts the winning amount from string to int to avoid error.
      const rowData = result.Betting_Logs.map((item) => ({
        ...item,
        winning_amount: parseFloat(item.winning_amount),
        jackpot_payout: parseFloat(item.jackpot_payout),
      }));

      if (tab === "ALL") {
        setRowData(rowData);
        setDataCount(rowData.length);
      } else {
        const filteredData = rowData.filter((item) => item.game_type === tab);
        setRowData(filteredData);
        setDataCount(filteredData.length);
      }
      hideLoadingOverlay();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(tab);
  }, [tab, isRefresh, timeTab]);

  useEffect(() => {
    console.log(rowData);
  }, [rowData]);

  return (
    <div style={containerStyle}>
      <div className="h-full flex flex-col gap-2">
        <div className="font-['Poppins'] flex justify-between">
          <ToggleData
            tab={tab}
            setTab={setTab}
            text={gameType}
            params={gameType}
          />

          <ToggleData
            tab={timeTab}
            setTab={setTimeTab}
            text={timeType}
            params={timeType}
          />
        </div>
        {/* <ToggleData
          tab={timeTab}
          setTab={setTimeTab}
          text={timeType}
          params={timeType}
        /> */}

        <div style={gridStyle} className="ag-theme-quartz">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
          />
        </div>
      </div>
    </div>
  );
};
