import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MoviesList from './pages/MoviesList';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<MoviesList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;