import { Request, Response } from 'express';
import User from '../models/User';
import { classifyLearningStyle } from '../utils/learningStyleClassifier';

// Cuestionario de ejemplo (puedes reemplazar esto con tus preguntas reales)
const questionnaire = [
  "Entiendo mejor algo si lo practico.",
  "Me considero realista.",
  "Cuando pienso acerca de lo que hice ayer, es más probable que lo haga sobre la base de una imagen.",
  // Agrega todas las preguntas aquí...
];

// Controlador para obtener el cuestionario
export const getQuestionnaire = (req: Request, res: Response) => {
  res.status(200).json(questionnaire);
};

// Controlador para enviar las respuestas del cuestionario
export const submitQuestionnaireResponses = async (req: Request, res: Response) => {
  try {
    const { responses } = req.body;
    const userId = (req as any).user.userId; // Asumiendo que el id del usuario autenticado está en req.user

    const learningStyle = classifyLearningStyle(responses);

    const user = await User.findByIdAndUpdate(
      userId,
      { learningStyle },
      { new: true, runValidators: true }
    );

    if (!user) {
      res.status(404).json({ message: 'Usuario no encontrado' });
    } else {
      res.status(200).json({ message: 'Estilo de aprendizaje actualizado', learningStyle });
    }
  } catch (error: any) {
    res.status(500).json({ message: 'Error del servidor', error: error.message });
  }
};

