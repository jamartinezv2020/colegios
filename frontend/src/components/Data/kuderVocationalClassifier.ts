// kuderVocationalClassifier.ts

// Define las categorías vocacionales
type VocationalCategory = 
  'Mechanical' | 'Scientific' | 'Persuasive' | 'Artistic' | 
  'Literary' | 'Musical' | 'SocialService' | 'Clerical' | 'Outdoor';

// Función para clasificar las preferencias vocacionales de acuerdo a las respuestas de los alumnos
export const classifyVocationalPreferencesKuder = (responses: number[]): VocationalCategory[] => {
  if (responses.length !== 60) { // Se espera que el test tenga 60 ítems
    throw new Error("Invalid number of responses. Expected 60.");
  }

  // Inicializar contadores para cada categoría vocacional
  const categories: Record<VocationalCategory, number> = {
    'Mechanical': 0,
    'Scientific': 0,
    'Persuasive': 0,
    'Artistic': 0,
    'Literary': 0,
    'Musical': 0,
    'SocialService': 0,
    'Clerical': 0,
    'Outdoor': 0
  };

  // Definir la correspondencia de cada ítem a una categoría
  const itemCategoryMapping: VocationalCategory[] = [
    'Mechanical', 'Scientific', 'Persuasive', 'Artistic', 'Literary', 'Musical',
    'SocialService', 'Clerical', 'Outdoor', 'Mechanical', 'Scientific', 'Persuasive',
    'Artistic', 'Literary', 'Musical', 'SocialService', 'Clerical', 'Outdoor',
    'Mechanical', 'Scientific', 'Persuasive', 'Artistic', 'Literary', 'Musical',
    'SocialService', 'Clerical', 'Outdoor', 'Mechanical', 'Scientific', 'Persuasive',
    'Artistic', 'Literary', 'Musical', 'SocialService', 'Clerical', 'Outdoor',
    'Mechanical', 'Scientific', 'Persuasive', 'Artistic', 'Literary', 'Musical',
    'SocialService', 'Clerical', 'Outdoor', 'Mechanical', 'Scientific', 'Persuasive',
    'Artistic', 'Literary', 'Musical', 'SocialService', 'Clerical', 'Outdoor',
    'Mechanical', 'Scientific', 'Persuasive', 'Artistic'
  ];

  // Contabilizar las respuestas por categoría
  for (let i = 0; i < responses.length; i++) {
    const response = responses[i];
    if (response === 1) { // Asumimos que '1' representa una preferencia por el ítem
      const category = itemCategoryMapping[i];
      categories[category]++;
    }
  }

  // Encontrar las categorías con mayor preferencia
  const preferredCategories = Object.keys(categories).filter(key => {
    return categories[key as VocationalCategory] === Math.max(...Object.values(categories));
  }) as VocationalCategory[];

  return preferredCategories;
};

// Ejemplo de uso
const responses = [
  1, 0, 1, 1, 0, 1, 0, 1, 0,  // Primera serie de respuestas
  1, 0, 1, 0, 1, 0, 1, 0, 1,  // Segunda serie de respuestas
  1, 0, 1, 1, 0, 1, 0, 1, 0,  // Tercera serie de respuestas
  1, 0, 1, 0, 1, 0, 1, 0, 1,  // Cuarta serie de respuestas
  1, 0, 1, 1, 0, 1, 0, 1, 0,  // Quinta serie de respuestas
  1, 0, 1, 0, 1, 0, 1, 0, 1,  // Sexta serie de respuestas
];

const result = classifyVocationalPreferencesKuder(responses);
console.log('Preferred Vocational Categories:', result);
