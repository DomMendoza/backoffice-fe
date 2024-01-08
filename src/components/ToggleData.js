import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function ToggleData({ tab, setTab }) {
  const handleChange = (event, newAlignment) => {
    // externalFilterChanged(newAlignment);
    setTab(newAlignment);
  };

  const text = ["E-Bingo", "E-games"];
  const params = ["ebingo", "egames"];

  return (
    <ToggleButtonGroup
      color="primary"
      value={tab}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      {text.map((item, index) => (
        <ToggleButton key={index} value={params[index]} disableRipple>
          {item}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
