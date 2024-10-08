// Ubicación: src/services/kuderService.ts

import axios from 'axios';

const API_URL = 'http://localhost:5000/api/kuder';

export const saveKuderResult = async (userId: string, scores: { [key: string]: number }) => {
  return await axios.post(`${API_URL}/save`, { userId, scores });
};

export const getKuderResultsByUser = async (userId: string) => {
  return await axios.get(`${API_URL}/results/${userId}`);
};
