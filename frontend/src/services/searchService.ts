// src/services/searchService.ts
export interface SearchResult {
  _id: string; // Asegúrate de que el campo sea '_id' y no 'id'
  title: string;
  description: string;
}

export const search = async (query: string): Promise<SearchResult[]> => {
  const response = await fetch(`http://localhost:5000/api/search?q=${query}`);
  if (!response.ok) {
    throw new Error('Error en la búsqueda');
  }
  const data: SearchResult[] = await response.json();
  return data;
};
