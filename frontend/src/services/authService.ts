// src/services/authService.ts

interface UserCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  username?: string;
}
// Función para iniciar sesión
export const login = async (email: string, password: string): Promise<boolean> => {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    return response.ok;
  } catch (error) {
    console.error('Error logging in:', error);
    return false;
  }
};

export const register = async (email: string, password: string, extraData: Partial<RegisterData> = {}): Promise<boolean> => {
  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, ...extraData }),
    });
    return response.ok;
  } catch (error) {
    console.error('Error registering:', error);
    return false;
  }
};

// Función para recuperar la contraseña
export const recoverPassword = async (email: string): Promise<boolean> => {
  try {
    const response = await fetch('/api/auth/recover', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    return response.ok;
  } catch (error) {
    console.error('Error recovering password:', error);
    return false;
  }
};

// Función para cerrar sesión
export const logout = async (): Promise<void> => {
  try {
    await fetch('/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error logging out:', error);
  }
};

// Función para obtener el email del usuario autenticado (requiere autenticación)
export const getUserEmail = async (): Promise<string> => {
  try {
    const response = await fetch('/api/auth/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      const data = await response.json();
      return data.email;
    }
    throw new Error('Failed to fetch user email');
  } catch (error) {
    console.error('Error fetching user email:', error);
    throw error;
  }
};


