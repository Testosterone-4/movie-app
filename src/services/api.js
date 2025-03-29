import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: import.meta.env.VITE_API_KEY,
    language: localStorage.getItem("language") || "en",
  },
});

// Update language method
api.updateLanguage = (lang) => {
  api.defaults.params.language = lang;
  localStorage.setItem("language", lang);
  // Update document direction based on language
  document.dir = lang === "ar" ? "rtl" : "ltr";
};

// Add request interceptor for error handling
api.interceptors.request.use(
  (config) => {
    // Log API requests in development
    if (import.meta.env.DEV) {
      console.log(`${config.method.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (import.meta.env.DEV) {
      console.error("API Error:", error.response?.data || error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
