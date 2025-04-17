// GroupChatDetails.js
import React from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";

const GroupChatDetails = () => {
  const { groupId } = useParams(); // Extract the groupId from the URL

  // For simplicity, you can display the groupId
  return (
    <Box>
      <Typography variant="h4">Group Chat Details</Typography>
      <Typography variant="body1" sx={{ marginTop: 2 }}>
        Group Chat ID: {groupId}
      </Typography>
    </Box>
  );
};

export default GroupChatDetails;
