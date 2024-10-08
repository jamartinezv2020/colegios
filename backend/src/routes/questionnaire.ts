import express, { Request, Response } from 'express';
import LearningStyle from '../models/LearningStyle'; // Asegúrate de tener un modelo LearningStyle en esta ruta
import { getQuestionnaire, submitQuestionnaireResponses } from '../controllers/questionnaireController';
//import { authenticateToken } from '../middleware/authMiddleware';
import { authMiddleware, authenticateToken } from '../middleware/authMiddleware';


const router = express.Router();
// Ruta para obtener datos de estilos de aprendizaje
router.get('/learningStyles', async (req: Request, res: Response) => {
    try {
      // Aquí puedes implementar la lógica para obtener datos de estilos de aprendizaje
      // Ejemplo: Distribución de estilos de aprendizaje
      const styles = await LearningStyle.aggregate([
        {
          $group: {
            _id: "$style", // Agrupamos por estilo de aprendizaje
            count: { $sum: 1 } // Contamos el número de veces que aparece cada estilo
          }
        }
      ]);
  
      const stylesNames = styles.map((style: any) => style._id);
      const values = styles.map((style: any) => style.count);
  
      res.json({ styles: stylesNames, values });
    } catch (error) {
      console.error('Error al obtener datos de estilos de aprendizaje', error);
      res.status(500).json({ message: 'Error al obtener datos de estilos de aprendizaje' });
    }
  });
// Ruta para obtener el cuestionario
router.get('/', authenticateToken, getQuestionnaire);

// Ruta para enviar las respuestas del cuestionario
router.post('/submit', authenticateToken, submitQuestionnaireResponses);

export default router;

