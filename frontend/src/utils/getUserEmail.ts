// src/utils/getUserEmail.ts (Frontend)

import axios from 'axios';

export const getUserEmail = async (token: string): Promise<string | null> => {
    try {
        const response = await axios.get('http://localhost:5000/api/user/email', {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        return response.data.email; // Asegúrate de que la respuesta tenga una propiedad `email`
    } catch (error) {
        console.error('Error fetching user email:', error);
        throw error; // Propagar el error para manejo posterior
    }
};




