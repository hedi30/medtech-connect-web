// GroupChatDetails.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
  Avatar,
} from "@mui/material";

const GroupChatDetails = () => {
  const { groupId } = useParams(); // Extract the groupId from the URL
  const [chatDetails, setChatDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroupChatDetails = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://209.38.178.0/api/chat/admin/all-chats",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Find the specific chat by groupId
        const chats = Array.isArray(response.data)
          ? response.data
          : response.data && Array.isArray(response.data.chatList)
          ? response.data.chatList
          : [];

        const selectedChat = chats.find((chat) => chat.id === groupId);

        if (selectedChat) {
          setChatDetails(selectedChat);
        } else {
          setError("Group chat not found");
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching group chat details:", err);
        setError("Failed to load group chat details");
        setLoading(false);
      }
    };

    if (groupId) {
      fetchGroupChatDetails();
    }
  }, [groupId]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="300px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Typography variant="h4" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  if (!chatDetails) {
    return (
      <Box>
        <Typography variant="h4">Group Chat Not Found</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" mb={3}>
        Group Chat Details
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Typography variant="h5" color="primary" gutterBottom>
          {chatDetails.groupName || "Unnamed Group"}
        </Typography>

        <Typography variant="body1" sx={{ marginTop: 2 }}>
          <strong>Group ID:</strong> {chatDetails.id}
        </Typography>

        {chatDetails.groupIdentifier && (
          <Typography variant="body1">
            <strong>Group Identifier:</strong> {chatDetails.groupIdentifier}
          </Typography>
        )}

        <Typography variant="body1">
          <strong>Created:</strong>{" "}
          {new Date(chatDetails.createdAt).toLocaleString()}
        </Typography>

        <Typography variant="body1">
          <strong>Last Updated:</strong>{" "}
          {new Date(chatDetails.updatedAt).toLocaleString()}
        </Typography>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          Messages
        </Typography>

        {chatDetails.messages && chatDetails.messages.length > 0 ? (
          <List>
            {chatDetails.messages.map((message, index) => (
              <React.Fragment key={message.id}>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={
                      <Box display="flex" justifyContent="space-between">
                        <Typography
                          component="span"
                          variant="body1"
                          fontWeight="bold"
                        >
                          {/* Show username instead of sender ID */}
                          {message.sender && message.sender.userName
                            ? message.sender.userName
                            : "Unknown User"}
                        </Typography>
                        <Typography
                          component="span"
                          variant="caption"
                          color="text.secondary"
                        >
                          {new Date(message.createdAt).toLocaleString()}
                        </Typography>
                      </Box>
                    }
                    secondary={message.text}
                  />
                </ListItem>
                {index < chatDetails.messages.length - 1 && (
                  <Divider component="li" />
                )}
              </React.Fragment>
            ))}
          </List>
        ) : (
          <Typography variant="body1">
            No messages in this group chat yet.
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default GroupChatDetails;
