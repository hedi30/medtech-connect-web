import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ForumIcon from "@mui/icons-material/Forum";
import PersonIcon from "@mui/icons-material/Person";

const sections = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: <DashboardIcon />,
    path: "/dashboard",
  },
  {
    key: "manage-posts",
    label: "Manage Posts",
    icon: <PostAddIcon />,
    path: "/manage-posts",
  },
  {
    key: "manage-group-chats",
    label: "Manage Group Chats",
    icon: <ForumIcon />,
    path: "/manage-group-chats",
  },
  {
    key: "manage-user-profiles",
    label: "Manage User Profiles",
    icon: <PersonIcon />,
    path: "/admin/profiles",
  },
];

const AdminNavbar = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  return (
    <Box
      sx={{
        width: "250px",
        background: "#f5f5f5",
        padding: 2,
        height: "100vh",
      }}
    >
      {/* Sidebar Title Based on Active Section */}
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        {sections.find((section) => section.key === activeSection)?.label ||
          "Admin Panel"}
      </Typography>

      {/* Navigation Buttons */}
      {sections.map((section) => (
        <Button
          key={section.key}
          component={Link}
          to={section.path}
          startIcon={section.icon}
          onClick={() => setActiveSection(section.key)}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            width: "100%",
            backgroundColor:
              activeSection === section.key ? "#e0e0e0" : "#f8f7f1",
            "&:hover": { backgroundColor: "#d6d6d6" },
            color: "#000",
            marginBottom: 1,
          }}
        >
          {section.label}
        </Button>
      ))}
    </Box>
  );
};

export default AdminNavbar;
