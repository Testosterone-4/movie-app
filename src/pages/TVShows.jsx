import { useEffect, useState, useCallback, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import api from "../services/api";
import { toggleWishlist, selectWishlistItems } from "../store/wishlistSlice";
import { useTVSearch } from "../store/useTVSearch";
import { ThemeContext } from "../context/ThemeContext";

function TVShows() {
  const { theme } = useContext(ThemeContext);
  const [tvShows, setTvShows] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const dispatch = useDispatch();
  const wishlistItems = useSelector(selectWishlistItems);
  const {
    searchResults: tvSearchResults,
    searchLoading: tvSearchLoading,
    handleSearch: handleTVSearch,
  } = useTVSearch();

  // Debounce function for search
  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  };

  // Fetch TV shows if not searching
  useEffect(() => {
    if (!isSearchActive) {
      api.get(`/tv/on_the_air?page=${page}`).then((response) => {
        setTvShows(response.data.results);
      });
    }
  }, [page, isSearchActive]);

  // Update TV shows when search results change
  useEffect(() => {
    if (isSearchActive && tvSearchResults) {
      setTvShows(tvSearchResults);
    }
  }, [tvSearchResults, isSearchActive]);

  // Debounced search handler
  const handleDynamicSearch = useCallback(
    debounce((query) => {
      if (query.trim()) {
        setIsSearchActive(true);
        handleTVSearch(query, page);
      } else {
        setIsSearchActive(false);
      }
    }, 300),
    [page, handleTVSearch]
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

  // Toggle wishlist
  const handleToggleWishlist = (show) => {
    dispatch(toggleWishlist(show));
  };

  // Check if a TV show is in the wishlist
  const isInWishlist = (showId) => {
    return wishlistItems.some((item) => item.id === showId);
  };

  if (tvSearchLoading) {
    return <div className="text-center py-5">Searching...</div>;
  }

  return (
    <div className="tv-shows mt-5 pt-5">
      <div className="container">
        {/* Search Bar */}
        <div className="mb-4">
          <div className="search-form d-flex justify-content-center">
            <input
              type="text"
              className="form-control search-input"
              placeholder="Search TV shows..."
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

        {/* TV Shows Section */}
        <h2 className="section-title">
          {isSearchActive ? "Search Results" : "On The Air TV Shows"}
        </h2>
        <div className="row">
          {tvShows && tvShows.length > 0 ? (
            tvShows.map((show) => {
              const rating = show.vote_average
                ? Math.round(show.vote_average * 10)
                : "N/A";
              return (
                <div key={show.id} className="col-lg-2 col-md-4 col-sm-6 mb-4">
                  <div className="movie-card">
                    <Link to={`/tv/${show.id}`}>
                      <div className="poster-wrapper">
                        <img
                          src={
                            show.poster_path
                              ? `https://image.tmdb.org/t/p/w500/${show.poster_path}`
                              : "https://via.placeholder.com/200x300?text=No+Image"
                          }
                          className="card-img-top"
                          alt={show.name || "TV Show"}
                        />
                        <span className="rating-badge">{rating}</span>
                      </div>
                    </Link>
                    <div className="card-body p-0 mt-2">
                      <h5 className="card-title">{show.name || "Untitled"}</h5>
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="release-date mb-0">
                          {show.first_air_date
                            ? new Date(show.first_air_date).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )
                            : "Unknown Date"}
                        </p>
                        <i
                          className={`bi ${
                            isInWishlist(show.id) ? "bi-heart-fill" : "bi-heart"
                          } heart-icon`}
                          onClick={(e) => {
                            e.preventDefault();
                            handleToggleWishlist(show);
                          }}
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center">No TV shows found.</p>
          )}
        </div>

        {/* Pagination */}
        <nav aria-label="Page navigation" className="mt-4">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
              <button
                className={`page-link ${
                  theme === "dark" ? "bg-dark text-light border-secondary" : ""
                }`}
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
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
                  className={`page-link ${
                    theme === "dark"
                      ? "bg-dark text-light border-secondary"
                      : ""
                  } ${page === num && theme === "dark" ? "active-dark" : ""}`}
                  onClick={() => setPage(num)}
                >
                  {num}
                </button>
              </li>
            ))}
            <li className="page-item">
              <button
                className={`page-link ${
                  theme === "dark" ? "bg-dark text-light border-secondary" : ""
                }`}
                onClick={() => setPage(page + 1)}
              >
                »
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default TVShows;
