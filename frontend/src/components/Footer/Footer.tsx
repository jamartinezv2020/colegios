// src/components/Footer/Footer.tsx

import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { Instagram, Twitter, Facebook } from '@mui/icons-material'; // Agregar iconos si los necesitas

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        bgcolor: 'background.paper',
        textAlign: 'center',
        borderTop: '1px solid #ddd', // Línea de separación sutil
      }}
    >
      <Typography variant="body2" color="text.secondary">
        &copy; {new Date().getFullYear()} PRICA. All rights reserved.
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        Made with ❤️ by <Link href="https://prica.com.co/web2024" target="_blank" rel="noopener" color="primary">José Alfredo Martínez Valdés</Link>
      </Typography>
      {/* Agregar iconos si es relevante */}
      {/* <Box sx={{ mt: 2 }}>
        <Link href="https://instagram.com" target="_blank" rel="noopener" color="inherit" sx={{ mx: 1 }}>
          <Instagram />
        </Link>
        <Link href="https://twitter.com" target="_blank" rel="noopener" color="inherit" sx={{ mx: 1 }}>
          <Twitter />
        </Link>
        <Link href="https://facebook.com" target="_blank" rel="noopener" color="inherit" sx={{ mx: 1 }}>
          <Facebook />
        </Link>
      </Box> */}
    </Box>
  );
};

export default Footer;

