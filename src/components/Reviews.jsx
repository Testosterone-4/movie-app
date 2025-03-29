
import React from 'react';
import { useState } from 'react';
import '../styles/review.css'; 

export default function Reviews({ reviews }) {
    reviews = reviews || [];
    return (
        <section className="reviews-section" aria-labelledby="reviews-heading">
          <div className="container">
            {reviews.length > 0 ? (
              <div className="reviews-grid">
                {reviews.map((review) => {
                  const [isExpanded, setIsExpanded] = useState(false);
                  const maxLength = 500;
                  const isLongReview = review.content.length > maxLength;
                  const truncatedContent = isLongReview 
                    ? review.content.substring(0, maxLength) + '...' 
                    : review.content;
      
                  return (
                    <article 
                      key={review.id} 
                      className="review-card"
                      aria-labelledby={`review-${review.id}-header`}
                    >
                      <div className="review-header">
                        <div className="author-info">
                          <div className="avatar-container">
                            {review.author_details.avatar_path ? (
                              <img 
                                src={`https://image.tmdb.org/t/p/w45${review.author_details.avatar_path}`} 
                                alt=""
                                width="45"
                                height="45"
                                loading="lazy"
                                className="avatar-img"
                              />
                            ) : (
                              <div className="avatar-placeholder">
                                {review.author_details.username.charAt(0).toUpperCase()}
                              </div>
                            )}
                            <span className="author-name">
                              {review.author_details.username}
                            </span>
                          </div>
                          <div className="author-meta">
                            {review.author_details.rating && (
                              <div className="author-rating">
                                <span className="sr-only">Rating: </span>
                                <i className="bi bi-star-fill text-dark me-1" />
                                <i className="bi bi-star-fill text-dark me-1" />
                                <i className="bi bi-star-fill text-dark me-1" />
                                <i className="bi bi-star text-dark me-1" />
                                <i className="bi bi-star text-dark me-2" />
                                <span className="rating-value">{review.author_details.rating.toFixed(1)}</span>
                              </div>
                            )}
                            <div className="review-date">
                              {review.created_at && new Date(review.created_at).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="review-content">
                        {isExpanded 
                          ? review.content.split('\n\n').filter(p => p.trim()).map((paragraph, i) => (
                              <p key={i} className="review-paragraph">{paragraph}</p>
                            ))
                          : truncatedContent.split('\n\n').filter(p => p.trim()).map((paragraph, i) => (
                              <p key={i} className="review-paragraph">{paragraph}</p>
                            ))
                        }
                        {isLongReview && (
                          <div className="read-more-container">
                            <button 
                              onClick={() => setIsExpanded(!isExpanded)}
                              className="read-more-btn"
                              aria-expanded={isExpanded}
                            >
                              {isExpanded ? 'Show less' : 'Read more'}
                              <span className="btn-arrow">{isExpanded ? ' ↑' : ' ↓'}</span>
                            </button>
                          </div>
                        )}
                      </div>
                      
                      {review.url && (
                        <footer className="review-footer">
                          <a 
                            href={review.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="full-review-link"
                          >
                            Read full review
                            <span className="link-arrow"> →</span>
                          </a>
                        </footer>
                      )}
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="no-reviews">
                <div className="no-reviews-icon">✍️</div>
                <h3 className="no-reviews-title">No reviews yet</h3>
                <p className="no-reviews-message">Be the first to share your thoughts about this!</p>
              </div>
            )}
          </div>
        </section>
      );
}