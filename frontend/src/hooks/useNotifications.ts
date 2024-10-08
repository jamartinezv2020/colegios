// src/hooks/useNotifications.ts

import { useState, useEffect } from 'react';
import axios from 'axios';

const useNotifications = (userEmail: string) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Obtener las notificaciones del usuario autenticado
    axios.get(`/api/notifications?email=${userEmail}`)
      .then(response => {
        setNotifications(response.data);
      })
      .catch(error => {
        console.error('Error fetching notifications:', error);
      });
  }, [userEmail]);

  return notifications;
};

export default useNotifications;
