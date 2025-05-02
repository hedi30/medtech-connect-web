import React from "react";
import { Box, Typography } from "@mui/material";
import ThreeCards from "./ThreeCards"; // Adjust the path accordingly
import AdminPost from "./AdminPost"; // Import the AdminPost component
import MyChart from "./MyChart"; // Import the chart component
import Bars from "./Bars"; // Import Bars.js

const AdminDashboard = () => {
  return (
    <Box sx={{ padding: "20px" }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#3881a5" }}
      >
        {" "}
        Welcome to the Admin Dashboard
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "stretch",
          gap: 2,
        }}
      >
        {/* Render ThreeCards component */}
        <Box sx={{ flex: 1 }}>
          <ThreeCards />
        </Box>

        {/* Render AdminPost component */}
        <Box sx={{ flex: 1 }}>
          <AdminPost />
        </Box>
      </Box>

      {/* Render MyChart separately with equal width */}
      <Box
        sx={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Box sx={{ width: "80%" }}>
          <MyChart />
        </Box>
      </Box>

      {/* Render Bars chart separately with equal width */}
      <Box
        sx={{
          marginTop: "150px",
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Box sx={{ width: "80%" }}>
          <Bars />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
