import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import UserProfileList from "./UserProfileList";

const ManageUserProfiles = () => {
  useEffect(() => {
    console.log("ManageUserProfiles component loaded!");
  }, []);

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: "bold", color: "#3881a5" }}>
        User Profiles Management
      </Typography>
      <Typography variant="body1" sx={{ marginTop: 2 }}>
        View, edit, or delete user profiles.
      </Typography>

      {/* Debugging Message */}
      <Typography variant="body2" color="red"></Typography>

      {/* Display User List */}
      <UserProfileList />
    </Box>
  );
};

export default ManageUserProfiles;
