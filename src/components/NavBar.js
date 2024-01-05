import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Cookies from "js-cookie";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link as NavLink, Outlet, useNavigate } from "react-router-dom";

const pages = ["Dashboard", "Record"];
const link = ["/dashboard", "/record"];
const settings = ["Logout"];

function NavBar() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleGoToLink = (link) => {
    navigate(link);
  };

  const handleLogout = () => {
    Cookies.set("token", "", { expires: new Date(0) });
    navigate("/login");
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
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
                // border: "2px solid black",
                gap: "20px",
                margin: "0 50px",
              }}
            >
              {pages.map((page, index) => (
                <NavLink key={index} to={link[index]} className="text-xl">
                  {index === 0 ? (
                    <div
                      className={`${
                        window.location.pathname.startsWith("/dashboard")
                          ? "bg-gray-700"
                          : ""
                      } px-2 py-1 rounded-md transition ease-in-out`}
                    >
                      <p>{page}</p>
                    </div>
                  ) : index === 1 ? (
                    <div
                      className={`${
                        window.location.pathname.startsWith("/record")
                          ? "bg-gray-700"
                          : ""
                      } px-2 py-1 rounded-md transition ease-in-out`}
                    >
                      <p>{page}</p>
                    </div>
                  ) : null}
                </NavLink>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
                  <AccountCircleIcon
                    style={{ fontSize: "2rem", color: "white" }}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography
                      textAlign="center"
                      onClick={() => handleLogout()}
                    >
                      <div className="flex gap-2">
                        <LogoutIcon />
                        {setting}
                      </div>
                    </Typography>
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
