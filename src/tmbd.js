import axios from 'axios';

const API_TOKEN = import.meta.env.VITE_THE_MOVIE_DB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
    accept: 'application/json',
  },
  params: {
    language: 'en-US',
    include_adult: false,
    page: 1,
  },
});

const options = {
  headers: {
    Authorization: API_TOKEN,
  },
};

export const getTrendingMovies = async (page = 1) => {
  try {
    const response = await axiosInstance.get(`/trending/movie/day`, {
      params: {
        page,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
};

export const searchMovies = async (query, page = 1) => {
  try {
    const response = await axiosInstance.get('/search/movie', {
      params: { query, page },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

export const getMovieDetails = async movieId => {
  try {
    const response = await axiosInstance.get(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

export const getMovieReviews = async (movieId, page = 1) => {
  try {
    const response = await axiosInstance.get(`/movie/${movieId}/reviews`, {
      params: { page },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

export const getMovieCast = async movieId => {
  try {
    const response = await axiosInstance.get(`/movie/${movieId}/credits`);
    return response.data.cast;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};
