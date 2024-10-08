import React, { useState } from 'react';
import axios from 'axios';
import { classifyLearningStyleFelderSilverman } from '../../utils/learningStyleClassifierFelderSilveraman';
import { questions } from './questions';

const LearningStyleForm: React.FC = () => {
  const [responses, setResponses] = useState<number[]>(Array(44).fill(0));
  const [learningStyle, setLearningStyle] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (index: number, value: number) => {
    const newResponses = [...responses];
    newResponses[index] = value;
    setResponses(newResponses);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const style = classifyLearningStyleFelderSilverman(responses);
      setLearningStyle(style);

      const { data } = await axios.post('/api/students/updateLearningStyle', { responses });
      console.log('Learning style updated:', data);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Test Felder y Silverman</h2>
      <p>Docencia de la formación para el empleo con, Benjamin Mallo</p>
      <p>León, 21-07-2024</p>
      <p>Sessión anónima (sus datos no serán guardados)</p>
      <form onSubmit={handleSubmit}>
        {questions.map((q, index) => (
          <div key={index}>
            <label>
              {index + 1}. {q.question}
              <div>
                {q.options.map((option, i) => (
                  <label key={i}>
                    <input
                      type="radio"
                      value={i}
                      checked={responses[index] === i}
                      onChange={() => handleChange(index, i)}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </label>
          </div>
        ))}
        <button type="submit">Enviar</button>
      </form>
      {error && <p>{error}</p>}
      {learningStyle.length > 0 && (
        <div>
          <h3>Tu Estilo de Aprendizaje</h3>
          <ul>
            {learningStyle.map((style, index) => (
              <li key={index}>{style}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LearningStyleForm;
