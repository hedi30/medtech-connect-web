import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Checkbox,
  Avatar,
  IconButton,
  TextField,
  Box,
  Divider,
  Chip,
  Typography,
} from "@mui/material";
import SelectAllIcon from "@mui/icons-material/SelectAll";
import StarIcon from "@mui/icons-material/Star";
import axios from "axios";

const UserList = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://209.38.178.0/api/user/get-users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setAllUsers(response.data.data || []);
      })
      .catch((error) => {
        console.error("❌ Error fetching users:", error);
        setAllUsers([]);
      });
  }, []);

  const handleToggle = (userId) => () => {
    const newChecked = selectedUsers.includes(userId)
      ? selectedUsers.filter((id) => id !== userId)
      : [...selectedUsers, userId];
    setSelectedUsers(newChecked);
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(allUsers.map((user) => user.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = allUsers.filter((user) =>
    user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.group?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.jobTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (user.year && user.year.toString().includes(searchQuery))
  );

  return (
    <Box sx={{ width: '100%', maxWidth: 800, bgcolor: 'background.paper', padding: 2 }}>
      {/* Search Bar */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <TextField
          size="small"
          label="Search"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ flex: 1 }}
        />
      </Box>

      {/* Select All */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <IconButton onClick={handleSelectAll} color={selectAll ? "primary" : "default"} sx={{ mr: 1 }}>
          <SelectAllIcon />
        </IconButton>
        <Typography variant="body2">Select All</Typography>
      </Box>

      {/* User List */}
      <List dense>
        {filteredUsers.map((user) => (
          <React.Fragment key={user.id}>
            <ListItem
              disablePadding
              secondaryAction={
                <Checkbox
                  edge="end"
                  onChange={handleToggle(user.id)}
                  checked={selectedUsers.includes(user.id)}
                  inputProps={{ 'aria-labelledby': `checkbox-${user.id}` }}
                />
              }
            >
              <ListItemButton>
                <ListItemAvatar>
                <Avatar src={user.imageUri || ""} alt={user.name || "User"} />

                </ListItemAvatar>
                <ListItemText
                  id={`checkbox-${user.id}`}
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {user.isAlum && <StarIcon sx={{ fontSize: 16, color: 'gold', mr: 1 }} />}
                      {user.name || "Unknown"}
                    </Box>
                  }
                  secondary={
                    <Typography component="span" variant="body2" color="text.secondary">
                      {user.isAlum ? (
                        <span>
                          <Chip
                            label={user.jobTitle || "Alumni"}
                            size="small"
                            sx={{ my: 0.5 }}
                          />
                        </span>
                      ) : (
                        <span>
                          <Chip
                            label={`${formatYear(user.year)} ${user.group || ""}`.trim()}
                            size="small"
                            sx={{ my: 0.5 }}
                          />
                        </span>
                      )}
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

const formatYear = (year) => {
  switch (year) {
    case 1: return "Freshman";
    case 2: return "Sophomore";
    case 3: return "Junior";
    case 4: return "Senior";
    case 5: return "Final";
    default: return "Unknown";
  }
};

export default UserList;
