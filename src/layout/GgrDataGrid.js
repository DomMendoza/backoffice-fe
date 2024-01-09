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
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ToggleData from "../components/ToggleData";
import ArticleIcon from "@mui/icons-material/Article";
import Button from "@mui/material/Button";

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

const ebingoData = [
  {
    date: "01/01/2024",
    turnover: "ebingo1",
    validBet: "validBet1",
    payout: "payout1",
    ggr: "ggr1",
    jackpotContribution: "jackpotContribution1",
    jackpotPayout: "jackpotPayout1",
  },
  {
    date: "02/01/2024",
    turnover: "ebingo2",
    validBet: "validBet2",
    payout: "payout2",
    ggr: "ggr2",
    jackpotContribution: "jackpotContribution2",
    jackpotPayout: "jackpotPayout2",
  },
];

const egamesData = [
  {
    date: "01/01/2024",
    turnover: "egames1",
    validBet: "validBet1",
    payout: "payout1",
    ggr: "ggr1",
    jackpotContribution: "jackpotContribution1",
    jackpotPayout: "jackpotPayout1",
  },
  {
    date: "02/01/2024",
    turnover: "egames2",
    validBet: "validBet2",
    payout: "payout2",
    ggr: "ggr2",
    jackpotContribution: "jackpotContribution2",
    jackpotPayout: "jackpotPayout2",
  },
];

export const GgrDataGrid = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: "100%", height: "80%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState();
  const [tab, setTab] = useState("ebingo");
  const [columnDefs] = useState([
    {
      field: "date",
      filter: "agDateColumnFilter",
      filterParams: dateFilterParams,
      cellStyle: { fontFamily: "Poppins" },
      headerClass: "header-style",
    },
    {
      field: "turnover",
      filter: "agNumberColumnFilter",
      cellStyle: { fontFamily: "Poppins" },
      headerClass: "header-style",
    },
    {
      field: "validBet",
      filter: "agNumberColumnFilter",
      cellStyle: { fontFamily: "Poppins" },
      headerClass: "header-style",
    },
    {
      field: "payout",
      filter: "agNumberColumnFilter",
      cellStyle: { fontFamily: "Poppins" },
      headerClass: "header-style",
    },
    {
      field: "ggr",
      filter: "agNumberColumnFilter",
      cellStyle: { fontFamily: "Poppins" },
      headerClass: "header-style-bold",
    },
    {
      field: "jackpotContribution",
      filter: "agNumberColumnFilter",
      cellStyle: { fontFamily: "Poppins" },
      headerClass: "header-style",
    },
    {
      field: "jackpotPayout",
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

  const onBtnExport = useCallback(() => {
    const params = {
      fileName: "gross-gaming-revenue.csv",
    };
    gridRef.current.api.exportDataAsCsv(params);
  }, []);

  useEffect(() => {
    if (tab === "ebingo") {
      setRowData(ebingoData);
    } else if (tab === "egames") {
      setRowData(egamesData);
    }
  }, [tab]);

  return (
    <div style={containerStyle}>
      <div className="h-full flex flex-col ">
        <div className="font-['Poppins'] flex justify-between py-4">
          {/* <ToggleData tab={tab} setTab={setTab} /> */}
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
