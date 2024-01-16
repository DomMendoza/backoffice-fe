import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { toast } from "react-toastify";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../services/postLogin";
import { postAuditLog } from "../services/postAuditLog";
import { postSignUp } from "../services/postSignUp";
import BreadCrumbs from "../components/BreadCrumbs";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Breddas Back Office
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const [userClass, setUserClass] = React.useState("");

  const handleChangeUserClass = (event) => {
    setUserClass(event.target.value);
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get("username");
    const password = data.get("password");

    if (username && password && userClass) {
      const result = await postSignUp(username, password, userClass);
      console.log(result);

      if (result.message) {
        navigate("/login");
        toast.success("Account successfully Created");
      }
    } else {
      toast.error("All fields are required.");
    }
  };

  return (
    <div className="main-container h-full flex justify-center">
      <div className="items-container w-[95%] my-8 flex flex-col justify-start items-start gap-4 ">
        <div className="breadcrumb-container flex flex-col gap-4">
          <BreadCrumbs route="Account" pathName="Manage Accounts" />
          <div className="flex flex-col">
            <p className="capitalize text-3xl font-semibold font-['Poppins']">
              Create an account
            </p>
            <p className="capitalize text-base font-['Poppins'] text-gray-600">
              Manage accounts here.
            </p>
          </div>
        </div>
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box component="form" onSubmit={handleSignUp} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              inputProps={{ style: { fontFamily: "Poppins, sans serif" } }}
              InputLabelProps={{
                style: { fontFamily: "Poppins, sans serif" },
              }}
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              inputProps={{ style: { fontFamily: "Poppins, sans serif" } }}
              InputLabelProps={{
                style: { fontFamily: "Poppins, sans serif" },
              }}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Box sx={{ maxWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Class</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={userClass}
                  label="userClass"
                  onChange={handleChangeUserClass}
                >
                  <MenuItem value={1}>Admin</MenuItem>
                  <MenuItem value={2}>PAGCOR</MenuItem>
                  <MenuItem value={3}>Developer</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                padding: 1.5,
                fontSize: "1.1rem",
              }}
            >
              Register
            </Button>
          </Box>
        </Box>
      </div>
    </div>
  );
}
