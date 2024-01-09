import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function DatePickers({ start, setStart, end, setEnd }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker", "DatePicker"]}>
        <DatePicker
          label="Start Date"
          value={start || null} // Ensure a non-undefined value
          onChange={(newValue) => setStart(newValue)}
        />
        <DatePicker
          label="End Date"
          value={end || null} // Ensure a non-undefined value
          onChange={(newValue) => setEnd(newValue)}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
