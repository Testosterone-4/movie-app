import { useState } from 'react';
import api from '../services/api';

export const useTVSearch = () => {
  const [searchResults, setSearchResults] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);

  const handleSearch = async (query, page = 1) => {
    setSearchLoading(true);
    try {
      const response = await api.get('/search/tv', {
        params: {
          query,
          page,
        },
      });
      setSearchResults(response.data.results);
    } catch (error) {
      console.error('TV Search Error:', error);
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  };

  return { searchResults, searchLoading, handleSearch };
};