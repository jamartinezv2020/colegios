// src/context/AuthContext.tsx

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

// Definición de la interfaz para el contexto de autenticación
interface AuthContextProps {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

// Creando el contexto de autenticación
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Proveedor de autenticación que envuelve la aplicación
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Estado para almacenar el token
  const [token, setToken] = useState<string | null>(() => {
    // Inicializar el estado del token desde localStorage si existe
    return localStorage.getItem('token');
  });

  useEffect(() => {
    // Configurar axios para incluir el token en cada solicitud si está presente
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Función de inicio de sesión que guarda el token en el estado y en localStorage
  const login = (token: string) => {
    setToken(token);
    localStorage.setItem('token', token); // Almacenar el token en localStorage
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  // Función de cierre de sesión que elimina el token del estado y de localStorage
  const logout = () => {
    setToken(null);
    localStorage.removeItem('token'); // Eliminar el token de localStorage
    delete axios.defaults.headers.common['Authorization'];
  };

  // Función para verificar si el usuario está autenticado
  const isAuthenticated = () => {
    return token !== null;
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
