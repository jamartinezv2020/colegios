// src/utils/calculatePreferences.ts

import { questions } from '../components/Data/questionsKuder';

const categories = {
  ciencias: 0,
  artes: 0,
  tecnología: 0,
  humanidades: 0,
  negocios: 0,
  deportes: 0,
  salud: 0,
  servicios: 0,
  educación: 0,
};

// Definir un tipo para el índice
type CategoryMap = {
  [key: number]: keyof typeof categories; // Mapeo de índices a claves de categories
};

const questionCategoryMap: CategoryMap = {
  0: 'ciencias',
  1: 'tecnología',
  2: 'artes',
  3: 'humanidades',
  4: 'negocios',
  5: 'deportes',
  6: 'salud',
  7: 'servicios',
  8: 'educación',
  9: 'ciencias',
  10: 'tecnología',
  11: 'artes',
  12: 'humanidades',
  13: 'negocios',
  14: 'deportes',
  15: 'salud',
  16: 'servicios',
  17: 'educación',
  18: 'ciencias',
  19: 'tecnología',
  20: 'artes',
  21: 'humanidades',
  22: 'negocios',
  23: 'deportes',
  24: 'salud',
  25: 'servicios',
  26: 'educación',
  27: 'ciencias',
  28: 'tecnología',
  29: 'artes',
  30: 'humanidades',
  31: 'negocios',
  32: 'deportes',
  33: 'salud',
  34: 'servicios',
  35: 'educación',
  36: 'ciencias',
  37: 'tecnología',
  38: 'artes',
  39: 'humanidades',
  40: 'negocios',
  41: 'deportes',
  42: 'salud',
  43: 'servicios',
  44: 'educación',
  45: 'ciencias',
  46: 'tecnología',
  47: 'artes',
  48: 'humanidades',
  49: 'negocios',
  50: 'deportes',
  51: 'salud',
  52: 'servicios',
  53: 'educación',
  54: 'ciencias',
  55: 'tecnología',
  56: 'artes',
  57: 'humanidades',
  58: 'negocios',
  59: 'deportes',
};

export function calculatePreferences(responses: number[]) {
  responses.forEach((response, index) => {
    const category = questionCategoryMap[index];
    if (category) {
      if (response === 4) {
        categories[category] += 4; // Totalmente de acuerdo
      } else if (response === 3) {
        categories[category] += 3; // De acuerdo
      } else if (response === 2) {
        categories[category] += 2; // Neutral
      } else if (response === 1) {
        categories[category] += 1; // En desacuerdo
      } // No se suma si es totalmente en desacuerdo (0)
    }
  });

  const sortedCategories = Object.entries(categories).sort((a, b) => b[1] - a[1]);
  return sortedCategories.map(([category, score]) => ({ category, score }));
}
/**
 * Calcula las preferencias de categorías en función de las respuestas proporcionadas.
 * @param responses - Arreglo con las respuestas del cuestionario de Kuder (valores entre 0 y 4).
 * @returns Un arreglo de objetos con categorías y sus respectivos puntajes, ordenado por puntaje.
 */
export function classifyKuder(responses: number[]): { category: string, score: number }[] {
  // Reiniciar el conteo de categorías para evitar acumulación en cálculos múltiples.
  const categoryScores = { ...categories };

  // Validar que el número de respuestas coincide con el número de preguntas
  if (responses.length !== Object.keys(questionCategoryMap).length) {
    throw new Error('El número de respuestas no coincide con el número de preguntas del cuestionario.');
  }

  // Recorrer todas las respuestas
  responses.forEach((response, index) => {
    // Obtener la categoría correspondiente a la pregunta actual
    const category = questionCategoryMap[index];

    // Validar que la respuesta esté en el rango esperado
    if (response < 0 || response > 4) {
      throw new Error(`La respuesta en el índice ${index} tiene un valor no válido: ${response}. Debe estar entre 0 y 4.`);
    }

    // Validar que la categoría exista en el mapeo
    if (!categoryScores.hasOwnProperty(category)) {
      throw new Error(`La categoría "${category}" no está definida en el mapa de categorías.`);
    }

    // Sumar el puntaje de la respuesta a la categoría correspondiente
    categoryScores[category] += response;
  });

  // Ordenar las categorías en función del puntaje obtenido, de mayor a menor
  const sortedCategories = Object.entries(categoryScores)
    .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)
    .map(([category, score]) => ({ category, score }));

  return sortedCategories;
}
