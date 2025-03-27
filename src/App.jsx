import { useState } from 'react'
//import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import MovieDetail from './pages/MovieDetail'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <MovieDetail />
    </>
  )
}

export default App
