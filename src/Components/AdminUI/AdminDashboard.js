import React from "react";
import { Box, Typography } from "@mui/material";
import MyChart from "./MyChart";
import Bars from "./Bars";
import Dashboard from "./UsersRegistered";
import Alumni from "./AlumniEngagement";
import DataBars from "./DataBars";
import BasicPie from "./BasicPie"; // Import the PieChart component

const AdminDashboard = () => {
  return (
    <Box sx={{ padding: "20px" }}>
 <Typography
  variant="h6"
  gutterBottom
  sx={{
    fontWeight: "bold",
    color: "#333", // A dark grey for consistency
    fontSize: "1.1rem",
    marginBottom: "30px",
  }}
>
  Hi, Welcome back 👋
</Typography>


      {/* 2 columns layout: Dashboard + Alumni, then DataBars and PieChart side by side */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "stretch", // Ensures equal height for components in both columns
        }}
      >
        {/* Left column: Dashboard + DataBars */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Dashboard />
          </Box>
          <Box sx={{ flex: 1 }}>
            <DataBars />
          </Box>
        </Box>

        {/* Right column: Alumni + PieChart */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Alumni />
          </Box>
          <Box sx={{ flex: 1 }}>
            <BasicPie /> {/* Add the PieChart next to DataBars */}
          </Box>
        </Box>
      </Box>

      {/* MyChart Section */}
      <Box
        sx={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Box sx={{ width: "80%" }}>
        </Box>
      </Box>

      {/* Bars Chart Section */}
      <Box
        sx={{
          marginTop: "40px",  // Reduced the marginTop for Bars component to bring it closer
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Box sx={{ width: "80%" }}> {/* Adjusted the width here */}
          <Bars />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
