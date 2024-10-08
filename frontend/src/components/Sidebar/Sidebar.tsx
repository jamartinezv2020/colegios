import React from 'react';
import { Drawer, Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import GroupIcon from '@mui/icons-material/Group';
import SearchIcon from '@mui/icons-material/Search';
import UserIcon from '@mui/icons-material/Person';
import LearningIcon from '@mui/icons-material/School';
import RoleIcon from '@mui/icons-material/Assignment'; // Icono para roles

interface SidebarProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
  onPageChange: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, handleDrawerToggle, onPageChange }) => {
  const drawerWidth = 240;

  const drawer = (
    <Box sx={{ width: drawerWidth }}>
      <List>
        <ListItem button onClick={() => onPageChange('home')}>
          <ListItemIcon>
            <HomeIcon sx={{ color: 'primary.main' }} />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>

        <ListItem button onClick={() => onPageChange('analytics')}>
          <ListItemIcon>
            <AnalyticsIcon sx={{ color: 'secondary.main' }} />
          </ListItemIcon>
          <ListItemText primary="Analytics" />
        </ListItem>

        <ListItem button onClick={() => onPageChange('teacanalytics')}>
          <ListItemIcon>
            <AnalyticsIcon sx={{ color: 'info.main' }} />
          </ListItemIcon>
          <ListItemText primary="Teac Analytics" />
        </ListItem>

        <ListItem button onClick={() => onPageChange('settings')}>
          <ListItemIcon>
            <SettingsIcon sx={{ color: 'success.main' }} />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>

        <ListItem button onClick={() => onPageChange('about')}>
          <ListItemIcon>
            <InfoIcon sx={{ color: 'warning.main' }} />
          </ListItemIcon>
          <ListItemText primary="About" />
        </ListItem>

        <ListItem button onClick={() => onPageChange('join')}>
          <ListItemIcon>
            <GroupIcon sx={{ color: 'error.main' }} />
          </ListItemIcon>
          <ListItemText primary="Join Us" />
        </ListItem>

        <ListItem button onClick={() => onPageChange('search')}>
          <ListItemIcon>
            <SearchIcon sx={{ color: 'text.primary' }} />
          </ListItemIcon>
          <ListItemText primary="Search" />
        </ListItem>

        <ListItem button onClick={() => onPageChange('userManagement')}>
          <ListItemIcon>
            <UserIcon sx={{ color: 'text.secondary' }} />
          </ListItemIcon>
          <ListItemText primary="User Management" />
        </ListItem>

        <ListItem button onClick={() => onPageChange('roleManagement')}>
          <ListItemIcon>
            <RoleIcon sx={{ color: 'text.primary' }} />
          </ListItemIcon>
          <ListItemText primary="Role Management" />
        </ListItem>

        <ListItem button onClick={() => onPageChange('learningStyleFelderSilverman')}>
          <ListItemIcon>
            <LearningIcon sx={{ color: 'text.primary' }} />
          </ListItemIcon>
          <ListItemText primary="Learning Styles" />
        </ListItem>

        <ListItem button onClick={() => onPageChange('kuderQuizPage')}>
          <ListItemIcon>
            <LearningIcon sx={{ color: 'text.primary' }} />
          </ListItemIcon>
          <ListItemText primary="Kuder Quiz" />
        </ListItem>

        <ListItem button onClick={() => onPageChange('kuderResultsPage')}>
          <ListItemIcon>
            <LearningIcon sx={{ color: 'text.primary' }} />
          </ListItemIcon>
          <ListItemText primary="Kuder Results" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <nav>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </nav>
  );
};

export default Sidebar;











