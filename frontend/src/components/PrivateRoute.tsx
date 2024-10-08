// Ubicación: src/components/PrivateRoute.tsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

interface PrivateRouteProps {
  component: React.FC<any>; // Aceptar cualquier tipo de props
  [key: string]: any; // Aceptar cualquier propiedad adicional
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useAuth();

  return (
    isAuthenticated() ? <Component {...rest} /> : <Navigate to="/login" />
  );
};

export default PrivateRoute;













