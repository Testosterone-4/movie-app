import { useContext, useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectWishlistCount } from "../store/wishlistSlice";
import { Link } from "react-router-dom";
import { Heart, HeartFill, Sun, Moon, Globe } from "react-bootstrap-icons";
import { ThemeContext } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import api from "../services/api";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { language, changeLanguage } = useLanguage();
  const wishlistCount = useSelector(selectWishlistCount);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: "en", name: "English", dir: "ltr" },
    { code: "ar", name: "العربية", dir: "rtl" },
    { code: "fr", name: "Français", dir: "ltr" },
    { code: "zh", name: "中文", dir: "ltr" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (newLanguage) => {
    changeLanguage(newLanguage);
    setDropdownOpen(false);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav
      className={`navbar navbar-expand-lg fixed-top ${
        theme === "dark" ? "navbar-dark bg-dark" : "navbar-light bg-warning"
      }`}
      style={{ backgroundColor: theme === "light" ? "#ffc107" : "#212529" }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">
          <span className={theme === "light" ? "text-dark" : "text-white"}>
            Movie
          </span>
          <span className="text-primary">Hub</span>
        </Link>

        <button
          className={`navbar-toggler ${
            theme === "light" ? "border-dark" : "border-light"
          }`}
          type="button"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
        >
          <span
            className={`navbar-toggler-icon ${
              theme === "light" ? "custom-toggler-light" : ""
            }`}
          ></span>
        </button>

        <div className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  theme === "light" ? "text-dark" : "text-white"
                }`}
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  theme === "light" ? "text-dark" : "text-white"
                }`}
                to="/movies"
              >
                Movies
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  theme === "light" ? "text-dark" : "text-white"
                }`}
                to="/tv-shows"
              >
                TV Shows
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  theme === "light" ? "text-dark" : "text-white"
                }`}
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center">
            <Link
              to="/wishlist"
              className={`nav-link me-3 d-flex align-items-center ${
                theme === "light" ? "text-dark" : "text-white"
              }`}
            >
              <div className="position-relative">
                <Heart className="fs-5" />
                {wishlistCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {wishlistCount}
                    <span className="visually-hidden">items in wishlist</span>
                  </span>
                )}
              </div>
              <span className="ms-2 visually-hidden">Watchlist</span>
            </Link>

            <div className="dropdown me-3" ref={dropdownRef}>
              <button
                className={`btn ${
                  theme === "light" ? "btn-outline-dark" : "btn-outline-light"
                } dropdown-toggle d-flex align-items-center`}
                type="button"
                onClick={toggleDropdown}
                aria-expanded={dropdownOpen}
              >
                <Globe className="me-2" />
                <span className="language-text">
                  {languages.find((lang) => lang.code === language)?.name}
                </span>
              </button>
              <ul
                className={`dropdown-menu dropdown-menu-end ${
                  dropdownOpen ? "show" : ""
                }`}
              >
                {languages.map((lang) => (
                  <li key={lang.code}>
                    <button
                      className={`dropdown-item ${
                        language === lang.code ? "active" : ""
                      }`}
                      onClick={() => handleLanguageChange(lang.code)}
                      dir={lang.dir}
                    >
                      {lang.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={toggleTheme}
              className={`btn ${
                theme === "light" ? "btn-dark" : "btn-light"
              } rounded-circle p-2`}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="text-dark" />
              ) : (
                <Moon className="text-light" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
