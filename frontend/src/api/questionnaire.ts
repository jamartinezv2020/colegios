import axios from 'axios';

// Función para obtener el cuestionario
export const getQuestionnaire = async (token: string) => {
  try {
    const response = await axios.get('http://localhost:3000/api/questionnaire', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching questionnaire:', error);
    throw error;
  }
};

// Función para enviar las respuestas del cuestionario
export const submitQuestionnaireResponses = async (responses: string[], token: string) => {
  try {
    const response = await axios.post('http://localhost:3000/api/questionnaire/submit', { responses }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error submitting questionnaire responses:', error);
    throw error;
  }
};
