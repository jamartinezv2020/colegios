import React, { useState } from 'react';
import {
  Button,
  Typography,
  Box,
  LinearProgress,
  Tooltip,
  Container,
} from '@mui/material';
import KuderQuestion from '../components/KuderQuestion';
import { saveKuderResult } from '../services/kuderService';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { questions } from '../components/Data/questionsKuder3';

const KuderQuizPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(''));

  const handleAnswerChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAnswers = [...answers];
    newAnswers[index] = e.target.value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    try {
      const userId = getUserId(); // Función para obtener el ID del usuario
      if (!userId) {
        toast.error('ID de usuario no encontrado.');
        return;
      }

      if (answers.includes('')) {
        toast.warning('Por favor, responda todas las preguntas antes de enviar.');
        return;
      }

      const scores = questions.reduce((acc, question, index) => {
        const answer = answers[index];
        const score = isNaN(parseInt(answer, 10)) ? 0 : parseInt(answer, 10);
        acc[question.question] = score;
        return acc;
      }, {} as { [key: string]: number });

      await saveKuderResult(userId, scores);
      toast.success('Resultados guardados correctamente');
      navigate('/kuder-results');
    } catch (error) {
      toast.error('Hubo un error al guardar los resultados');
    }
  };

  const handleNext = () => {
    if (currentPage < Math.ceil(questions.length / 3) - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleBack = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = currentPage * 3;
  const endIndex = Math.min(startIndex + 3, questions.length);
  const currentQuestions = questions.slice(startIndex, endIndex);

  const progressValue = ((currentPage + 1) / Math.ceil(questions.length / 3)) * 100;

  return (
    <Container maxWidth="md">
      <Box sx={{ p: 2 }}>
        <Typography variant="h4" gutterBottom align="left">
          Cuestionario de Kuder
        </Typography>

        <LinearProgress variant="determinate" value={progressValue} sx={{ mb: 2 }} />
        <Typography variant="body2" align="left">
          Preguntas {startIndex + 1} - {endIndex} de {questions.length} preguntas
        </Typography>

        <Box sx={{ mb: 2, p: 2, border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
          <Typography variant="body2" align="left">
            Por favor, lee cuidadosamente cada pregunta y selecciona la opción que mejor te represente. Asegúrate de responder todas las preguntas antes de enviar el formulario.
          </Typography>
        </Box>

        {currentQuestions.map((q, index) => (
          <Box key={startIndex + index} sx={{ mb: 3 }}>
            <Typography variant="body1" align="left" sx={{ fontWeight: 'bold' }}>
              Pregunta {startIndex + index + 1}:
            </Typography>
            <KuderQuestion
              question={q.question}
              options={q.options}
              selectedOption={answers[startIndex + index]}
              onChange={handleAnswerChange(startIndex + index)}
            />

            {/* Tooltip para ayuda específica de cada pregunta */}
            <Tooltip title={q.helpText} placement="top" arrow>
              <Typography variant="body2" align="left" sx={{ cursor: 'pointer', color: 'primary.main' }}>
                ¿Necesitas ayuda?
              </Typography>
            </Tooltip>
          </Box>
        ))}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button variant="outlined" onClick={handleBack} disabled={currentPage === 0}>
            Anterior
          </Button>
          {currentPage < Math.ceil(questions.length / 3) - 1 ? (
            <Button variant="contained" color="primary" onClick={handleNext}>
              Siguiente
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Enviar Respuestas
            </Button>
          )}
        </Box>
      </Box>
      <ToastContainer
        position="top-right"
        autoClose={6000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Container>
  );
};

const getUserId = (): string | null => {
  // Implementa la lógica para obtener el ID del usuario autenticado
  return 'id_del_usuario'; // Reemplazar con el valor real
};

export default KuderQuizPage;







