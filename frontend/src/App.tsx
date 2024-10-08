// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import LoginForm from './components/LoginForm';
import RoleList from './components/RoleList';
import RoleForm from './components/RoleForm';
import { RoleProvider } from './context/RoleContext';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './components/Dashboard/Dashboard';
import AboutPage from './pages/AboutPage/AboutPage';
import Analytics from './pages/Analytics/Analytics';
import JoinUsPage from './pages/JoinUsPage/JoinUsPage';
import RoleManagementPage from './pages/RoleManagementPage/RoleManagementPage';
import SearchResultsPage from './pages/SearchResultsPage/SearchResultsPage';
import UserManagementPage from './pages/UserManagementPage/UserManagementPage';
import LearningStyleFelderSilvermanForm from './components/LearningStyleFelderSilvermanForm';
import { ThemeProvider } from '@mui/material/styles'; // Importa ThemeProvider
import theme from './theme'; // Importa el tema

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <ThemeProvider theme={theme}> {/* Envuelve tu aplicación con ThemeProvider */}
          <div className="App">
            <RoleProvider>
              <Routes>
                {/* Rutas Públicas */}
                <Route path="/login" element={<LoginForm />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/join" element={<JoinUsPage />} />
                <Route path="/search" element={<SearchResultsPage />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/" element={<Navigate to="/login" />} />
                
                {/* Rutas Privadas */}
                <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} />
                <Route path="/admin/users" element={<PrivateRoute component={UserManagementPage} />} />
                <Route path="/admin/stylefeldersilverman" element={<PrivateRoute component={LearningStyleFelderSilvermanForm} />} />

                {/* Rutas para la gestión de roles */}
                <Route path="/role-management" element={<PrivateRoute component={RoleManagementPage} />} />
                <Route path="/roles" element={<PrivateRoute component={RoleList} />} />
                <Route path="/roles/create" element={<PrivateRoute component={RoleForm} />} />
                <Route path="/roles/edit/:id" element={<PrivateRoute component={RoleForm} />} />
              </Routes>
            </RoleProvider>
          </div>
        </ThemeProvider> {/* Cierra ThemeProvider */}
      </Router>
    </AuthProvider>
  );
};

export default App;
