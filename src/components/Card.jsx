import { Link } from 'react-router-dom';


export default function CardList(movie) {
    movie = movie.movie;
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
          <span className="heart-icon">🤍</span>
        </div>
      </div>
    </div>
  </div>
);
}
