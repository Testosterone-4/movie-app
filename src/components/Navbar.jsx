import { useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectWishlistCount } from "../store/wishlistSlice";
import { Link } from "react-router-dom";
import { Sun, Moon, Globe } from "react-bootstrap-icons";
import { ThemeContext } from "../context/ThemeContext";
import api from "../services/api"; // Add this import

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const wishlistCount = useSelector(selectWishlistCount);
  const [language, setLanguage] = useState("en");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Updated Language options
  const languages = [
    { code: "en", name: "English", dir: "ltr" },
    { code: "ar", name: "العربية", dir: "rtl" },
    { code: "fr", name: "Français", dir: "ltr" },
    { code: "zh", name: "中文", dir: "ltr" },
  ];

  // Updated Load saved preferences
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "en";
    setLanguage(savedLanguage);
    updateDocumentLanguage(savedLanguage);
    api.updateLanguage(savedLanguage);
  }, []);

  // Updated Language change function with API integration
  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
    updateDocumentLanguage(newLanguage);
    // Update API language
    api.updateLanguage(newLanguage);
    // Force reload data
    window.dispatchEvent(new Event("languageChange"));
    setIsMenuOpen(false);
  };

  // Updated helper function for document language updates
  const updateDocumentLanguage = (lang) => {
    document.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    document.querySelector("html").setAttribute("lang", lang);
    // Add class to body for RTL/LTR specific styles
    document.body.classList.toggle("rtl", lang === "ar");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
            {/* Watchlist Link with counter */}
            <Link
              to="/wishlist"
              className={`nav-link me-3 ${
                theme === "light" ? "text-dark" : "text-white"
              }`}
            >
              <span className="heart-icon">🤍</span>
              <span className="ms-1">
                Watchlist {wishlistCount > 0 && `(${wishlistCount})`}
              </span>
            </Link>

            {/* Updated Language Dropdown */}
            <div className="dropdown me-3">
              <button
                className={`btn ${
                  theme === "light" ? "btn-outline-dark" : "btn-outline-light"
                } dropdown-toggle d-flex align-items-center`}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  document
                    .querySelector(".dropdown-menu")
                    .classList.toggle("show");
                }}
              >
                <Globe className="me-2" />
                <span className="language-text">
                  {languages.find((lang) => lang.code === language)?.name}
                </span>
              </button>
              <ul
                className="dropdown-menu dropdown-menu-end"
                onClick={(e) => e.stopPropagation()}
              >
                {languages.map((lang) => (
                  <li key={lang.code}>
                    <button
                      className={`dropdown-item ${
                        language === lang.code ? "active" : ""
                      }`}
                      onClick={() => changeLanguage(lang.code)}
                      dir={lang.dir}
                    >
                      {lang.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Theme Toggle */}
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
