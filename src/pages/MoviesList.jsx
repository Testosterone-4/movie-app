import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { setMovies } from '../store/moviesSlice';
import { toggleWishlist, selectWishlistItems } from '../store/wishlistSlice';
import { useMovieSearch } from '../store/useMovieSearch';

function MoviesList() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.list);
  const wishlistItems = useSelector(selectWishlistItems);
  const { searchResults, searchLoading, handleSearch } = useMovieSearch();

  // Debounce function for search
  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  };

  // Fetch movies if not searching
  useEffect(() => {
    if (!isSearchActive) {
      api.get(`/movie/now_playing?page=${page}`).then((response) => {
        dispatch(setMovies(response.data.results));
      });
    }
  }, [page, isSearchActive, dispatch]);

  // Update movies when search results change
  useEffect(() => {
    if (isSearchActive && searchResults) {
      dispatch(setMovies(searchResults));
    }
  }, [searchResults, isSearchActive, dispatch]);

  // Debounced search handler
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
    setSearchQuery('');
    setIsSearchActive(false);
  };

  // Toggle wishlist
  const handleToggleWishlist = (movie) => {
    dispatch(toggleWishlist(movie));
  };

  // Check if a movie is in the wishlist
  const isInWishlist = (movieId) => {
    return wishlistItems.some((item) => item.id === movieId);
  };

  if (searchLoading) {
    return <div className="text-center py-5">Searching...</div>;
  }

  return (
    <div className="movies-list mt-5 pt-5">
      <div className="container">
        {/* Search Bar */}
        <div className="mb-4">
          <div className="search-form d-flex justify-content-center">
            <input
              type="text"
              className="form-control search-input"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {isSearchActive && (
              <button
                type="button"
                className="btn btn-outline-secondary ms-2"
                onClick={handleClearSearch}
              >
                Clear
              </button>
            )}
          </div>
          {isSearchActive && (
            <p className="text-center mt-2">
              Showing results for: <strong>"{searchQuery}"</strong>
            </p>
          )}
        </div>

        {/* Movies Section */}
        <h2 className="section-title">
          {isSearchActive ? 'Search Results' : 'Now Playing Movies'}
        </h2>
        <div className="row">
          {movies && movies.length > 0 ? (
            movies.map((movie) => {
              const rating = movie.vote_average ? Math.round(movie.vote_average * 10) : 'N/A';
              return (
                <div key={movie.id} className="col-lg-2 col-md-4 col-sm-6 mb-4">
                  <div className="movie-card">
                    <Link to={`/movie/${movie.id}`}>
                      <div className="poster-wrapper">
                        <img
                          src={
                            movie.poster_path
                              ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                              : 'https://via.placeholder.com/200x300?text=No+Image'
                          }
                          className="card-img-top"
                          alt={movie.title || 'Movie'}
                        />
                        <span className="rating-badge">{rating}</span>
                      </div>
                    </Link>
                    <div className="card-body p-0 mt-2">
                      <h5 className="card-title">{movie.title || 'Untitled'}</h5>
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="release-date mb-0">
                          {movie.release_date
                            ? new Date(movie.release_date).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })
                            : 'Unknown Date'}
                        </p>
                        <i
                          className={`bi ${isInWishlist(movie.id) ? 'bi-heart-fill' : 'bi-heart'} heart-icon`}
                          onClick={(e) => {
                            e.preventDefault();
                            handleToggleWishlist(movie);
                          }}
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center">No movies found.</p>
          )}
        </div>

        {/* Pagination */}
        <nav aria-label="Page navigation" className="mt-4">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
              >
                «
              </button>
            </li>
            {[1, 2, 3, 4, 5].map((num) => (
              <li key={num} className={`page-item ${page === num ? 'active' : ''}`}>
                <button className="page-link" onClick={() => setPage(num)}>
                  {num}
                </button>
              </li>
            ))}
            <li className="page-item">
              <button className="page-link" onClick={() => setPage(page + 1)}>
                »
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default MoviesList;