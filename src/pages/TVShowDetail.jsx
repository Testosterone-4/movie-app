import { Container, Row, Col, Card, Badge, Alert } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import Loader from '../components/Loader';
import { toggleWishlist, selectWishlistItems } from '../store/wishlistSlice';
import { useDispatch, useSelector } from 'react-redux';

const TvDetail = () => {
  const [tv, setTv] = useState(null);
  const wishlistItems = useSelector(selectWishlistItems);
  const dispatch = useDispatch();


  const handleToggleWishlist = (movie) => {
    dispatch(toggleWishlist(movie));
  };

  
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
    const fetchTvDetails = async () => {
      try {
        setLoading(prev => ({ ...prev, movie: true }));
        const response = await api.get(`/tv/${params.id}`);
        setTv(response.data);
      } catch (err) {
        console.error('Failed to fetch tv details:', err);
        setError(prev => ({ ...prev, movie: 'Failed to load tv details' }));
      } finally {
        setLoading(prev => ({ ...prev, movie: false }));
      }
    };

    fetchTvDetails();
  }, [params.id]);

  if (loading.tv) return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <Loader />
    </div>
  );
  
  if (error.tv) return (
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
  
  if (!tv) return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <Alert variant="warning" className="text-center">
        No movie data available
      </Alert>
    </div>
  );

  return (
    <>
      <div className="min-vh-30 p-5 mt-5">
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
            <div 
        className="position-absolute" 
        style={{
          top: '15px',
          right: '15px',
          zIndex: 1,
          fontSize: '1.5rem',
          color: isInWishlist(tv.id) ? 'red' : 'gray'
        }}
      >
        <i
          className={`bi ${isInWishlist(tv.id) ? 'bi-heart-fill' : 'bi-heart'} heart-icon`}
          onClick={(e) => {
            e.preventDefault();
            handleToggleWishlist(tv);
          }}
        
        ></i>
      </div>
            <Row className="g-0">
              {/* Image Column */}
              <Col md={3} className="position-relative">
                <div className="p-3 h-100 d-flex align-items-center">
                  <Card.Img 
                    src={tv.poster_path 
                      ? `https://image.tmdb.org/t/p/w500/${tv.poster_path}`
                      : '/placeholder-movie.png'}
                    alt={`${tv.name} Poster`}
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
                      {tv.name || tv.original_name}
                    </Card.Title>

                    <div className="d-flex flex-wrap gap-4 align-items-center mb-3">
                      <div className="text-muted small fw-light">
                        {tv.first_air_date && new Date(tv.first_air_date).toLocaleDateString('en-US', {
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
                      <span className="text-muted small">{tv.vote_count} votes</span>
                    </div>
                  </div>
  
                  {/* Description Section */}
                  <Card.Text className="fs-7" style={{ lineHeight: 1.6 }}>
                    {tv.overview || 'No overview available.'}
                  </Card.Text>
  
                  {/* Genres */}
                  {tv.genres?.length > 0 && (
                    <div className="d-flex flex-wrap gap-2 mb-4">
                      {tv.genres.map((genre) => (
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
                  {
                   (tv.episode_run_time?.[0] ?? tv.last_episode_to_air?.runtime) && (
                  <span>
                  <span className="fw-medium">Duration: </span>
                  <span className="text-muted">
                  {tv.episode_run_time?.[0] ?? tv.last_episode_to_air?.runtime} Min
                </span>
                </span>
                )
                 }
                    {tv.spoken_languages?.length > 0 && (
                      <span>
                        <span className="fw-medium">Language: </span>
                        <span className="text-muted">
                          {tv.spoken_languages[0].name}
                        </span>
                      </span>
                    )}
                  </div>
  
                  {/* Studio Info */}
                  {tv.production_companies?.length > 0 && (
                    <div className="d-flex gap-3 align-items-center">
                      <div className="px-3 py-2 bg-danger text-white fs-6">
                        {tv.production_companies.map((company) => (
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
      
    
    </>
  );
};

export default TvDetail;