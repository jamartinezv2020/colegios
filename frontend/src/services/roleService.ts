// src/services/roleService.ts

import axios from 'axios';
import { IRole } from '../models/Role';

const API_URL = 'http://localhost:3000/api/roles';

export const getRoles = async (): Promise<IRole[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getRoleById = async (id: string): Promise<IRole> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createRole = async (role: IRole): Promise<IRole> => {
  const response = await axios.post(API_URL, role);
  return response.data;
};

export const updateRole = async (id: string, role: IRole): Promise<IRole> => {
  const response = await axios.put(`${API_URL}/${id}`, role);
  return response.data;
};

export const deleteRole = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
