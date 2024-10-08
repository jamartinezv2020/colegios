import React, { useState, useEffect } from 'react';
import { getQuestionnaire, submitQuestionnaireResponses } from '../api/questionnaire';

const QuestionnaireComponent: React.FC = () => {
  const [questions, setQuestions] = useState<string[]>([]);
  const [responses, setResponses] = useState<string[]>([]);
  const [token, setToken] = useState<string>(''); // Debes obtener y almacenar el token de autenticación

  useEffect(() => {
    const fetchQuestionnaire = async () => {
      try {
        const token = 'your-auth-token'; // Reemplaza con el método para obtener tu token de autenticación
        setToken(token);
        const questions = await getQuestionnaire(token);
        setQuestions(questions);
      } catch (error) {
        console.error('Error fetching questionnaire:', error);
      }
    };

    fetchQuestionnaire();
  }, []);

  const handleSubmit = async () => {
    try {
      const result = await submitQuestionnaireResponses(responses, token);
      console.log('Questionnaire submitted successfully:', result);
    } catch (error) {
      console.error('Error submitting questionnaire:', error);
    }
  };

  return (
    <div>
      <h1>Questionnaire</h1>
      {questions.map((question, index) => (
        <div key={index}>
          <p>{question}</p>
          <input
            type="text"
            value={responses[index] || ''}
            onChange={(e) => {
              const newResponses = [...responses];
              newResponses[index] = e.target.value;
              setResponses(newResponses);
            }}
          />
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default QuestionnaireComponent;
