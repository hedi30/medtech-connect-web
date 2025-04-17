import React, { useState } from 'react';
import { List, ListItem, ListItemButton, ListItemText, ListItemAvatar, Checkbox, Avatar, IconButton, TextField, Box, Divider, Chip, Typography } from '@mui/material';
import SelectAllIcon from '@mui/icons-material/SelectAll';
import StarIcon from '@mui/icons-material/Star';
import SearchIcon from '@mui/icons-material/Search';

const users = [
  { id: 0, name: "John Doe", avatar: "/static/images/avatar/1.jpg", role: "alumni", jobTitle: "Software Engineer" },
  { id: 1, name: "Jane Smith", avatar: "/static/images/avatar/2.jpg", role: "student", level: "Freshman", group: "G1" },
  { id: 2, name: "Alice Brown", avatar: "/static/images/avatar/3.jpg", role: "student", level: "Sophomore", group: "G2" },
  { id: 3, name: "Bob Johnson", avatar: "/static/images/avatar/4.jpg", role: "student", level: "Licence", group: "G3" },
];

const UserList = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectAll, setSelectAll] = useState(false);

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
      setSelectedUsers(users.map((user) => user.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users.filter((user) => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (user.level && user.level.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (user.group && user.group.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (user.jobTitle && user.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <Box sx={{ width: '100%', maxWidth: 800, bgcolor: 'background.paper', padding: 2 }}>
      {/* Search bar */}
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
        <TextField
          size="small"
          label="Search"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ flex: 1 }}
        />
      </Box>

      {/* Select All button on the same level */}
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
        <IconButton onClick={handleSelectAll} color={selectAll ? "primary" : "default"} sx={{ marginRight: 1 }}>
          <SelectAllIcon />
        </IconButton>
        <Typography variant="body2">
          Select All
        </Typography>
      </Box>

      <List dense>
        {filteredUsers.map((user) => (
          <React.Fragment key={user.id}>
            <ListItem
              secondaryAction={
                <Checkbox
                  edge="end"
                  onChange={handleToggle(user.id)}
                  checked={selectedUsers.includes(user.id)}
                  inputProps={{ 'aria-labelledby': `checkbox-list-secondary-label-${user.id}` }}
                />
              }
              disablePadding
            >
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar alt={user.name} src={user.avatar} />
                </ListItemAvatar>
                <ListItemText
                  id={`checkbox-list-secondary-label-${user.id}`}
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {/* Display star for alumni */}
                      {user.role === 'alumni' && <StarIcon sx={{ fontSize: 16, color: 'gold', marginRight: 1 }} />}
                      {user.name}
                    </Box>
                  }
                  secondary={
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      {/* Display labels for students with combined Level and Group */}
                      {user.role === 'student' && (
                        <Chip label={`${user.level} ${user.group}`} size="small" sx={{ marginTop: 1, marginBottom: 1 }} />
                      )}
                      {/* Display job title for alumni */}
                      {user.role === 'alumni' && (
                        <Chip label={user.jobTitle} size="small" sx={{ marginTop: 1, marginBottom: 1 }} />
                      )}
                    </Box>
                  }
                />
              </ListItemButton>
            </ListItem>

            {/* Divider for separation */}
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default UserList;
