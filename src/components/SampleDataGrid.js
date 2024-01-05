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
import ToggleData from "./ToggleData";
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

// let ageType = "everyone";
// TODO: Make data appear in the table

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
    jackpotPayoutL: "jackpotPayout1",
  },
  {
    date: "02/01/2024",
    turnover: "ebingo2",
    validBet: "validBet2",
    payout: "payout2",
    ggr: "ggr2",
    jackpotContribution: "jackpotContribution2",
    jackpotPayoutL: "jackpotPayout2",
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
    jackpotPayoutL: "jackpotPayout1",
  },
  {
    date: "02/01/2024",
    turnover: "egames2",
    validBet: "validBet2",
    payout: "payout2",
    ggr: "ggr2",
    jackpotContribution: "jackpotContribution2",
    jackpotPayoutL: "jackpotPayout2",
  },
];

export const SampleDataGrid = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: "100%", height: "80%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState();
  const [tab, setTab] = useState("ebingo");
  const [columnDefs] = useState([
    // { field: "athlete", minWidth: 180 },
    // { field: "age", filter: "agNumberColumnFilter", maxWidth: 80 },
    // { field: "country" },
    // { field: "year", maxWidth: 90 },
    // {
    //   field: "date",
    //   filter: "agDateColumnFilter",
    //   filterParams: dateFilterParams,
    // },
    // { field: "gold", filter: "agNumberColumnFilter" },
    // { field: "silver", filter: "agNumberColumnFilter" },
    // { field: "bronze", filter: "agNumberColumnFilter" },
    {
      field: "date",
      filter: "agDateColumnFilter",
      filterParams: dateFilterParams,
    },
    { field: "turnover", filter: "agNumberColumnFilter" },
    { field: "validBet", filter: "agNumberColumnFilter" },
    { field: "payout", filter: "agNumberColumnFilter" },
    { field: "ggr", filter: "agNumberColumnFilter" },
    { field: "jackpotContribution", filter: "agNumberColumnFilter" },
    { field: "jackpotPayoutL", filter: "agNumberColumnFilter" },
  ]);
  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      minWidth: 120,
      filter: true,
    }),
    []
  );

  const onGridReady = useCallback((params) => {
    // fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
    //   .then((resp) => resp.json())
    //   .then((data) => {
    //     // document.querySelector("#everyone").checked = true;
    //     setRowData(data);
    //   });

    if (tab === "ebingo") {
      setRowData(ebingoData);
    } else if (tab === "egames") {
      setRowData(egamesData);
    }
  }, []);

  const externalFilterChanged = useCallback((newValue) => {
    setTab(newValue);
    // ageType = newValue;
    gridRef.current.api.onFilterChanged();
  }, []);

  const isExternalFilterPresent = useCallback(() => tab !== "ebingo", []);

  const doesExternalFilterPass = useCallback(
    (node) => {
      if (node.data) {
        switch (tab) {
          case "ebingo":
            return setTab("ebingo");
          case "egames":
            return setTab("egames");
          //   case "above50":
          //     return node.data.age > 50;
          //   case "dateAfter2008":
          //     return asDate(node.data.date) > new Date(2008, 1, 1);
          default:
            return true;
        }
      }
      return true;
    },
    [tab]
  );

  return (
    <div style={containerStyle}>
      <div className="h-full flex flex-col ">
        <div className="font-['Poppins'] flex justify-between py-4">
          <ToggleData
            externalFilterChanged={externalFilterChanged}
            tab={tab}
            setTab={setTab}
          />
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
              padding: "8px 12px", // You might need to adjust the padding based on your design
              borderRadius: "4px", // You might need to adjust the border-radius based on your design
            }}
          >
            <ArticleIcon />
            <p className="text-base">Export</p>
          </Button>
        </div>

        <div style={gridStyle} className="ag-theme-quartz-dark">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            isExternalFilterPresent={isExternalFilterPresent}
            doesExternalFilterPass={doesExternalFilterPass}
            onGridReady={onGridReady}
          />
        </div>
      </div>
    </div>
  );
};
