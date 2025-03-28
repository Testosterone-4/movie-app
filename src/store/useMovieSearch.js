import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setMovies } from "./moviesSlice";
import { searchMovies, getNowPlayingMovies } from "../services/searchService";

export const useMovieSearch = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const fetchMovies = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = isSearching
        ? await searchMovies(searchQuery, page)
        : await getNowPlayingMovies(page);
      dispatch(setMovies(data.results));
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [page, searchQuery, isSearching]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setIsSearching(query.trim() !== "");
    setPage(1);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setIsSearching(false);
    setPage(1);
  };

  return {
    page,
    setPage,
    searchQuery,
    isSearching,
    isLoading,
    error,
    handleSearch,
    clearSearch,
  };
};
