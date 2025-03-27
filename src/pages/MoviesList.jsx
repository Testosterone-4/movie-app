import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { setMovies } from '../store/moviesSlice';

function MoviesList() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.list);

  useEffect(() => {
    api.get(`/movie/now_playing?page=${page}`).then((response) => {
      dispatch(setMovies(response.data.results));
    });
  }, [page]);

  return (
    <div className="movies-list">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="container">
          <h1 className="hero-title">Welcome to our movie app</h1>
          <p className="hero-subtitle">
            Millions of movies, TV shows and people to discover. Explore now.
          </p>
          <form className="search-form">
            <input
              type="text"
              className="form-control search-input"
              placeholder="Search and explore..."
            />
            <button type="submit" className="btn search-btn">
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Movies Section */}
      <div className="container mt-5">
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
                  <div className="card-body p-0 mt-2">
                    <h5 className="card-title">{movie.title}</h5>
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="release-date mb-0">
                        {new Date(movie.release_date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                      <span className="heart-icon">🤍</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
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