import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { getAuditLog } from "../services/getAuditLog";

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

const calculateDaysAgo = (createdAt) => {
  const createdDate = new Date(createdAt);
  const currentDate = new Date();

  const timeDifference = Math.abs(currentDate - createdDate);
  const minutesAgo = Math.floor(timeDifference / (1000 * 60));
  const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));
  const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  if (minutesAgo < 60) {
    return `${minutesAgo} ${minutesAgo === 1 ? "minute" : "minutes"} ago`;
  } else if (hoursAgo < 24) {
    return `${hoursAgo} ${hoursAgo === 1 ? "hour" : "hours"} ago`;
  } else {
    return `${daysAgo} ${daysAgo === 1 ? "day" : "days"} ago`;
  }
};

export default function RecentsTab({ isRefresh }) {
  const [value, setValue] = React.useState(0);
  const [recentData, setRecentData] = React.useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    const handleFetchRecent = async () => {
      const result = await getAuditLog();
      const reversedAudits = result.getAudits.reverse();
      setRecentData(reversedAudits);
    };
    handleFetchRecent();
  }, [isRefresh]);

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
          <StyledTab label="Visit" {...a11yProps(1)} />
          <StyledTab label="Export" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <div className=" flex flex-col gap-4 overflow-y-auto max-h-[400px]">
          {recentData
            .filter((item) => item.type === "Login")
            .map((item, index) => (
              <div className="border-b-2 pb-4 px-2" key={index}>
                <p className="text-sm font-normal">
                  <span className="italic">{item.username}</span> {item.action}
                </p>
                <p className="text-xs">{calculateDaysAgo(item.createdAt)}</p>
              </div>
            ))}
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <div className=" flex flex-col gap-4 overflow-y-auto max-h-[400px]">
          {recentData
            .filter((item) => item.type === "Visit")
            .map((item, index) => (
              <div className="border-b-2 pb-4 px-2" key={index}>
                <p className="text-sm font-normal">
                  <span className="italic">{item.username}</span> {item.action}
                </p>
                <p className="text-xs">{calculateDaysAgo(item.createdAt)}</p>
              </div>
            ))}
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <div className=" flex flex-col gap-4 overflow-y-auto max-h-[400px]">
          {recentData
            .filter((item) => item.type === "Export")
            .map((item, index) => (
              <div className="border-b-2 pb-4 px-2" key={index}>
                <p className="text-sm font-normal">
                  <span className="italic">{item.username}</span> {item.action}
                </p>
                <p className="text-xs">{calculateDaysAgo(item.createdAt)}</p>
              </div>
            ))}
        </div>
      </CustomTabPanel>
    </Box>
  );
}
