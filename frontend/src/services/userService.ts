// src/services/userService.ts
import axios from 'axios';

interface UserProfile {
    username: string;
    email: string;
    password?: string;
    extraData?: object;
  }
  
  // Función para actualizar el perfil del usuario
  export const updateUserProfile = async (profileData: UserProfile): Promise<boolean> => {
    try {
      const response = await fetch('/api/users/updateProfile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });
      return response.ok;
    } catch (error) {
      console.error('Error updating user profile:', error);
      return false;
    }
  };
  
  // Función para obtener el perfil del usuario por ID
  export const getUserProfile = async (userId: string): Promise<UserProfile> => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      }
      throw new Error('Failed to fetch user profile');
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  };
  
  // Función para eliminar un usuario por ID
  export const deleteUser = async (userId: string): Promise<boolean> => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.ok;
    } catch (error) {
      console.error('Error deleting user:', error);
      return false;
    }
  };
  
  // Función para listar todos los usuarios
  export const listUsers = async (): Promise<UserProfile[]> => {
    try {
      const response = await fetch('/api/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      }
      throw new Error('Failed to fetch users');
    } catch (error) {
      console.error('Error listing users:', error);
      throw error;
    }
  };
  // Función para obtener el correo electrónico del usuario
export const getUserEmail = async (): Promise<string> => {
  try {
    const response = await axios.get('http://localhost:5000/api/users/email');
    return response.data.email;
  } catch (error) {
    console.error('Error fetching user email:', error);
    throw error;
  }
};
  