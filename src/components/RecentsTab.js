import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const StyledTab = styled(Tab)({
  "&.Mui-selected": {
    color: "#1f586f",
    fontWeight: 600,
  },
});

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function RecentsTab() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          TabIndicatorProps={{
            style: {
              backgroundColor: "#1f586f",
            },
          }}
        >
          <StyledTab label="Login" {...a11yProps(0)} />
          <StyledTab label="Footprint" {...a11yProps(1)} />
          <StyledTab label="Export" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <div className=" flex flex-col gap-4 overflow-y-auto max-h-[400px]">
          {Array.from({ length: 10 }, (v, i) => i).map((item) => (
            <div className="border-b-2 pb-4 px-2" key={item}>
              <p className="text-sm font-normal">
                <span className="italic">User123</span> successfully logged in.
              </p>
              <p className="text-xs">{item} days ago</p>
            </div>
          ))}
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <div className=" flex flex-col gap-4 overflow-y-auto max-h-[400px]">
          {Array.from({ length: 10 }, (v, i) => i).map((item) => (
            <div className="border-b-2 pb-4 px-2" key={item}>
              <p className="text-sm font-normal">
                <span className="italic">User123</span> viewed the Bet History
                tab.
              </p>
              <p className="text-xs">{item} days ago</p>
            </div>
          ))}
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <div className=" flex flex-col gap-4 overflow-y-auto max-h-[400px]">
          {Array.from({ length: 10 }, (v, i) => i).map((item) => (
            <div className="border-b-2 pb-4 px-2" key={item}>
              <p className="text-sm font-normal">
                <span className="italic">User123</span> exported the Game
                History data.
              </p>
              <p className="text-xs">{item} days ago</p>
            </div>
          ))}
        </div>
      </CustomTabPanel>
    </Box>
  );
}
