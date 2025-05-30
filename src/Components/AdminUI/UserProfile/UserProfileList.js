import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  InputAdornment,
  TextField,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Snackbar,
  Alert,
  Avatar,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserProfileList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [rows, setRows] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://209.38.178.0/api/user/get-users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const users = Array.isArray(response.data.data)
          ? response.data.data
          : [];
        setRows(users);
      })
      .catch((error) => {
        console.error("❌ Error fetching users:", error);
        setRows([]);
      });
  }, []);

  const filteredRows = Array.isArray(rows)
    ? rows.filter((row) =>
        `${row.email} ${row.isAlum} ${row.year} ${row.major} ${row.group}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
    : [];

  const handleRowClick = (param) => {
    navigate(`/admin/profiles/${param.row.id}`);
  };

  const handleClickOpen = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedId(null);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleConfirmDelete = () => {
    const token = localStorage.getItem("token");

    axios
      .delete("http://209.38.178.0/api/user/delete-user-admin/", {
        data: { userId: selectedId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setRows((prevRows) => prevRows.filter((row) => row.id !== selectedId));
        setSnackbarOpen(true);
        handleClose();
      })
      .catch((error) => {
        console.error("❌ Error deleting user:", error);
        handleClose();
      });
  };

  const renderNA = () => (
    <Typography
      variant="body2"
      color="text.secondary"
      fontStyle="italic"
      sx={{ mt: "14px" }}
    >
      N/A
    </Typography>
  );

  const columns = [
    {
      field: "imageUri",
      headerName: "Photo",
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <Avatar
          alt={params.row.name}
          src={params.row.imageUri}
          sx={{ width: 40, height: 40 }}
        />
      ),
    },
    { field: "email", headerName: "Email", width: 250 },
    {
      field: "role",
      headerName: "Role",
      width: 150,
      renderCell: (params) => (params.row.isAlum ? "Alumni" : "Student"),
    },
    {
      field: "level",
      headerName: "Level",
      width: 150,
      renderCell: (params) => {
        if (params.row.isAlum) return renderNA();
        switch (params.row.year) {
          case 1:
            return "Freshman";
          case 2:
            return "Sophomore";
          case 3:
            return "Junior";
          case 4:
            return "Senior";
          case 5:
            return "Final";
          default:
            return renderNA();
        }
      },
    },
    {
      field: "major",
      headerName: "Major",
      width: 180,
      renderCell: (params) => {
        switch (params.row.major) {
          case 1:
            return "Pre-Engineering";
          case 2:
            return "Software";
          case 3:
            return "Computer Systems";
          case 4:
            return "Renewable";
          default:
            return renderNA();
        }
      },
    },
    {
      field: "graduationYear",
      headerName: "Graduation Year",
      width: 160,
      renderCell: (params) => {
        if (params.row.isAlum && params.row.graduationYear) {
          const year = new Date(params.row.graduationYear).getFullYear();
          return isNaN(year) ? renderNA() : year;
        }

        const currentYear = new Date().getFullYear();
        switch (params.row.year) {
          case 1:
            return currentYear + 4;
          case 2:
            return currentYear + 3;
          case 3:
            return currentYear + 2;
          case 4:
            return currentYear + 1;
          case 5:
            return currentYear;
          default:
            return renderNA();
        }
      },
    },
    {
      field: "group",
      headerName: "Group",
      width: 150,
      renderCell: (params) => {
        if (params.row.isAlum || !params.row.group) {
          return renderNA();
        }
        return params.row.group;
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <Box display="flex" gap={1}>
          <IconButton
            onClick={(event) => {
              event.stopPropagation();
              handleClickOpen(params.row.id);
            }}
          >
            <DeleteRoundedIcon style={{ color: "#3881a5" }} />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <Box sx={{ my: 2, display: "flex", justifyContent: "center" }}>
        <TextField
          variant="outlined"
          placeholder="Search by email or username"
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

      <Paper sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSizeOptions={[5, 10]}
          getRowId={(row) => row.id}
          onRowClick={handleRowClick}
        />
      </Paper>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Are you sure you want to delete this profile?</DialogTitle>
        <DialogContent>
          <DialogContentText>This action cannot be undone.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          User deleted successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserProfileList;
