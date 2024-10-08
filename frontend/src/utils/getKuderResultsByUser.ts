// src/utils/getKuderResultsByUser.ts (Frontend)

import axios from 'axios';

export const getKuderResultsByUser = async (token: string): Promise<any> => {
    try {
        const response = await axios.get('http://localhost:5000/api/kuder/results', {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching Kuder results:', error);
        throw error;
    }
};

