// src/models/Role.ts

// Definir la interfaz IRole con las propiedades actualizadas
export interface IRole {
  _id: string;
  nombreRol: string;
  estadoRol: number;
}

// Implementar la clase Role que sigue la estructura de la interfaz IRole
export class Role implements IRole {
  constructor(
    public _id: string,
    public nombreRol: string,
    public estadoRol: number
  ) {}
}

  