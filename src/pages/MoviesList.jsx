import { toggleWishlist, selectWishlistItems } from "../store/wishlistSlice";
import { useEffect, useState, useCallback, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import api from "../services/api";
import { setMovies } from "../store/moviesSlice";
import { useMovieSearch } from "../store/useMovieSearch";
import { ThemeContext } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";

function MoviesList() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.list);
  const wishlistItems = useSelector(selectWishlistItems);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const { searchResults, searchLoading, handleSearch } = useMovieSearch();
  const { theme } = useContext(ThemeContext);
  const { language } = useLanguage();

  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  };

  useEffect(() => {
    if (!isSearchActive) {
      api
        .get(`/movie/now_playing?page=${page}&language=${language}`)
        .then((response) => {
          dispatch(setMovies(response.data.results));
        });
    }
  }, [page, isSearchActive, dispatch, language]);

  useEffect(() => {
    if (isSearchActive && searchResults) {
      dispatch(setMovies(searchResults));
    }
  }, [searchResults, isSearchActive, dispatch]);

  const handleDynamicSearch = useCallback(
    debounce((query) => {
      if (query.trim()) {
        setIsSearchActive(true);
        handleSearch(query, page);
      } else {
        setIsSearchActive(false);
      }
    }, 300),
    [page, handleSearch]
  );

  // Handle search input changes
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    handleDynamicSearch(query);
  };

  // Clear search
  const handleClearSearch = () => {
    setSearchQuery("");
    setIsSearchActive(false);
  };

  if (searchLoading) {
    return <div className="text-center py-5">Searching...</div>;
  }

  const handleToggleWishlist = (movie) => {
    dispatch(toggleWishlist(movie));
  };

  const isInWishlist = (movieId) => {
    return wishlistItems.some((item) => item.id === movieId);
  };

  return (
    <div
      className="movies-list"
      style={{ direction: language === "ar" ? "rtl" : "ltr" }}
    >
      <div className="container mt-5">
        {/* Hero Section */}
        <div
          className="hero-section"
          style={{
            backgroundColor: theme === "dark" ? "#121212" : "#ffffff",
            color: theme === "dark" ? "#ffffff" : "#000000",
          }}
        >
          <div
            className="container mt-5"
            style={{
              backgroundColor: "var(--bg-color)",
              color: "var(--text-color)",
            }}
          >
            <h1 className="hero-title">
              Welcome to our Movie<span style={{ color: "blue" }}>Hub</span>
            </h1>
            <p className="hero-subtitle">
              Millions of movies, TV shows and people to discover. Explore now.
            </p>
            <div className="search-form">
              <input
                type="text"
                className={`form-control search-input ${
                  theme === "dark" ? "search-input-dark" : "search-input-light"
                }`}
                placeholder="Search and explore..."
                value={searchQuery}
                onChange={handleSearchChange}
                style={{
                  backgroundColor: theme === "dark" ? "#333" : "#ffffff",
                  color: theme === "dark" ? "#ffffff" : "#000000",
                }}
              />
            </div>
            {isSearchActive && (
              <p className="text-center mt-2">
                Showing results for: <strong>"{searchQuery}"</strong>
              </p>
            )}
          </div>
        </div>

        {/* Movies Section */}
        <h2 className="section-title">Now Playing</h2>
        <div className="row">
          {movies.map((movie) => {
            const rating = Math.round(movie.vote_average * 10);
            return (
              <div key={movie.id} className="col-lg-2 col-md-4 col-sm-6 mb-4">
                <div className="movie-card">
                  <Link to={`/movie/${movie.id}`}>
                    <div className="poster-wrapper">
                      <img
                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                        className="card-img-top"
                        alt={movie.title}
                      />
                      <span className="rating-badge">{rating}</span>
                    </div>
                  </Link>
                  <div
                    className="card-body p-0 mt-2"
                    style={{
                      backgroundColor: theme === "dark" ? "#1e1e1e" : "#ffffff",
                      color: theme === "dark" ? "#ffffff" : "#000000",
                    }}
                  >
                    <h5 className="card-title text-truncate">{movie.title}</h5>
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="release-date mb-0">
                        {new Date(movie.release_date).toLocaleDateString()}
                      </p>
                      <span
                        className={`heart-icon ${
                          isInWishlist(movie.id) ? "filled" : ""
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleToggleWishlist(movie);
                        }}
                      >
                        {isInWishlist(movie.id) ? "❤️" : "🤍"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination (unchanged) */}
        <nav aria-label="Page navigation" className="mt-4">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                style={{
                  color: theme === "dark" ? "#ffffff" : "#000000", // Adjust button text color based on theme
                  backgroundColor: theme === "dark" ? "#333" : "#ffffff", // Adjust background color
                }}
              >
                «
              </button>
            </li>
            {[1, 2, 3, 4, 5].map((num) => (
              <li
                key={num}
                className={`page-item ${page === num ? "active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => setPage(num)}
                  style={{
                    color:
                      page === num
                        ? theme === "dark"
                          ? "#007bff"
                          : "#007bff"
                        : theme === "dark"
                        ? "#ffffff"
                        : "#000000", // Active page color
                    backgroundColor:
                      page === num
                        ? theme === "dark"
                          ? "#444"
                          : "#e9ecef"
                        : theme === "dark"
                        ? "#333"
                        : "#ffffff", // Active page background
                  }}
                >
                  {num}
                </button>
              </li>
            ))}
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => setPage(page + 1)}
                style={{
                  color: theme === "dark" ? "#ffffff" : "#000000", // Adjust button text color
                  backgroundColor: theme === "dark" ? "#333" : "#ffffff", // Adjust background color
                }}
              >
                »
              </button>
            </li>
          </ul>
        </nav>
        {/* ... */}
      </div>
    </div>
  );
}

export default MoviesList;
