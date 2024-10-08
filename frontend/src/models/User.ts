// src/models/User.ts

export interface User {
    _id: string; // Suponiendo que el ID es un string en el backend
    username: string;
    email: string;
    password: string; // Asegúrate de no enviar ni almacenar contraseñas en claro en el frontend
    createdAt: Date;
  }
  