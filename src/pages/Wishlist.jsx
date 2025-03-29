import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleWishlist, selectWishlistItems } from '../store/wishlistSlice';

const Wishlist = () => {
  const wishlistItems = useSelector(selectWishlistItems);
  const dispatch = useDispatch();

  return (
    <div className="container mt-5">
      <div className="main-content">
      <h1 className="mb-4">Watchlist</h1>
      
      {wishlistItems.length === 0 ? (
        <div className="empty-wishlist text-center py-5">
          <p className="fs-4">No movies in your watchlist</p>
        </div>
      ) : (
        <div className="row">
          {wishlistItems.map((movie) => {
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
                        onError={(e) => {
                          e.target.src = '/path-to-fallback-image.jpg';
                        }}
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
                      <span
                        className="heart-icon filled"
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(toggleWishlist(movie));
                        }}
                        style={{ cursor: 'pointer', color: 'red' }}
                      >
                        ❤️
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      </div>
    </div>
  );
};

export default Wishlist;