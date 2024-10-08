// src/components/UserList.tsx

import React from 'react';
import { User } from '../models/User';
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';

interface UserListProps {
  users: User[];
  onDelete: (id: string) => void;
  onEdit: (user: User) => void;
  onView: (user: User) => void;
  renderIcons?: (user: User) => React.ReactNode;
}

const UserList: React.FC<UserListProps> = ({
  users,
  renderIcons,
}) => {
  return (
    <List>
      {users.map((user) => (
        <ListItem key={user._id} divider>
          <ListItemText primary={user.username} secondary={user.email} />
          {renderIcons && renderIcons(user)}
        </ListItem>
      ))}
    </List>
  );
};

export default UserList;



