import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DisplayGroupChats from "./DisplayGroupChats";

const ManageGroupChats = () => {
  const navigate = useNavigate();

  const [groupChats, setGroupChats] = useState([
    
    {
      id:1,
      name: "SophG2",
      level: "Sophomore",
      speciality: "Computer Systems",
      creationDate: "2025-05-8",
      term: "Fall",
    },
    
  ]);

  // Function to delete a group chat
  const handleDelete = (id) => {
    setGroupChats(groupChats.filter((chat) => chat.id !== id));
  };

  // Function to update an existing group chat
  const handleEdit = (updatedGroupChat) => {
    setGroupChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === updatedGroupChat.id ? updatedGroupChat : chat
      )
    );
    navigate("/admin/chats"); // Redirect back after editing
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: "bold", color: "#3881a5" }}>
        Group Chats Management
      </Typography>
      <Typography variant="body1" sx={{ marginTop: 2 }}>
        Here you can create, edit, delete, and monitor group chats.
      </Typography>

      <DisplayGroupChats groupChats={groupChats} onDelete={handleDelete} />
    </Box>
  );
};

export default ManageGroupChats;
