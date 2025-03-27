import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectWishlistCount } from '../store/wishlistSlice';

function Navbar() {
  const wishlistCount = useSelector(selectWishlistCount);

  return (
    <nav className="navbar">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Movie App
        </Link>
        <div className="d-flex align-items-center">
          <select className="form-select language-dropdown me-3">
            <option value="en">EN</option>
          </select>
          <Link to="/wishlist" className="wishlist-link position-relative">
            <span className="heart-icon">🤍</span>
            <span className="ms-1">Watchlist</span>
            {wishlistCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {wishlistCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;