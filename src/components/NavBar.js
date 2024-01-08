import * as React from "react";
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
import LogoutIcon from "@mui/icons-material/Logout";
import { Link as NavLink, Outlet, useNavigate } from "react-router-dom";

const pages = ["Dashboard", "Members", "Reports"];
const settings = ["Logout"];
const membersMenu = ["Member Management"];
const membersLink = ["/members/manage"];
const reportsMenu = ["Gross Gaming Revenue", "Bet History"];
const reportsLink = ["/reports/ggr", "/reports/history"];

function NavBar() {
  const navigate = useNavigate();
  // const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorSettings, setAnchorSettings] = React.useState(null);
  const [anchorMembers, setAnchorMembers] = React.useState(null);
  const [anchorReports, setAnchorReports] = React.useState(null);

  //Settings
  const handleOpenUserMenu = (event) => {
    setAnchorSettings(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorSettings(null);
  };

  //Members
  const handleOpenMembersMenu = (event) => {
    setAnchorMembers(event.currentTarget);
  };
  const handleCloseMembersMenu = () => {
    setAnchorMembers(null);
  };

  //Reports
  const handleOpenReportsMenu = (event) => {
    setAnchorReports(event.currentTarget);
  };
  const handleCloseReportsMenu = () => {
    setAnchorReports(null);
  };

  const handleLogout = () => {
    Cookies.set("token", "", { expires: new Date(0) });
    navigate("/login");
  };

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
              href="/dashboard"
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
                    <NavLink
                      className={`${
                        window.location.pathname.startsWith("/dashboard")
                          ? "bg-gray-700"
                          : ""
                      } px-2 py-1 rounded-md transition ease-in-out`}
                      to="/dashboard"
                    >
                      <p>{page}</p>
                    </NavLink>
                  ) : index === 1 ? (
                    <Box
                      sx={{
                        flexGrow: 0,
                        cursor: "pointer",
                        borderRadius: "6px",
                        backgroundColor: window.location.pathname.startsWith(
                          "/members"
                        )
                          ? "#374151"
                          : "",
                      }}
                    >
                      <Tooltip onClick={handleOpenMembersMenu}>
                        <div className="text-xl px-2 py-1 rounded-md transition ease-in-out">
                          <p>{page}</p>
                        </div>
                      </Tooltip>
                      <Menu
                        sx={{ mt: "45px" }}
                        id="menu-appbar"
                        anchorEl={anchorMembers}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "center",
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "center",
                        }}
                        open={Boolean(anchorMembers)}
                        onClose={handleCloseMembersMenu}
                      >
                        {membersMenu.map((item, index) => (
                          <MenuItem
                            key={index}
                            onClick={handleCloseMembersMenu}
                          >
                            <NavLink
                              to={membersLink[index]}
                              className="text-xl"
                            >
                              <div className="flex gap-2 font-['Poppins'] ">
                                <LogoutIcon />
                                <div className="text-base flex flex-col justify-start items-start font-semibold">
                                  {item}
                                  <p className="text-xs text-gray-500 font-light">
                                    Manage members and permission
                                  </p>
                                </div>
                              </div>
                            </NavLink>
                          </MenuItem>
                        ))}
                      </Menu>
                    </Box>
                  ) : index === 2 ? (
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
                        <div className="text-xl px-2 py-1 rounded-md transition ease-in-out">
                          <p>{page}</p>
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
                              className="text-xl"
                            >
                              <div className="flex gap-2 font-['Poppins'] ">
                                <LogoutIcon />
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
                  ) : null}
                </div>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip>
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
                    <div className="flex gap-2" onClick={() => handleLogout()}>
                      <LogoutIcon />
                      {setting}
                    </div>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
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
