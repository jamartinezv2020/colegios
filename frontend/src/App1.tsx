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
import RoleManagementPage from './pages/RoleManagementPage/RoleManagementPage'; // Importar la nueva página
import SearchResultsPage from './pages/SearchResultsPage/SearchResultsPage';
import UserManagementPage from './pages/UserManagementPage/UserManagementPage';
import LearningStyleFelderSilvermanForm from './components/LearningStyleFelderSilvermanForm';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/join" element={<JoinUsPage />} />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="role-management" element={<RoleManagementPage />} /> {/* Nueva ruta */}
            <Route path="/admin/users" element={<UserManagementPage />} />
            <Route path="/admin/stylefeldersilverman" element={<LearningStyleFelderSilvermanForm />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;








