import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import Navbar from "./components/Navbar";
import MoviesList from "./pages/MoviesList";
import Wishlist from "./pages/Wishlist";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <Provider store={store}>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<MoviesList />} />
              <Route path="/wishlist" element={<Wishlist />} />
            </Routes>
          </BrowserRouter>
        </Provider>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
