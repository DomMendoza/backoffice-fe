import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function ToggleData({ tab, setTab, text, params }) {
  const handleChange = (event, newAlignment) => {
    setTab(newAlignment);
  };

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
          <p className="text-xs">{item}</p>
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
