import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MoviesList from './pages/MoviesList';
import MovieDetail from './pages/MovieDetail';
import TVShows from './pages/TVShows';
import TVShowDetail from './pages/TVShowDetail';
import Wishlist from './pages/Wishlist';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<MoviesList />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/tv-shows" element={<TVShows />} />
        <Route path="/tv/:id" element={<TVShowDetail />} />
        <Route path="/about" element={<div className="container mt-5 pt-5"><h1>About</h1></div>} />
        <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;