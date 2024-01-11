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
import ClearIcon from "@mui/icons-material/Clear";
import { getBetHistory } from "../services/getBetHistory";
import DatePickers from "../components/DatePickers";
import dayjs from "dayjs";

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
  const [start, setStart] = React.useState();
  const [end, setEnd] = React.useState(dayjs());
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
    "GOLD FARM WEB",
    "GOLDEN ERA WEB",
    "PIRATE BABES WEB",
    "SEA RICHES WEB",
  ];
  const [rowData, setRowData] = useState();
  const [tab, setTab] = useState("ALL");
  const [columnDefs] = useState([
    {
      field: "id",
      headerName: "ID",
      filter: "agNumberColumnFilter",
      cellStyle: { fontFamily: "Poppins" },
      headerClass: "header-style",
      cellClass: "cell-style",
      maxWidth: 100,
    },
    {
      field: "user_id",
      headerName: "User ID",
      filter: "agTextColumnFilter",
      cellStyle: { fontFamily: "Poppins" },
      headerClass: "header-style",
      cellClass: "cell-style",
    },
    {
      field: "game_type",
      headerName: "Game Type",
      filter: "agTextColumnFilter",
      cellStyle: { fontFamily: "Poppins" },
      headerClass: "header-style",
      cellClass: "cell-style",
    },
    {
      field: "game_id",
      headerName: "Game ID",
      filter: "agNumberColumnFilter",
      cellStyle: { fontFamily: "Poppins" },
      headerClass: "header-style",
      cellClass: "cell-style",
    },
    {
      field: "game_session",
      headerName: "Game Session",
      filter: "agNumberColumnFilter",
      cellStyle: { fontFamily: "Poppins" },
      headerClass: "header-style",
      cellClass: "cell-style",
    },
    {
      field: "bet_ref_id",
      headerName: "Bet ID",
      filter: "agTextColumnFilter",
      cellStyle: { fontFamily: "Poppins" },
      headerClass: "header-style",
      cellClass: "cell-style",
    },
    {
      field: "bet_data",
      headerName: "Bet Data",
      filter: "agNumberColumnFilter",
      cellStyle: { fontFamily: "Poppins" },
      headerClass: "header-style",
      cellClass: "cell-style",
    },
    {
      field: "amount",
      headerName: "Amount",
      filter: "agNumberColumnFilter",
      cellStyle: { fontFamily: "Poppins" },
      headerClass: "header-style",
      cellClass: "cell-style",
    },
    {
      field: "created_date",
      headerName: "Created At",
      filter: "agDateColumnFilter",
      filterParams: dateFilterParams,
      cellStyle: { fontFamily: "Poppins" },
      headerClass: "header-style",
      cellClass: "cell-style",
    },
    {
      field: "updated_date",
      headerName: "Updated At",
      filter: "agDateColumnFilter",
      filterParams: dateFilterParams,
      cellStyle: { fontFamily: "Poppins" },
      headerClass: "header-style",
      cellClass: "cell-style",
    },
    {
      field: "jackpot_contribution",
      headerName: "Jackpot Contribution",
      filter: "agNumberColumnFilter",
      cellStyle: { fontFamily: "Poppins" },
      headerClass: "header-style",
      cellClass: "cell-style",
    },
    {
      field: "winning_amount",
      headerName: "Winning Amount",
      filter: "agNumberColumnFilter",
      cellStyle: { fontFamily: "Poppins" },
      headerClass: "header-style",
      cellClass: "cell-style",
    },
    {
      field: "jackpot_payout",
      headerName: "Jackpot Payout",
      filter: "agNumberColumnFilter",
      cellStyle: { fontFamily: "Poppins" },
      headerClass: "header-style",
      cellClass: "cell-style",
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

  const handleClearFilter = () => {
    setStart();
    setEnd(dayjs());
  };

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

      const result = await getBetHistory(start, end);
      //rowData converts the winning amount from string to int to avoid error.
      const rowData = result.Betting_Logs.map((item) => ({
        ...item,
        winning_amount: parseFloat(item.winning_amount),
        jackpot_payout: parseFloat(item.jackpot_payout),
      }));
      console.log("Raw Bet History: ", result.Betting_Logs);

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
  }, [tab, isRefresh, start, end]);

  // useEffect(() => {
  //   console.log(rowData);
  // }, [rowData]);

  return (
    <div style={containerStyle}>
      <div className="h-full flex flex-col gap-2">
        <div className="flex gap-4 items-center">
          <DatePickers
            start={start}
            setStart={setStart}
            end={end}
            setEnd={setEnd}
          />
          {start && (
            <div className="cursor-pointer" onClick={() => handleClearFilter()}>
              <ClearIcon style={{ color: "red" }} />
            </div>
          )}
        </div>
        <div className="font-['Poppins'] flex justify-between">
          <ToggleData
            tab={tab}
            setTab={setTab}
            text={gameType}
            params={gameType}
          />
        </div>
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
