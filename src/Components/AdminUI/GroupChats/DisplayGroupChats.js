import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Paper,
  Button,
  IconButton,
  TextField,
  InputAdornment,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import AddIcon from "@mui/icons-material/Add";

const DisplayGroupChats = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [groupChats, setGroupChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroupChats = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://209.38.178.0/api/chat/admin/all-chats",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const chatList = Array.isArray(response.data)
          ? response.data
          : response.data?.chatList || [];

        const filteredChats = chatList.filter((chat) => chat.isGroupChat === true);

        const formattedChats = filteredChats.map((chat) => {
          let year = "Not specified";
          let speciality = "Not specified";
          let group = "Not specified";

          if (chat.groupName) {
            const nameParts = chat.groupName.split(" - ");
            if (nameParts[0]) year = nameParts[0];
            if (nameParts[1]) speciality = nameParts[1];
            if (nameParts[2]) group = nameParts[2].replace("Group ", "");
          }

          return {
            id: chat.id,
            name: chat.groupName || "Unnamed Group",
            year,
            speciality,
            creationDate: new Date(chat.createdAt).toLocaleDateString(),
            group,
            groupIdentifier: chat.groupIdentifier || "Not specified",
            messageCount: chat._count?.messages || 0,
          };
        });

        setGroupChats(formattedChats);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching group chats:", err);
        setError("Failed to load group chats");
        setLoading(false);
      }
    };

    fetchGroupChats();
  }, []);

  const filteredRows = groupChats.filter(
    (chat) =>
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.speciality.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRowClick = (param, event) => {
    if (event.target.closest(".action-buttons")) return;
    navigate(`/admin/chats/${param.row.id}`);
  };

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", padding: "20px", borderRadius: "10px" }}>
      {/* Search Bar */}
      <Box sx={{ my: 2, display: "flex", justifyContent: "center" }}>
        <TextField
          variant="outlined"
          placeholder="Search Group Chats..."
          size="small"
          sx={{ width: 400 }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#3881a5" }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Group Chat Table */}
      <Paper
        sx={{
          height: 400,
          width: "100%",
          backgroundColor: "#ffffff",
          borderRadius: "10px",
        }}
      >
        <DataGrid
          rows={filteredRows}
          columns={[
            { field: "id", headerName: "ID", width: 70 },
            { field: "name", headerName: "Group Name", width: 200 },
            { field: "year", headerName: "Year", width: 150 },
            { field: "speciality", headerName: "Speciality", width: 200 },
            { field: "creationDate", headerName: "Creation Date", width: 180 },
            { field: "group", headerName: "Group", width: 120 },
            {
              field: "actions",
              headerName: "Actions",
              width: 100,
              renderCell: (params) => (
                <Box display="flex" gap={1} className="action-buttons">
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/admin/chats/edit/${params.row.id}`);
                    }}
                  >
                    <EditRoundedIcon style={{ color: "#3881a5" }} />
                  </IconButton>
                </Box>
              ),
            },
          ]}
          loading={loading}
          pageSizeOptions={[5, 10]}
          onRowClick={handleRowClick}
          sx={{ border: 0 }}
        />
      </Paper>

      {/* Add Group Button */}
      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate("/admin/chats/create")}
          sx={{
            backgroundColor: "#3881a5",
            "&:hover": { backgroundColor: "#56A9D1" },
          }}
        >
          Add Group
        </Button>
      </Box>
    </Box>
  );
};

export default DisplayGroupChats;
