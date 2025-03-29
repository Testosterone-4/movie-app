import api from "./api";

export const searchMovies = async (query, page = 1) => {
  try {
    const response = await api.get(`/search/movie`, {
      params: {
        query,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching movies:", error);
    throw error;
  }
};

export const getNowPlayingMovies = async (page = 1) => {
  try {
    const response = await api.get(`/movie/now_playing`, {
      params: { page },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching now playing movies:", error);
    throw error;
  }
};
