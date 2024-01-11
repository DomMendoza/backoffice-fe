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
import ClearIcon from "@mui/icons-material/Clear";
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
  const [totalData, setTotalData] = useState({});
  const [columnDefs] = useState([
    {
      field: "date",
      filter: "agDateColumnFilter",
      filterParams: dateFilterParams,
      cellStyle: (params) => {
        if (params.node.rowPinned) {
          return {
            fontWeight: "600",
            backgroundColor: "gainsboro",
            textAlign: "center",
          };
        } else {
          return null;
        }
      },
      headerClass: "header-style",
      cellClass: "cell-style",
      cellRenderer: (params) => {
        const cellValue = params.value;
        if (params.node.rowPinned) {
          return `Total:`;
        } else {
          return cellValue;
        }
      },
    },
    {
      field: "amount",
      headerName: "Amount",
      filter: "agTextColumnFilter",
      cellStyle: (params) => {
        if (params.node.rowPinned) {
          return {
            fontWeight: "600",
            backgroundColor: "gainsboro",
            textAlign: "center",
          };
        } else {
          return null;
        }
      },
      headerClass: "header-style",
      cellClass: "cell-style",
      valueFormatter: (params) => {
        return "₱" + formatNumber(params.value);
      },
    },
    {
      field: "amount",
      headerName: "Valid Bet",
      filter: "agNumberColumnFilter",
      cellStyle: (params) => {
        if (params.node.rowPinned) {
          return {
            fontWeight: "600",
            backgroundColor: "gainsboro",
            textAlign: "center",
          };
        } else {
          return null;
        }
      },
      headerClass: "header-style",
      cellClass: "cell-style",
      valueFormatter: (params) => {
        return "₱" + formatNumber(params.value);
      },
    },
    {
      field: "payout",
      filter: "agTextColumnFilter",
      cellStyle: (params) => {
        if (params.node.rowPinned) {
          return {
            fontWeight: "600",
            backgroundColor: "gainsboro",
            textAlign: "center",
          };
        } else {
          return null;
        }
      },
      headerClass: "header-style",
      cellClass: "cell-style",
      valueFormatter: (params) => {
        return "₱" + formatNumber(params.value);
      },
    },
    {
      field: "netWin",
      filter: "agTextColumnFilter",
      cellStyle: (params) => {
        if (params.node.rowPinned) {
          return {
            fontWeight: "600",
            backgroundColor: "gainsboro",
            textAlign: "center",
          };
        } else {
          return null;
        }
      },
      headerClass: "header-style",
      cellClass: "cell-style",
      valueFormatter: (params) => {
        return "₱" + formatNumber(params.value);
      },
    },
    {
      field: "jackpotContributionClassic",
      headerName: "Jackpot Contribution",
      filter: "agTextColumnFilter",
      cellStyle: (params) => {
        if (params.node.rowPinned) {
          return {
            fontWeight: "600",
            backgroundColor: "gainsboro",
            textAlign: "center",
          };
        } else {
          return null;
        }
      },
      headerClass: "header-style",
      cellClass: "cell-style",
      valueFormatter: (params) => {
        return "₱" + formatNumber(params.value);
      },
    },
    {
      headerName: "Jackpot Payout",
      children: [
        {
          field: "jackpotPayoutClassic",
          headerName: "Classic",
          filter: "agNumberColumnFilter",
          cellStyle: (params) => {
            if (params.node.rowPinned) {
              return {
                fontWeight: "600",
                backgroundColor: "gainsboro",
                textAlign: "center",
              };
            } else {
              return null;
            }
          },
          headerClass: "header-style",
          cellClass: "cell-style",
          valueFormatter: (params) => {
            return "₱" + formatNumber(params.value);
          },
        },
        {
          field: "jackpotPayoutVariant",
          headerName: "Variant",
          filter: "agNumberColumnFilter",
          cellStyle: (params) => {
            if (params.node.rowPinned) {
              return {
                fontWeight: "600",
                backgroundColor: "gainsboro",
                textAlign: "center",
              };
            } else {
              return null;
            }
          },
          headerClass: "header-style",
          cellClass: "cell-style",
          valueFormatter: (params) => {
            return "₱" + formatNumber(params.value);
          },
        },
      ],
      headerClass: "header-style",
      cellClass: "cell-style",
    },
    {
      field: "ggr",
      filter: "agTextColumnFilter",
      cellStyle: (params) => {
        const ggrValue = params.value;

        if (ggrValue < 0) {
          if (params.node.rowPinned) {
            return {
              fontFamily: "Poppins",
              fontWeight: "600",
              backgroundColor: "gainsboro",
              textAlign: "center",
            };
          }
          return { fontFamily: "Poppins", color: "red" };
        } else if (ggrValue === 0) {
          if (params.node.rowPinned) {
            return {
              fontFamily: "Poppins",
              fontWeight: "600",
              backgroundColor: "gainsboro",
              textAlign: "center",
            };
          }
          return { fontFamily: "Poppins" };
        } else {
          if (params.node.rowPinned) {
            return {
              fontFamily: "Poppins",
              fontWeight: "600",
              backgroundColor: "gainsboro",
              textAlign: "center",
            };
          }
          return { fontFamily: "Poppins", color: "green" };
        }
      },
      headerClass: "header-style-bold",
      cellClass: "cell-style",
      valueFormatter: (params) => {
        return "₱" + formatNumber(params.value);
      },
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

  const formatNumber = (number) => {
    return (Math.round((number + Number.EPSILON) * 100) / 100)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  const fetchData = async () => {
    const result = await getGGR(start, end); //real and raw data to be used in computations.
    console.log("Raw GGR: ", result);

    // Modify GGR computation based on requirement and add netWin computation.
    const rowData = result.map((item) => ({
      ...item,
      netWin: parseFloat(item.amount - item.payout),
    }));

    // Calculate the sum
    const totalAmount = rowData.reduce((sum, item) => sum + item.amount, 0);
    const totalPayout = rowData.reduce((sum, item) => sum + item.payout, 0);
    const totalGgr = rowData.reduce((sum, item) => sum + item.ggr, 0);
    const totalJc = rowData.reduce(
      (sum, item) => sum + item.jackpotContributionClassic,
      0
    );
    const totalJpClassic = rowData.reduce(
      (sum, item) => sum + item.jackpotPayoutClassic,
      0
    );
    const totalJpVariant = rowData.reduce(
      (sum, item) => sum + item.jackpotPayoutVariant,
      0
    );
    const totalNetWin = rowData.reduce((sum, item) => sum + item.netWin, 0);

    //This is the pinned bottom row for totals
    setTotalData({
      amount: parseFloat(totalAmount.toFixed(2)),
      payout: parseFloat(totalPayout.toFixed(2)),
      ggr: parseFloat(totalGgr.toFixed(2)),
      jackpotContributionClassic: parseFloat(totalJc.toFixed(2)),
      jackpotPayoutClassic: parseFloat(totalJpClassic.toFixed(2)),
      jackpotPayoutVariant: parseFloat(totalJpVariant.toFixed(2)),
      netWin: parseFloat(totalNetWin.toFixed(2)),
    });

    setRowData(rowData);
    setDataCount(result.length);
  };

  useEffect(() => {
    fetchData();
  }, [isRefresh, start, end]);

  return (
    <div style={containerStyle}>
      <div className="h-full flex flex-col gap-3">
        <div className="font-['Poppins'] flex justify-between"></div>
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
            pinnedBottomRowData={[totalData]}
            pagination={true}
          />
        </div>
      </div>
    </div>
  );
};
