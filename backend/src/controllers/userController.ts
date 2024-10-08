// src/controllers/userController.ts (Backend)
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import Student from '../models/Student';
import { classifyLearningStyle } from '../utils/learningStyleClassifier';


export const getUserEmailHandler = (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; // Obtener el token del header Authorization
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || '') as { email: string };
        const email = decodedToken.email;

        return res.json({ email });
    } catch (error) {
        console.error('Error in getUserEmailHandler:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};


// Controlador para registrar un nuevo usuario
export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error('Error registrando usuario:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// Controlador para iniciar sesión de usuario
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    res.status(200).json({ message: 'Inicio de sesión exitoso', token });
  } catch (error) {
    console.error('Error iniciando sesión de usuario:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// Controlador para actualizar el estilo de aprendizaje de un estudiante
export const updateStudentLearningStyle = async (req: Request, res: Response) => {
  try {
    const { responses, studentId } = req.body;
    if (!studentId) {
      return res.status(400).json({ message: 'Falta el ID del estudiante' });
    }

    const learningStyle = classifyLearningStyle(responses);

    const student = await Student.findByIdAndUpdate(
      studentId,
      { learningStyle },
      { new: true, runValidators: true }
    );

    if (!student) {
      res.status(404).json({ message: 'Estudiante no encontrado' });
    } else {
      res.status(200).json(student);
    }
  } catch (error: any) {
    console.error('Error actualizando estilo de aprendizaje:', error);
    res.status(500).json({ message: 'Error del servidor', error: error.message });
  }
};

// Otros métodos CRUD para usuarios (ejemplo)
// Controlador para obtener todos los usuarios
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    console.error('Error obteniendo usuarios:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// Controlador para obtener un usuario por ID
export const getUserById = async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error obteniendo usuario por ID:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// Controlador para actualizar los datos de un usuario
export const updateUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const { username, email } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId, 
      { username, email }, 
      { new: true }
    ).select('-password');
    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error actualizando usuario:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// Controlador para eliminar un usuario
export const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    console.error('Error eliminando usuario:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// Controlador para obtener el perfil del usuario autenticado
export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;

    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error obteniendo perfil de usuario:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};