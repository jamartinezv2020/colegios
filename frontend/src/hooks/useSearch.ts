// src/hooks/useSearch.ts

import { useState, useEffect } from 'react'; // Asegúrate de importar useEffect
import axios from 'axios';

const useSearch = (query: string) => {
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    if (query) {
      axios.get(`/api/search?query=${query}`)
        .then(response => {
          setResults(response.data);
        })
        .catch(error => {
          console.error('Error fetching search results:', error);
        });
    }
  }, [query]);

  return results;
};

export default useSearch;

