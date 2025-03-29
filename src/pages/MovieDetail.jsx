import { Container, Row, Col, Card, Badge, Alert } from 'react-bootstrap';
import { useEffect, useState,useContext } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import Loader from '../components/Loader';
import CardList from '../components/Card';
import Reviews from '../components/Reviews';
import { toggleWishlist, selectWishlistItems } from '../store/wishlistSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeContext } from "../context/ThemeContext";

const MovieDetail = () => {
  const [movie, setMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [showReviews, setShowReviews] = useState(false);
  const wishlistItems = useSelector(selectWishlistItems);
  const dispatch = useDispatch();
  const { theme } = useContext(ThemeContext);

  const toggleReviews = () => {
    setShowReviews(!showReviews);
  };

  // Toggle wishlist
  const handleToggleWishlist = (movie) => {
    dispatch(toggleWishlist(movie));
  };

  // Check if a movie is in the wishlist
  const isInWishlist = (movieId) => {
    return wishlistItems.some((item) => item.id === movieId);
  };
  const [loading, setLoading] = useState({
    movie: true,
    recommendations: true
  });
  const [error, setError] = useState({
    movie: null,
    recommendations: null
  });
  
  const params = useParams();

  
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(prev => ({ ...prev, movie: true }));
        const response = await api.get(`/movie/${params.id}`);
        setMovie(response.data);
      } catch (err) {
        console.error('Failed to fetch movie details:', err);
        setError(prev => ({ ...prev, movie: 'Failed to load movie details' }));
      } finally {
        setLoading(prev => ({ ...prev, movie: false }));
      }
    };

    fetchMovieDetails();
  }, [params.id]);

  // Fetch recommendations
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(prev => ({ ...prev, recommendations: true }));
        const response = await api.get(`/movie/${params.id}/recommendations`);
        setRecommendations(response.data.results || []);
      } catch (err) {
        console.error('Failed to fetch recommendations:', err);
        setError(prev => ({ ...prev, recommendations: 'Failed to load recommendations' }));
      } finally {
        setLoading(prev => ({ ...prev, recommendations: false }));
      }
    };

    fetchRecommendations();
  }, [params.id]);

   // Fetch reviews
   useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(prev => ({ ...prev, reviews: true }));
        const response = await api.get(`/movie/${params.id}/reviews`);
        setReviews(response.data.results || []);
      } catch (err) {
        console.error('Failed to fetch reviews:', err);
        setError(prev => ({ ...prev, reviews: 'Failed to load reviews' }));
      } finally {
        setLoading(prev => ({ ...prev, reviews: false }));
      }
    };

    fetchReviews();
  }, [params.id]);

  
  if (loading.movie) return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <Loader />
    </div>
  );
  
  if (error.movie) return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <Alert variant="danger" className="text-center">
        {error.movie}
        <div className="mt-2">
          <button 
            className="btn btn-primary"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </Alert>
    </div>
  );
  
  if (!movie) return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <Alert variant="warning" className="text-center">
        No movie data available
      </Alert>
    </div>
  );

  return (
    <>
      <div className="min-vh-30 p-5 mt-5 ">
        <Container>
        <Card 
         className="border-0 shadow-lg overflow-hidden" 
        style={{ 
        maxWidth: '90vw', 
        maxHeight: '75vh',
        margin: '0 auto',
        background:  theme === "dark" ? 'rgba(30, 30, 30, 0.95)' : 'rgba(255, 255, 255, 0.95)'
      }}
    >
            <div 
        className="position-absolute" 
        style={{
          top: '15px',
          right: '15px',
          zIndex: 1,
          fontSize: '1.5rem',
          color: isInWishlist(movie.id) ? 'red' : 'gray'
        }}
      >
        <i
          className={`bi ${isInWishlist(movie.id) ? 'bi-heart-fill' : 'bi-heart'} heart-icon`}
          onClick={(e) => {
            e.preventDefault();
            handleToggleWishlist(movie);
          }}
        
        ></i>
      </div>
            <Row className="g-0">
              {/* Image Column */}
              <Col md={3} className="position-relative">
                <div className="p-3 h-100 d-flex align-items-center">
                  <Card.Img 
                    src={movie.poster_path 
                      ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                      : '/placeholder-movie.png'}
                    alt={`${movie.title} Poster`}
                    className="rounded-3 img-fluid"
                    style={{
                      height: '90%',
                      objectFit: 'cover',
                      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
                      transition: 'transform 0.3s ease',
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </div>
              </Col>
  
              {/* Content Column */}
              <Col md={9} className="d-flex flex-column">
                <Card.Body className="p-2 p-lg-5 d-flex flex-column h-100">
                  {/* Header Section */}
                  <div className="mb-4">
                  <Card.Title as="h1" className="fw-bolder mb-2" style={{ 
        fontSize: '2rem',
        color: theme === "dark" ? 'white' : 'inherit'
      }}>
        {movie.title}
      </Card.Title>

           <div className="d-flex flex-wrap gap-4 align-items-center mb-3">
                    <div className="small fw-light" style={{ color: theme === "dark" ? '#bbb' : 'text-muted' }}>
                  {movie.release_date && new Date(movie.release_date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                 year: 'numeric'
              })}
               </div>
          </div>  
                    
            <div className="d-flex align-items-center p-2 rounded">
                 <i className={`bi bi-star-fill ${theme === "dark" ? 'text-light' : 'text-dark'} me-1`} />
                 <i className={`bi bi-star-fill ${theme === "dark" ? 'text-light' : 'text-dark'} me-1`} />
                <i className={`bi bi-star-fill ${theme === "dark" ? 'text-light' : 'text-dark'} me-1`} />
                <i className={`bi bi-star ${theme === "dark" ? 'text-light' : 'text-dark'} me-1`} />
               <i className={`bi bi-star ${theme === "dark" ? 'text-light' : 'text-dark'} me-2`} />
           <span className={theme === "dark" ? "text-light" : "text-muted"}>{movie.vote_count} votes</span>
            </div>
           </div>
  
                  {/* Description Section */}
                  <Card.Text 
  className="fs-7" 
  style={{ 
    lineHeight: 1.6,
    color: theme === "dark" ? '#eee' : 'inherit'
  }}
>
  {movie.overview || 'No overview available.'}
</Card.Text>
  
                  {/* Genres */}
                  {movie.genres?.length > 0 && (
                    <div className="d-flex flex-wrap gap-2 mb-4">
                      {movie.genres.map((genre) => (
                        <Badge 
                          key={genre.id} 
                          pill 
                          className="px-3 py-2 fs-6 fw-medium bg-warning text-dark"
                        >
                          {genre.name}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  <div className="d-flex flex-wrap gap-4 mb-4">
  {movie.runtime && (
    <span>
      <span className="fw-medium" style={{ color: theme === "dark" ? '#ddd' : 'inherit' }}>Duration: </span>
      <span style={{ color: theme === "dark" ? '#bbb' : '#6c757d' }}>{movie.runtime} Min</span>
    </span>
  )}
  
  {movie.spoken_languages?.length > 0 && (
    <span>
      <span className="fw-medium" style={{ color: theme === "dark" ? '#ddd' : 'inherit' }}>Language: </span>
      <span style={{ color: theme === "dark" ? '#bbb' : '#6c757d' }}>
        {movie.spoken_languages[0].name}
      </span>
    </span>
  )}
</div>
  
                  {/* Studio Info */}
                  {movie.production_companies?.length > 0 && (
                    <div className="d-flex gap-3 align-items-center">
                      <div className="px-3 py-2 bg-danger text-white fs-6">
                        {movie.production_companies.map((company) => (
                          company.logo_path && (
                            <img 
                              key={company.id}
                              src={`https://image.tmdb.org/t/p/w92${company.logo_path}`} 
                              alt={company.name}
                              className="company-logo mx-1"
                              style={{ height: '24px' }}
                            />
                          )
                        ))}
                      </div>
                    </div>
                  )}
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Container>
      </div>
      <div className={`container mb-5 p-3 rounded-3 shadow-sm ${ theme === "dark" ? 'bg-dark' : 'bg-light'}`}>
  <h1 
    className="bold" 
    style={{ 
      marginBottom: '20px', 
      cursor: 'pointer',
      color: theme === "dark" ? 'white' : 'inherit'
    }}
    onClick={toggleReviews}
  >
    Reviews <span style={{ fontSize: '0.7em' }}>{showReviews ? '▼' : '▶'}</span>
  </h1>
  {showReviews && <Reviews reviews={reviews} />}
</div>
          
      <hr />
      
      <div className="container mb-5">
        <h1 className="bold" style={{ marginBottom: '20px' }}>Recommendations</h1>
        
        {loading.recommendations ? (
          <div className="d-flex justify-content-center py-5">
            <Loader />
          </div>
        ) : error.recommendations ? (
          <Alert variant="danger" className="text-center">
            {error.recommendations}
            <div className="mt-2">
              <button 
                className="btn btn-sm btn-outline-primary"
                onClick={() => window.location.reload()}
              >
                Retry
              </button>
            </div>
          </Alert>
        ) : recommendations.length === 0 ? (
          <div className="text-center py-5">
            <i className="bi bi-film fs-1 text-muted mb-3"></i>
            <h4 className="text-muted">No Recommendations Found</h4>
            <p className="text-muted">We couldn't find any recommendations for this movie.</p>
          </div>
        ) : (
          <Row xs={1} md={2} lg={3} className="g-4">
            {recommendations.map((movie) => (
              <CardList key={movie.id} movie={movie} />
            ))}
          </Row>
        )}
      </div>
    </>
  );
};

export default MovieDetail;