import { Link } from 'react-router-dom';
import { toggleWishlist, selectWishlistItems } from '../store/wishlistSlice';
import { useDispatch, useSelector } from 'react-redux';


export default function CardList(movie) {
    movie = movie.movie;

    const wishlistItems = useSelector(selectWishlistItems);
    const dispatch = useDispatch();
  
    
    const handleToggleWishlist = (movie) => {
      dispatch(toggleWishlist(movie));
    };
  
    const isInWishlist = (movieId) => {
      return wishlistItems.some((item) => item.id === movieId);
    };
  return (
    <div key={movie.id} className="col-lg-2 col-md-4 col-sm-6 mb-4">
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`}>
        <div className="poster-wrapper">
          {movie.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              className="card-img-top"
              alt={movie.title}
            />
          ) : (
            <div className="poster-placeholder">No Image Available</div>
          )}
          <span className="rating-badge">{movie.vote_average}</span>
        </div>
      </Link>
      <div className="card-body p-0 mt-2">
        <h5 className="card-title">{movie.title}</h5>
        <div className="d-flex justify-content-between align-items-center">
          <p className="release-date mb-0">
            {movie.release_date ? (
              new Date(movie.release_date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })
            ) : (
              'Date not available'
            )}
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
}
