import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (theme) => {
    const root = document.documentElement;
    if (theme === "light") {
      root.style.setProperty("--navbar-color", "#ffc107"); // Yellow navbar
      root.style.setProperty("--bg-color", "#ffffff"); // White body
      root.style.setProperty("--text-color", "#000000");
    } else {
      root.style.setProperty("--navbar-color", "#1a1a1a"); // Dark navbar
      root.style.setProperty("--bg-color", "#121212"); // Dark body
      root.style.setProperty("--text-color", "#ffffff");
    }
    document.body.className = theme;
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
