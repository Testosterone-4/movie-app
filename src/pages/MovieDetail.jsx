import { Container, Navbar, Form, InputGroup, Button, Row, Col, Card, Badge } from 'react-bootstrap';
const MovieDetail = () => {
    return (
      <div className="min-vh-30 py-5" >
        <Container>
          <Card className="border-0 shadow-lg overflow-hidden" style={{ 
            maxWidth: '80vw', 
            maxHeight: '75vh',
            margin: '0 auto',
            background: 'rgba(255, 255, 255, 0.95)'
          }}>
            <Row className="g-0">
              {/* Image Column */}
              <Col md={3} className="position-relative">
                <div className="p-3 h-100 d-flex align-items-center">
                  <Card.Img 
                    src="myphoto.jpg"
                    alt="Black Widow Poster"
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
                    <Card.Title as="h1" className="fw-bold display-5 mb-3 text-gradient">
                      BLACK WIDOW
                    </Card.Title>
                    <div className="d-flex flex-wrap gap-4 align-items-center mb-3">
                      <div className="d-flex align-items-center text-primary">
                        <i className="bi bi-calendar-event me-2 fs-5"></i>
                        <span className="fw-medium">SEP 25, 2017</span>
                      </div>
                      <div className="d-flex align-items-center text-warning">
                        <i className="bi bi-star-fill me-2 fs-5"></i>
                        <span className="fw-medium">4.5/5</span>
                      </div>
                    </div>
                  </div>
  
                  {/* Description Section */}
                  <Card.Text className="text-secondary mb-4 fs-5" style={{ lineHeight: 1.7 }}>
                    Natasha Romanoff, on the run from the government following her disobedience to the Sokovia Accords 
                    and for aiding Steve Rogers, finds herself on her own and is forced to deal with some of the red 
                    in her ledger.
                  </Card.Text>
  
                  {/* Genres */}
                  <div className="d-flex flex-wrap gap-2 mb-4">
                    {['Action', 'Crime', 'Thriller'].map((genre) => (
                      <Badge 
                        key={genre} 
                        pill 
                        className="px-3 py-2 fs-6 fw-medium"
                        style={{ 
                          background:'yellowgreen', 
                          border: '1px solid #dc3545'
                        }}
                      >
                        {genre}
                      </Badge>
                    ))}
                  </div>
                  <div className="d-flex flex-wrap gap-4 mb-4">
                      <div>
                        <h6 className="text-uppercase text-muted mb-1">Duration</h6>
                        <p className="mb-0 fw-medium">134 minutes</p>
                      </div>
                      <div>
                        <h6 className="text-uppercase text-muted mb-1">Language</h6>
                        <p className="mb-0 fw-medium">English</p>
                      </div>
                    </div>
  
                    {/* Studio Info */}
                    <div className="d-flex gap-3 align-items-center">
                      <Badge pill className="px-3 py-2 bg-danger text-white fs-6">
                        MARVEL STUDIO
                      </Badge>
                      <div className="text-muted fst-italic">
                        Produced by Kevin Feige
                      </div>
                    </div>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Container>
      </div>
    );
  };

export default MovieDetail;