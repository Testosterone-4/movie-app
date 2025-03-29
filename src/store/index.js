import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './moviesSlice';
import wishlistReducer from './wishlistSlice';


export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    wishlist: wishlistReducer,
  },
});