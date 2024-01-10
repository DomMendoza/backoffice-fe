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
import ClearIcon from "@mui/icons-material/Clear";
import Button from "@mui/material/Button";
import { getGGR } from "../services/getGGR";
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

export const GgrDataGrid = ({ gridRef, isRefresh, setDataCount }) => {
  const [start, setStart] = React.useState();
  const [end, setEnd] = React.useState(dayjs());
  const containerStyle = useMemo(() => ({ width: "100%", height: "80%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState();
  // const [tab, setTab] = useState("ebingo");
  const [columnDefs] = useState([
    {
      field: "date",
      filter: "agDateColumnFilter",
      filterParams: dateFilterParams,
      cellStyle: { fontFamily: "Poppins" },
      headerClass: "header-style",
    },
    {
      field: "amount",
      headerName: "Amount",
      filter: "agNumberColumnFilter",
      cellStyle: { fontFamily: "Poppins" },
      headerClass: "header-style",
    },
    {
      field: "amount",
      headerName: "Valid Bet",
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
      cellStyle: (params) => {
        const ggrValue = params.value;

        if (ggrValue < 0) {
          return { fontFamily: "Poppins", color: "red" };
        } else if (ggrValue === 0) {
          return { fontFamily: "Poppins" };
        } else {
          return { fontFamily: "Poppins", color: "green" };
        }
      },
      headerClass: "header-style-bold",
    },
    {
      field: "jackpot_contribution",
      headerName: "Jackpot Contribution",
      filter: "agNumberColumnFilter",
      cellStyle: { fontFamily: "Poppins" },
      headerClass: "header-style",
    },
    {
      field: "jackpotPayout",
      headerName: "Jackpot Payout",
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

  const handleClearFilter = () => {
    setStart();
    setEnd(dayjs());
  };

  const roundTwoDecimalPlaces = (data) => {
    const roundedArray = data.map((obj) => {
      const newObj = {};
      for (const key in obj) {
        if (typeof obj[key] === "number") {
          newObj[key] = Math.round((obj[key] + Number.EPSILON) * 100) / 100;
        } else {
          newObj[key] = obj[key];
        }
      }
      return newObj;
    });

    return roundedArray;
  };

  const fetchData = async () => {
    const result = await getGGR(start, end); //real and raw data to be used in computations.
    console.log("Raw GGR: ", result);
    const ggrData = roundTwoDecimalPlaces(result); //formatted version of 'result' to be displayed in front-end.
    setRowData(ggrData);
    setDataCount(result.length);
  };

  useEffect(() => {
    fetchData();
  }, [isRefresh, start, end]);

  return (
    <div style={containerStyle}>
      <div className="h-full flex flex-col gap-3">
        <div className="font-['Poppins'] flex justify-between">
          {/* <ToggleData tab={tab} setTab={setTab} /> */}
        </div>
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
