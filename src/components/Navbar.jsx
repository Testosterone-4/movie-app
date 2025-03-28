import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Sun, Moon, Globe } from "react-bootstrap-icons";

const Navbar = () => {
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("en");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Load saved preferences
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    const savedLanguage = localStorage.getItem("language") || "en";

    setTheme(savedTheme);
    setLanguage(savedLanguage);
    updateTheme(savedTheme);
  }, []);

  // Theme toggle function
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    updateTheme(newTheme);
  };

  // Update theme and body classes
  const updateTheme = (currentTheme) => {
    document.body.className = `${currentTheme}-mode`;
    document.documentElement.setAttribute("data-theme", currentTheme);
  };

  // Language change function
  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
    setIsMenuOpen(false);
  };

  // Language options
  const languages = [
    { code: "en", name: "English", dir: "ltr" },
    { code: "ar", name: "العربية", dir: "rtl" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      className={`navbar navbar-expand-lg fixed-top ${
        theme === "dark"
          ? "navbar-dark bg-dark"
          : "navbar-light custom-light-bg"
      }`}
    >
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">
          <span className={theme === "light" ? "text-dark" : "text-light"}>
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
                  theme === "light" ? "text-dark" : "text-light"
                }`}
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  theme === "light" ? "text-dark" : "text-light"
                }`}
                to="/movies"
              >
                Movies
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  theme === "light" ? "text-dark" : "text-light"
                }`}
                to="/tv-shows"
              >
                TV Shows
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  theme === "light" ? "text-dark" : "text-light"
                }`}
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center">
            {/* Watchlist Link */}
            <Link
              to="/wishlist"
              className={`nav-link me-3 ${
                theme === "light" ? "text-dark" : "text-light"
              }`}
            >
              <span className="heart-icon">🤍</span>
              <span className="ms-1">Watchlist</span>
            </Link>

            {/* Language Dropdown */}
            <div className="dropdown me-3">
              <button
                className={`btn ${
                  theme === "light" ? "btn-outline-dark" : "btn-outline-light"
                } dropdown-toggle`}
                type="button"
                onClick={() =>
                  document
                    .querySelector(".dropdown-menu")
                    .classList.toggle("show")
                }
              >
                <Globe className="me-1" />
                {languages.find((lang) => lang.code === language)?.name}
              </button>
              <ul className="dropdown-menu">
                {languages.map((lang) => (
                  <li key={lang.code}>
                    <button
                      className={`dropdown-item ${
                        language === lang.code ? "active" : ""
                      }`}
                      onClick={() => changeLanguage(lang.code)}
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
                theme === "light" ? "btn-dark" : "btn-warning"
              } rounded-circle p-2`}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="text-dark" /> : <Moon />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
