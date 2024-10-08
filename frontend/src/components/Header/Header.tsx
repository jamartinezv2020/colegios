// src/components/Header/Header.tsx

import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Logo from '../../assets/logo.png'; // Verifica que la ruta sea correcta

const LogoImage = styled('img')({
  height: '40px', // Ajusta el tamaño según sea necesario
  marginRight: '16px',
});

interface HeaderProps {
  handleDrawerToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ handleDrawerToggle }) => {
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: 'primary.main', boxShadow: 3 }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleDrawerToggle}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <LogoImage src={Logo} alt="Logo" />
          <Typography variant="h6" component="div">
            Dashboard
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;








