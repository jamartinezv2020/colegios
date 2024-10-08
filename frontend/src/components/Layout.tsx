// src/components/Layout.tsx

import React, { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';

interface LayoutProps {
  children: ReactNode;
}

/**
 * Componente de diseño general que incluye navegación y contenido principal.
 * 
 * @param {LayoutProps} props - Las propiedades del componente, incluyendo los hijos a renderizar.
 * @returns {JSX.Element} - El componente Layout.
 */
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();

  /**
   * Maneja el cierre de sesión del usuario.
   */
  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div>
      <nav>
        <Link to="/dashboard">Dashboard</Link>
        <button onClick={handleLogout}>Logout</button>
      </nav>
      <main>{children}</main>
    </div>
  );
};

export default Layout;

