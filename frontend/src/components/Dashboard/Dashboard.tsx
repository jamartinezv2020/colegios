import React, { useState, useEffect } from 'react';
import { Box, CssBaseline, Fade } from '@mui/material';
import Navbar from '../../components/NavBar/NavBar';
import Sidebar from '../../components/Sidebar/Sidebar';
import Footer from '../../components/Footer/Footer';
import HomePage from '../../pages/HomePage';
import AnalyticsPage from '../../pages/Analytics/Analytics';
import SettingsPage from '../../pages/Settings/Settings';
import AboutPage from '../../pages/AboutPage/AboutPage';
import JoinUsPage from '../../pages/JoinUsPage/JoinUsPage';
import SearchResultsPage from '../../pages/SearchResultsPage/SearchResultsPage';
import UserManagementPage from '../../pages/UserManagementPage/UserManagementPage';
import RoleManagementPage from '../../pages/RoleManagementPage/RoleManagementPage'; // Nueva importación
import LearningStyleFelderSilvermanForm from '../../components/LearningStyleFelderSilvermanForm';
import DashboardMetrics from '../../components/DashboardMetrics/DashboardMetrics';
import TeacMetrics from '../../components/DashboardMetrics/TeacMetrics';
import { Route, Routes } from 'react-router-dom';
import KuderQuizPage from '../../pages/KuderQuizPage';
import KuderResultsPage from '../../pages/KuderResultsPage';
import { getUserEmail } from '../../utils/getUserEmail';
import { getKuderResultsByUser } from '../../utils/getKuderResultsByUser';
import './Dashboard.css';

interface DashboardProps {
  children?: React.ReactNode;
}

const Dashboard: React.FC<DashboardProps> = ({ children }) => {
  const [email, setEmail] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<string>('home');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'analytics':
        return <DashboardMetrics />;
      case 'teacanalytics':
        return <TeacMetrics />;
      case 'settings':
        return <SettingsPage />;
      case 'about':
        return <AboutPage />;
      case 'join':
        return <JoinUsPage />;
      case 'search':
        return <SearchResultsPage />;
      case 'userManagement':
        return <UserManagementPage />;
      case 'roleManagement': // Nueva opción para administrar roles
        return <RoleManagementPage />;
      case 'learningStyleFelderSilverman':
        return <LearningStyleFelderSilvermanForm />;
      case 'kuderQuizPage':
        return <KuderQuizPage />;
      case 'kuderResultsPage':
        return <KuderResultsPage />;
      default:
        return <HomePage />;
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const userEmail = await getUserEmail(token);
          setEmail(userEmail);
        }
      } catch (error) {
        console.error('Error fetching user email:', error);
      }
    };

    fetchUserEmail();
  }, []);

  useEffect(() => {
    const fetchKuderResults = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const results = await getKuderResultsByUser(token);
          // Procesa los resultados según sea necesario
        }
      } catch (error) {
        console.error('Error fetching Kuder results:', error);
      }
    };

    fetchKuderResults();
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
      <CssBaseline />
      <Navbar handleDrawerToggle={handleDrawerToggle} />
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} onPageChange={setCurrentPage} />
        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 2, transition: 'transform 0.3s ease-in-out', bgcolor: 'background.paper' }}>
          <Fade in={true} timeout={500}>
            <div>
              {renderPage()} {/* Renderizamos la página actual */}
              {children} {/* Opcional: se pueden agregar contenidos hijos aquí */}
            </div>
          </Fade>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Dashboard;





















