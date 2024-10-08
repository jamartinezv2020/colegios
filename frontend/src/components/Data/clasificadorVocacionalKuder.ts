// clasificadorVocacionalKuder.ts

// Definir las categorías vocacionales
type CategoriaVocacional = 
  'Mecánica' | 'Científica' | 'Persuasiva' | 'Artística' | 
  'Literaria' | 'Musical' | 'ServicioSocial' | 'Administrativa' | 'AireLibre';

// Función para clasificar las preferencias vocacionales de acuerdo a las respuestas de los alumnos
export const clasificarPreferenciasVocacionalesKuder = (respuestas: number[]): CategoriaVocacional[] => {
  if (respuestas.length !== 60) { // Se espera que el test tenga 60 ítems
    throw new Error("Número de respuestas no válido. Se esperaban 60.");
  }

  // Inicializar contadores para cada categoría vocacional
  const categorias: Record<CategoriaVocacional, number> = {
    'Mecánica': 0,
    'Científica': 0,
    'Persuasiva': 0,
    'Artística': 0,
    'Literaria': 0,
    'Musical': 0,
    'ServicioSocial': 0,
    'Administrativa': 0,
    'AireLibre': 0
  };

  // Definir la correspondencia de cada ítem a una categoría
  const mapeoItemsCategoria: CategoriaVocacional[] = [
    'Mecánica', 'Científica', 'Persuasiva', 'Artística', 'Literaria', 'Musical',
    'ServicioSocial', 'Administrativa', 'AireLibre', 'Mecánica', 'Científica', 'Persuasiva',
    'Artística', 'Literaria', 'Musical', 'ServicioSocial', 'Administrativa', 'AireLibre',
    'Mecánica', 'Científica', 'Persuasiva', 'Artística', 'Literaria', 'Musical',
    'ServicioSocial', 'Administrativa', 'AireLibre', 'Mecánica', 'Científica', 'Persuasiva',
    'Artística', 'Literaria', 'Musical', 'ServicioSocial', 'Administrativa', 'AireLibre',
    'Mecánica', 'Científica', 'Persuasiva', 'Artística', 'Literaria', 'Musical',
    'ServicioSocial', 'Administrativa', 'AireLibre', 'Mecánica', 'Científica', 'Persuasiva',
    'Artística', 'Literaria', 'Musical', 'ServicioSocial', 'Administrativa', 'AireLibre',
    'Mecánica', 'Científica', 'Persuasiva', 'Artística'
  ];

  // Contabilizar las respuestas por categoría
  for (let i = 0; i < respuestas.length; i++) {
    const respuesta = respuestas[i];
    if (respuesta === 1) { // Asumimos que '1' representa una preferencia por el ítem
      const categoria = mapeoItemsCategoria[i];
      categorias[categoria]++;
    }
  }

  // Encontrar las categorías con mayor preferencia
  const categoriasPreferidas = Object.keys(categorias).filter(key => {
    return categorias[key as CategoriaVocacional] === Math.max(...Object.values(categorias));
  }) as CategoriaVocacional[];

  return categoriasPreferidas;
};

// Ejemplo de uso
const respuestas = [
  1, 0, 1, 1, 0, 1, 0, 1, 0,  // Primera serie de respuestas
  1, 0, 1, 0, 1, 0, 1, 0, 1,  // Segunda serie de respuestas
  1, 0, 1, 1, 0, 1, 0, 1, 0,  // Tercera serie de respuestas
  1, 0, 1, 0, 1, 0, 1, 0, 1,  // Cuarta serie de respuestas
  1, 0, 1, 1, 0, 1, 0, 1, 0,  // Quinta serie de respuestas
  1, 0, 1, 0, 1, 0, 1, 0, 1,  // Sexta serie de respuestas
];

const resultado = clasificarPreferenciasVocacionalesKuder(respuestas);
console.log('Categorías Vocacionales Preferidas:', resultado);
