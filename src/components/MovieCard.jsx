import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleWishlist } from '../store/wishlistSlice';
import { HeartIcon } from './Icons';

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(selectWishlistItems);
  const isInWishlist = wishlistItems.some((item) => item.id === movie.id);

  const handleToggleWishlist = () => {
    dispatch(toggleWishlist(movie));
  };

  return (
    <div className="movie-card">
      {/* Other movie card content */}
      <button 
        className={`wishlist-btn ${isInWishlist ? 'active' : ''}`}
        onClick={handleToggleWishlist}
      >
        <HeartIcon filled={isInWishlist} />
      </button>
    </div>
  );
};

export default MovieCard;