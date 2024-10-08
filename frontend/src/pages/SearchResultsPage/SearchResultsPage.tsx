// src/pages/SearchResultsPage.tsx

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchResult, search } from '../../services/searchService';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Box,
  Paper,
  CircularProgress,
  TextField,
  Collapse,
  InputAdornment,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchResultsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(true);
  const [searchQuery, setSearchQuery] = useState(query);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const searchResults = await search(query);
        setResults(searchResults);
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  const handleToggle = () => {
    setShowResults(!showResults);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery.trim() });
    }
  };

  return (
    <Container maxWidth="md">
      <Box mt={5} mb={3} display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">
          Resultados de búsqueda para "{query}"
        </Typography>
        <TextField
          variant="outlined"
          placeholder="Buscar..."
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
          sx={{ minWidth: 300 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSearchSubmit} edge="end">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleToggle}
        sx={{ mt: 2, mb: 3 }}
      >
        {showResults ? 'Ocultar Resultados' : 'Mostrar Resultados'}
      </Button>
      <Collapse in={showResults}>
        <Paper elevation={3} sx={{ p: 3 }}>
          {loading ? (
            <Box display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          ) : (
            <List>
              {results.map((result) => (
                <ListItem key={result._id}>
                  <ListItemText primary={result.title} secondary={result.description} />
                </ListItem>
              ))}
            </List>
          )}
        </Paper>
      </Collapse>
    </Container>
  );
};

export default SearchResultsPage;
