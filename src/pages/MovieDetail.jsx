import { Container, Row, Col, Card, Badge, Alert } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import Loader from '../components/Loader';
import CardList from '../components/Card';

const MovieDetail = () => {
  const [movie, setMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
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
      <div className="min-vh-30 p-5">
        <Container>
          <Card 
            className="border-0 shadow-lg overflow-hidden" 
            style={{ 
              maxWidth: '90vw', 
              maxHeight: '75vh',
              margin: '0 auto',
              background: 'rgba(255, 255, 255, 0.95)'
            }}
          >
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
                    <Card.Title as="h1" className="fw-bolder mb-2" style={{ fontSize: '2rem' }}>
                      {movie.title}
                    </Card.Title>

                    <div className="d-flex flex-wrap gap-4 align-items-center mb-3">
                      <div className="text-muted small fw-light">
                        {movie.release_date && new Date(movie.release_date).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                    </div>  
                    
                    <div className="d-flex align-items-center p-2 rounded">
                      <i className="bi bi-star-fill text-dark me-1" />
                      <i className="bi bi-star-fill text-dark me-1" />
                      <i className="bi bi-star-fill text-dark me-1" />
                      <i className="bi bi-star text-dark me-1" />
                      <i className="bi bi-star text-dark me-2" />
                      <span className="text-muted small">{movie.vote_count} votes</span>
                    </div>
                  </div>
  
                  {/* Description Section */}
                  <Card.Text className="fs-7" style={{ lineHeight: 1.6 }}>
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
                        <span className="fw-medium">Duration: </span>
                        <span className="text-muted">{movie.runtime} Min</span>
                      </span>
                    )}
                    
                    {movie.spoken_languages?.length > 0 && (
                      <span>
                        <span className="fw-medium">Language: </span>
                        <span className="text-muted">
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