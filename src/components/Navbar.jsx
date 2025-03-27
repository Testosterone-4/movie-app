import { Link } from 'react-router-dom';

function Navbar() {
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
          <Link to="/wishlist" className="wishlist-link">
            <span className="heart-icon">🤍</span>
            <span className="ms-1">Watchlist</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;