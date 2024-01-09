import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function BreadCrumbs({ route, pathName }) {
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/dashboard">
      <HomeOutlinedIcon />
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      sx={{
        fontFamily: "Poppins",
        textTransform: "capitalize",
        fontWeight: route === "Dashboard" ? "600" : "",
        color: route === "Dashboard" ? "black" : "",
      }}
    >
      {route}
    </Link>,
    route === "Dashboard" ? null : (
      <Typography
        key="3"
        color="text.primary"
        sx={{
          fontFamily: "Poppins",
          textTransform: "capitalize",
          fontWeight: "600",
        }}
      >
        {pathName}
      </Typography>
    ),
  ];

  return (
    <Stack spacing={2}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>
  );
}
