import * as React from "react";
import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Cookies from "js-cookie";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ScheduleIcon from "@mui/icons-material/Schedule";
import LogoutIcon from "@mui/icons-material/Logout";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import HistoryIcon from "@mui/icons-material/History";
import CasinoOutlinedIcon from "@mui/icons-material/CasinoOutlined";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";
import { Link as NavLink, Outlet, useNavigate } from "react-router-dom";
import RecentsTab from "./RecentsTab";

const pages = ["Reports", "Accounts"];
const settings = ["Logout"];
const reportsMenu = ["Gross Gaming Revenue", "Bet History", "Game History"];
const reportsIcon = [
  <AttachMoneyIcon />,
  <HistoryIcon />,
  <CasinoOutlinedIcon />,
];
const accountsMenu = ["Register Account"];
const accountsIcon = [<PersonAddIcon />];
const reportsLink = ["/reports/ggr", "/reports/history", "/reports/game"];
const accountsLink = ["/accounts/signup"];

function NavBar() {
  const navigate = useNavigate();

  const [isRefresh, setIsRefresh] = useState(false);
  const [rotateClass, setRotateClass] = useState("");

  const [anchorSettings, setAnchorSettings] = React.useState(null);
  const [anchorRecents, setAnchorRecents] = React.useState(null);
  const [anchorReports, setAnchorReports] = React.useState(null);
  const [anchorAccounts, setAnchorAccounts] = React.useState(null);

  //Settings
  const handleOpenUserMenu = (event) => {
    setAnchorSettings(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorSettings(null);
  };

  //Recent Activities
  const handleOpenRecentsMenu = (event) => {
    setAnchorRecents(event.currentTarget);
  };
  const handleCloseRecentsMenu = () => {
    setAnchorRecents(null);
  };

  //Reports
  const handleOpenReportsMenu = (event) => {
    setAnchorReports(event.currentTarget);
  };
  const handleCloseReportsMenu = () => {
    setAnchorReports(null);
  };

  //Accounts
  const handleOpenAccountsMenu = (event) => {
    setAnchorAccounts(event.currentTarget);
  };
  const handleCloseAccountsMenu = () => {
    setAnchorAccounts(null);
  };

  const handleLogout = () => {
    Cookies.set("token", "", { expires: new Date(0) });
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    // Update rotateClass based on isRefresh changes
    setRotateClass(isRefresh ? "rotate-180" : "");
  }, [isRefresh]);

  return (
    <div className="h-screen flex flex-col">
      <div className="navbar-container bg-[#182c34] py-2 flex justify-center items-center">
        <div className="w-[95%] font-['Poppins'] text-white ">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/reports/ggr"
              sx={{
                // mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "Poppins",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              BACKOFFICE
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                // border: "2px solid red",
                gap: "35px",
                margin: "0 50px",
              }}
            >
              {pages.map((page, index) => (
                <div key={index} className="text-xl flex">
                  {index === 0 ? (
                    <Box
                      sx={{
                        flexGrow: 0,
                        cursor: "pointer",
                        borderRadius: "6px",
                        backgroundColor: window.location.pathname.startsWith(
                          "/reports"
                        )
                          ? "#374151"
                          : "",
                      }}
                    >
                      <Tooltip onClick={handleOpenReportsMenu}>
                        <div className="flex justify-center items-center gap-1 text-xl px-2 py-1 rounded-md transition ease-in-out">
                          <p>{page}</p>
                          <div
                            className={`transition-transform duration-300 ease-in-out ${
                              anchorReports ? "rotate-180" : ""
                            }`}
                          >
                            <KeyboardArrowDownIcon
                              style={{ fontSize: "1.2rem" }}
                            />
                          </div>
                        </div>
                      </Tooltip>
                      <Menu
                        sx={{ mt: "45px" }}
                        id="menu-appbar"
                        anchorEl={anchorReports}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "center",
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "center",
                        }}
                        open={Boolean(anchorReports)}
                        onClose={handleCloseReportsMenu}
                      >
                        {reportsMenu.map((item, index) => (
                          <MenuItem
                            key={index}
                            onClick={handleCloseReportsMenu}
                          >
                            <NavLink
                              to={reportsLink[index]}
                              className="text-xl w-full"
                            >
                              <div className="flex gap-4 font-['Poppins'] w-full">
                                {/* <LogoutIcon /> */}
                                {reportsIcon[index]}
                                <div className="text-base flex flex-col justify-start items-start font-semibold">
                                  {item}
                                  <p className="text-xs text-gray-500 font-light">
                                    View {item} Reports
                                  </p>
                                </div>
                              </div>
                            </NavLink>
                          </MenuItem>
                        ))}
                      </Menu>
                    </Box>
                  ) : index === 1 ? (
                    <Box
                      sx={{
                        flexGrow: 0,
                        cursor: "pointer",
                        borderRadius: "6px",
                        backgroundColor: window.location.pathname.startsWith(
                          "/accounts"
                        )
                          ? "#374151"
                          : "",
                      }}
                    >
                      <Tooltip onClick={handleOpenAccountsMenu}>
                        <div className="flex justify-center items-center gap-1 text-xl px-2 py-1 rounded-md transition ease-in-out">
                          <p>{page}</p>
                          <div
                            className={`transition-transform duration-300 ease-in-out ${
                              anchorAccounts ? "rotate-180" : ""
                            }`}
                          >
                            <KeyboardArrowDownIcon
                              style={{ fontSize: "1.2rem" }}
                            />
                          </div>
                        </div>
                      </Tooltip>
                      <Menu
                        sx={{ mt: "45px" }}
                        id="menu-appbar"
                        anchorEl={anchorAccounts}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "center",
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "center",
                        }}
                        open={Boolean(anchorAccounts)}
                        onClose={handleCloseAccountsMenu}
                      >
                        {accountsMenu.map((item, index) => (
                          <MenuItem
                            key={index}
                            onClick={handleCloseAccountsMenu}
                          >
                            <NavLink
                              to={accountsLink[index]}
                              className="text-xl w-full"
                            >
                              <div className="flex gap-4 font-['Poppins'] w-full">
                                {/* <LogoutIcon /> */}
                                {accountsIcon[index]}
                                <div className="text-base flex flex-col justify-start items-start font-semibold">
                                  {item}
                                  <p className="text-xs text-gray-500 font-light">
                                    {item}
                                  </p>
                                </div>
                              </div>
                            </NavLink>
                          </MenuItem>
                        ))}
                      </Menu>
                    </Box>
                  ) : null}
                </div>
              ))}
            </Box>
            <div className="flex justify-center items-center gap-5">
              <Box
                sx={{
                  flexGrow: 0,
                }}
              >
                <Tooltip title="Recent Activity">
                  <IconButton onClick={handleOpenRecentsMenu} sx={{ p: 0 }}>
                    <ScheduleIcon
                      style={{
                        fontSize: "2rem",
                        color: "white",
                      }}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorRecents}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorRecents)}
                  onClose={handleCloseRecentsMenu}
                >
                  <div
                    className="flex flex-col gap-2  px-4"
                    style={{ minWidth: "500px" }}
                  >
                    <div className="flex justify-between items-center">
                      <p className="text-xl font-bold font-[Poppins]">
                        Recent Activities
                      </p>
                      <div
                        onClick={() => setIsRefresh(!isRefresh)}
                        className={`transition-transform duration-300 ease-in-out rounded-lg cursor-pointer ${rotateClass}`}
                      >
                        <CachedOutlinedIcon
                          style={{
                            borderRadius: 100,
                            fontSize: "2rem",
                          }}
                        />
                      </div>
                    </div>
                    <div className="">
                      <RecentsTab isRefresh={isRefresh} />
                    </div>
                  </div>
                </Menu>
              </Box>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Profile">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <AccountCircleIcon
                      style={{ fontSize: "2rem", color: "white" }}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorSettings}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorSettings)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <div
                        className="flex gap-2"
                        onClick={() => handleLogout()}
                      >
                        <LogoutIcon />
                        {setting}
                      </div>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </div>
          </Toolbar>
        </div>
      </div>
      <div className="outlet-container flex-1">
        <Outlet />
      </div>
    </div>
  );
}
export default NavBar;
