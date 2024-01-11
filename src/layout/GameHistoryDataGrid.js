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
import { getGameHistory } from "../services/getGameHistory";
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

export const GameHistoryDataGrid = ({ gridRef, isRefresh, setDataCount }) => {
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
      field: "username",
      headerName: "Username",
      filter: "agTextColumnFilter",
      cellStyle: { fontFamily: "Poppins" },
      headerClass: "header-style",
      cellClass: "cell-style",
    },
    {
      field: "game",
      headerName: "Game Type",
      filter: "agTextColumnFilter",
      cellStyle: { fontFamily: "Poppins" },
      headerClass: "header-style",
      cellClass: "cell-style",
    },
    {
      field: "credit_before",
      headerName: "Old Credit",
      filter: "agNumberColumnFilter",
      cellStyle: { fontFamily: "Poppins" },
      headerClass: "header-style",
      cellClass: "cell-style",
    },
    {
      field: "win",
      headerName: "Win",
      filter: "agNumberColumnFilter",
      cellStyle: (params) => {
        const winValue = params.value;

        if (winValue < 0) {
          return { fontFamily: "Poppins", color: "red" };
        } else if (winValue === 0) {
          return { fontFamily: "Poppins" };
        } else {
          return { fontFamily: "Poppins", color: "green" };
        }
      },
      headerClass: "header-style",
      cellClass: "cell-style",
    },
    {
      field: "credit_after",
      headerName: "New Credit",
      filter: "agNumberColumnFilter",
      cellStyle: { fontFamily: "Poppins" },
      headerClass: "header-style",
      cellClass: "cell-style",
    },
    {
      field: "cards",
      headerName: "Cards",
      filter: "agNumberColumnFilter",
      cellStyle: { fontFamily: "Poppins" },
      headerClass: "header-style",
      cellClass: "cell-style",
    },
    {
      field: "bet",
      headerName: "Bet",
      filter: "agNumberColumnFilter",
      cellStyle: { fontFamily: "Poppins" },
      headerClass: "header-style",
      cellClass: "cell-style",
    },
    {
      field: "winning_cards_identification",
      headerName: "Winning Cards ID",
      filter: "agTextColumnFilter",
      cellStyle: { fontFamily: "Poppins" },
      headerClass: "header-style",
      cellClass: "cell-style",
    },
    {
      field: "ball_list",
      headerName: "Ball List",
      filter: "agTextColumnFilter",
      cellStyle: { fontFamily: "Poppins" },
      headerClass: "header-style",
      cellClass: "cell-style",
    },
    {
      field: "extraball_cost",
      headerName: "Extraball Cost",
      filter: "agNumberColumnFilter",
      filterParams: dateFilterParams,
      cellStyle: { fontFamily: "Poppins" },
      headerClass: "header-style",
      cellClass: "cell-style",
    },
    {
      field: "side_bet",
      headerName: "Side Bet",
      filter: "agTextColumnFilter",
      filterParams: dateFilterParams,
      cellStyle: { fontFamily: "Poppins" },
      headerClass: "header-style",
      cellClass: "cell-style",
    },

    {
      field: "win_spent",
      headerName: "Win Spent",
      filter: "agTextColumnFilter",
      cellStyle: { fontFamily: "Poppins" },
      headerClass: "header-style",
      cellClass: "cell-style",
    },
    {
      field: "first_bonus_feature_win",
      headerName: "First Bonus Feature Win",
      filter: "agTextColumnFilter",
      cellStyle: { fontFamily: "Poppins" },
      headerClass: "header-style",
      cellClass: "cell-style",
    },
    {
      field: "second_bonus_feature_win",
      headerName: "Second Bonus Feature Win",
      filter: "agTextColumnFilter",
      cellStyle: { fontFamily: "Poppins" },
      headerClass: "header-style",
      cellClass: "cell-style",
    },
    {
      field: "jackpot_win",
      headerName: "Jackpot Win",
      filter: "agNumberColumnFilter",
      cellStyle: { fontFamily: "Poppins" },
      headerClass: "header-style",
      cellClass: "cell-style",
    },
    {
      field: "game_start",
      headerName: "Game Start",
      filter: "agDateColumnFilter",
      cellStyle: { fontFamily: "Poppins" },
      headerClass: "header-style",
      cellClass: "cell-style",
    },
    {
      field: "game_end",
      headerName: "Game End",
      filter: "agDateColumnFilter",
      cellStyle: { fontFamily: "Poppins" },
      headerClass: "header-style",
      cellClass: "cell-style",
    },
    {
      field: "platform_name",
      headerName: "Platform Name",
      filter: "agTextColumnFilter",
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

      const result = await getGameHistory(start, end);
      console.log("Raw Game History: ", result.GamePlayHistories);

      //Converting strings to numbers for computation and filtering purposes. No biggie.
      const rowData = result.GamePlayHistories.map((item) => {
        if (
          item.game === "FORTUNE 30 WEB" ||
          item.game === "GOLD FARM WEB" ||
          item.game === "GOLDEN ERA WEB" ||
          item.game === "PIRATE BABES WEB" ||
          item.game === "SEA RICHES WEB"
        ) {
          return {
            ...item,
            credit_before: parseInt(item.credit_before),
            win: parseInt(item.win),
            jackpot_win: parseInt(item.jackpot_win),
            credit_after:
              parseInt(item.credit_before) -
              parseInt(item.extraball_cost) +
              parseInt(item.win),
          };
        } else {
          return {
            ...item,
            credit_before: parseInt(item.credit_before),
            win: parseInt(item.win),
            jackpot_win: parseInt(item.jackpot_win),
            credit_after:
              parseInt(item.credit_before) +
              parseInt(item.jackpot_win) +
              parseInt(item.win),
          };
        }
      });

      // console.log("new credit: ", rowData);

      if (tab === "ALL") {
        setRowData(rowData);
        setDataCount(rowData.length);
      } else {
        const filteredData = rowData.filter((item) => item.game === tab);
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
