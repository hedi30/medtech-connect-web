import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  TextField,
  InputAdornment,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import AddIcon from "@mui/icons-material/Add";

const DisplayGroupChats = ({ groupChats, onDelete }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleClickOpen = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedId(null);
  };

  const handleConfirmDelete = () => {
    onDelete(selectedId);
    handleClose();
  };

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
      {/* ✅ Search Bar (modern TextField style) */}
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
            { field: "level", headerName: "Level", width: 150 },
            { field: "speciality", headerName: "Speciality", width: 200 },
            { field: "creationDate", headerName: "Creation Date", width: 180 },
            { field: "term", headerName: "Term", width: 120 },
            {
              field: "actions",
              headerName: "Actions",
              width: 120,
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

                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClickOpen(params.row.id);
                    }}
                  >
                    <DeleteRoundedIcon style={{ color: "#3881a5" }} />
                  </IconButton>
                </Box>
              ),
            },
          ]}
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

      {/* Delete Confirmation Dialog */}
      <Dialog open={open} TransitionComponent={Slide} keepMounted onClose={handleClose}>
        <DialogTitle>{"Are you sure you want to delete?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>This action cannot be undone.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DisplayGroupChats;
