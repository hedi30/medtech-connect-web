import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Get URL params
import { Box, Paper, Typography } from "@mui/material";
import UserList from "./UserList";
import GroupChatForm from "./GroupChatForm";

const CreateGroupChat = () => {
  const { groupId } = useParams(); // Get group ID from URL if editing
  const isEditMode = Boolean(groupId); // If groupId exists, it's edit mode
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [groupData, setGroupData] = useState({ name: "", description: "" });

  useEffect(() => {
    if (isEditMode) {
      // TODO: Fetch group data from API when available
      console.log(`Fetching group chat with ID: ${groupId}`);
      setGroupData({
        name: "Example Group",
        description: "Example description",
      }); // Mock data
      setSelectedUsers(["user1", "user2"]); // Mock selected users
    }
  }, [groupId, isEditMode]);

  const handleSubmit = (data) => {
    if (isEditMode) {
      console.log("Updating Group Data:", { ...data, members: selectedUsers });
      alert("Group Chat Updated Successfully!");
    } else {
      console.log("Creating New Group Data:", {
        ...data,
        members: selectedUsers,
      });
      alert("Group Chat Created Successfully!");
    }
  };

  const handleCancel = () => {
    setSelectedUsers([]);
    console.log("Operation canceled");
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 3,
        padding: 3,
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <Box sx={{ flex: 1 }} />
      <Paper
        sx={{ flex: 2, padding: 3, boxShadow: 3, backgroundColor: "#ffffff" }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#3881a5" }}
        >
          {isEditMode ? "Edit Group Chat" : "Create New Group Chat"}
        </Typography>
        <GroupChatForm
          initialData={groupData}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          buttonText={isEditMode ? "Update" : "Create Chat"}
        />
      </Paper>
      <Paper
        sx={{ flex: 1, padding: 2, boxShadow: 3, backgroundColor: "#ffffff" }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{ color: "#3881a5", fontWeight: "bold" }}
        >
          Select Members
        </Typography>
        <UserList
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
        />
      </Paper>
    </Box>
  );
};

export default CreateGroupChat;
