import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { setMovies } from '../store/moviesSlice';
import { toggleWishlist, selectWishlistItems } from '../store/wishlistSlice';

function Home() {
  const [tvShows, setTvShows] = useState([]);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.list);
  const wishlistItems = useSelector(selectWishlistItems);

  // Fetch movies
  useEffect(() => {
    api
      .get('/movie/now_playing?page=1')
      .then((response) => {
        dispatch(setMovies(response.data.results.slice(0, 5))); // Limit to 5 movies
      })
      .catch((err) => {
        console.error('Movies Error:', err);
        setError('Failed to load movies. Please try again later.');
      });
  }, [dispatch]);

  // Fetch TV shows
  useEffect(() => {
    api
      .get('/tv/on_the_air?page=1')
      .then((response) => {
        setTvShows(response.data.results.slice(0, 5)); // Limit to 5 TV shows
      })
      .catch((err) => {
        console.error('TV Shows Error:', err);
        setError('Failed to load TV shows. Please try again later.');
      });
  }, []);

  // Toggle wishlist
  const handleToggleWishlist = (item) => {
    dispatch(toggleWishlist(item));
  };

  // Check if an item is in the wishlist
  const isInWishlist = (itemId) => {
    return wishlistItems.some((item) => item.id === itemId);
  };

  if (error) {
    return <div className="container mt-5 text-center text-danger">{error}</div>;
  }

  return (
    <div className="home-page mt-5 pt-5">
      {/* Movies Section */}
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="section-title">Now Playing Movies</h2>
          <Link to="/movies" className="btn btn-link">
            See All Movies
          </Link>
        </div>
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
            <p className="text-center">Loading movies...</p>
          )}
        </div>
      </div>

      {/* TV Shows Section */}
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="section-title">On The Air TV Shows</h2>
          <Link to="/tv-shows" className="btn btn-link">
            See All TV Shows
          </Link>
        </div>
        <div className="row">
          {tvShows && tvShows.length > 0 ? (
            tvShows.map((show) => {
              const rating = show.vote_average ? Math.round(show.vote_average * 10) : 'N/A';
              return (
                <div key={show.id} className="col-lg-2 col-md-4 col-sm-6 mb-4">
                  <div className="movie-card">
                    <Link to={`/tv/${show.id}`}>
                      <div className="poster-wrapper">
                        <img
                          src={
                            show.poster_path
                              ? `https://image.tmdb.org/t/p/w500/${show.poster_path}`
                              : 'https://via.placeholder.com/200x300?text=No+Image'
                          }
                          className="card-img-top"
                          alt={show.name || 'TV Show'}
                        />
                        <span className="rating-badge">{rating}</span>
                      </div>
                    </Link>
                    <div className="card-body p-0 mt-2">
                      <h5 className="card-title">{show.name || 'Untitled'}</h5>
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="release-date mb-0">
                          {show.first_air_date
                            ? new Date(show.first_air_date).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })
                            : 'Unknown Date'}
                        </p>
                        <i
                          className={`bi ${isInWishlist(show.id) ? 'bi-heart-fill' : 'bi-heart'} heart-icon`}
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
            <p className="text-center">Loading TV shows...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;