import React, { useState } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import {
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  Switch,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ChatIcon from "@mui/icons-material/Chat";
import PersonIcon from "@mui/icons-material/Person";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";

const drawerWidth = 240;

const sections = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: <HomeIcon />,
    path: "/admin/dashboard",
  },
  {
    key: "manage-posts",
    label: "Manage Posts",
    icon: <PostAddIcon />,
    path: "/admin/posts",
  },
  {
    key: "manage-group-chats",
    label: "Manage Group Chats",
    icon: <ChatIcon />,
    path: "/admin/chats",
  },
  {
    key: "manage-user-profile",
    label: "Manage User Profile",
    icon: <PersonIcon />,
    path: "/admin/profiles",
  },
  {
    key: "manage-suspicious-posts",
    label: "Manage Suspicious Posts",
    icon: <ReportProblemIcon />, 
    path: "/admin/suspiciousposts",
  },
];


const AdminLayout = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
    },
  });

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // Dynamically set the page title based on the route
  const currentPageTitle =
    sections.find((section) => location.pathname.includes(section.path))
      ?.label || "Admin Panel";

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        {/* Sidebar */}
        <Drawer
          variant="persistent"
          open={isDrawerOpen}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": { width: drawerWidth },
          }}
        >
          <Toolbar />
          <Typography
            variant="h6"
            sx={{ padding: "16px", fontWeight: "bold", textAlign: "center" }}
          >
            {currentPageTitle} {/* Updates dynamically */}
          </Typography>
          <List>
            {sections.map((section) => (
              <ListItem
                button
                key={section.key}
                component={Link}
                to={section.path}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px 16px",
                  borderRadius: "8px",
                  backgroundColor:
                    location.pathname === section.path
                      ? "#e0e0e0"
                      : "transparent",
                  "&:hover": {
                    backgroundColor: "rgba(120, 80, 255, 0.1)",
                    transform: "scale(1.05)",
                    transition: "transform 0.2s ease-in-out",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 32,
                    color:
                      location.pathname === section.path ? "blue" : "black",
                  }}
                >
                  {section.icon}
                </ListItemIcon>
                <ListItemText primary={section.label} />
              </ListItem>
            ))}
          </List>
        </Drawer>

        {/* Main Content */}
        <Box sx={{ flexGrow: 1 }}>
          <AppBar
            position="fixed"
            sx={{
              zIndex: (theme) => theme.zIndex.drawer + 1,
              backgroundColor: "#0083a9",
            }}
          >
            <Toolbar>
              <IconButton color="inherit" edge="start" onClick={toggleDrawer}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
                {currentPageTitle} {/* Updates dynamically */}
              </Typography>
              <IconButton onClick={toggleTheme} color="inherit">
                {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
              <Switch checked={isDarkMode} onChange={toggleTheme} />
              <IconButton color="inherit" onClick={handleLogout}>
                <LogoutIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Box component="main" sx={{ p: 3, mt: 8 }}>
            <Outlet />{" "}
            {/* This ensures the correct child component is displayed */}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AdminLayout;
