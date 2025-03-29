
import React from 'react';
import { useState } from 'react';
import '../styles/review.css';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext'; 

export default function Reviews({ reviews }) {
    reviews = reviews || [];
     const { theme } = useContext(ThemeContext);
    return (
      <section className="reviews-section" aria-labelledby="reviews-heading">
      <div className={`container ${theme === "dark" ? "dark-mode" : ""}`}>
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
                  className={`review-card ${theme === "dark" ? "dark-mode" : ""}`}
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
                          <div className={`avatar-placeholder ${theme === "dark" ? "dark-mode" : ""}`}>
                            {review.author_details.username.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <span className={`author-name ${theme === "dark" ? "dark-mode" : ""}`}>
                          {review.author_details.username}
                        </span>
                      </div>
                      <div className="author-meta">
                        {review.author_details.rating && (
                          <div className="author-rating">
                            <span className="sr-only">Rating: </span>
                            <i className={`bi bi-star-fill ${theme === "dark" ? "text-light" : "text-dark"} me-1`} />
                            <i className={`bi bi-star-fill ${theme === "dark" ? "text-light" : "text-dark"} me-1`} />
                            <i className={`bi bi-star-fill ${theme === "dark" ? "text-light" : "text-dark"} me-1`} />
                            <i className={`bi bi-star ${theme === "dark" ? "text-light" : "text-dark"} me-1`} />
                            <i className={`bi bi-star ${theme === "dark" ? "text-light" : "text-dark"} me-2`} />
                            <span className={`rating-value ${theme === "dark" ? "text-light" : ""}`}>
                              {review.author_details.rating.toFixed(1)}
                            </span>
                          </div>
                        )}
                        <div className={`review-date ${theme === "dark" ? "text-light" : ""}`}>
                          {review.created_at && new Date(review.created_at).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`review-content ${theme === "dark" ? "dark-mode" : ""}`}>
                    {isExpanded 
                      ? review.content.split('\n\n').filter(p => p.trim()).map((paragraph, i) => (
                          <p key={i} className={`review-paragraph ${theme === "dark" ? "dark-mode" : ""}`}>{paragraph}</p>
                        ))
                      : truncatedContent.split('\n\n').filter(p => p.trim()).map((paragraph, i) => (
                          <p key={i} className={`review-paragraph ${theme === "dark" ? "dark-mode" : ""}`}>{paragraph}</p>
                        ))
                    }
                    {isLongReview && (
                      <div className="read-more-container">
                        <button 
                          onClick={() => setIsExpanded(!isExpanded)}
                          className={`read-more-btn ${theme === "dark" ? "dark-mode" : ""}`}
                          aria-expanded={isExpanded}
                        >
                          {isExpanded ? 'Show less' : 'Read more'}
                          <span className="btn-arrow">{isExpanded ? ' ↑' : ' ↓'}</span>
                        </button>
                      </div>
                    )}
                  </div>
                  
                  {review.url && (
                    <footer className={`review-footer ${theme === "dark" ? "dark-mode" : ""}`}>
                      <a 
                        href={review.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`full-review-link ${theme === "dark" ? "dark-mode" : ""}`}
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
          <div className={`no-reviews ${theme === "dark" ? "dark-mode" : ""}`}>
            <div className="no-reviews-icon">✍️</div>
            <h3 className={`no-reviews-title ${theme === "dark" ? "text-light" : ""}`}>No reviews yet</h3>
            <p className={`no-reviews-message ${theme === "dark" ? "text-light" : ""}`}>
              Be the first to share your thoughts about this!
            </p>
          </div>
        )}
      </div>
    </section>
      );
}