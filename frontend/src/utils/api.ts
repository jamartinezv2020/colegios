// File: src/frontend/utils/api.ts (Frontend)

import axios from 'axios';

export const getKuderResultsByUser = async (token: string) => {
    try {
        const response = await axios.get('/api/kuder/results', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch Kuder results:', error);
        throw error;
    }
};


export const fetchUserEmail = async (token: string) => {
    try {
        const response = await axios.get('/api/auth/user/email', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.email;
    } catch (error) {
        console.error('Failed to fetch user email:', error);
        throw error;
    }
};
