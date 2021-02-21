const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '4e8226e4afb17257e9daeef0b809e15f';
const TREND_URL = `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`;

export const POSTER_URL = 'https://image.tmdb.org/t/p/w500';

async function fetchWithErrorHandlLing(url = '', config = {}) {
  const response = await fetch(url, config);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error('404 Not 😒'));
}

export function fetchTredingMovies() {
  return fetchWithErrorHandlLing(TREND_URL);
}

export function fetchSeachMovies(query, page) {
  return fetchWithErrorHandlLing(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`,
  );
}

export function fetchMovieDetails(movieId) {
  console.log(movieId);
  return fetchWithErrorHandlLing(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`,
  );
}

export function fetchMovieCredits(movieId) {
  return fetchWithErrorHandlLing(
    `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`,
  );
}

export function fetchMovieReviews(movieId) {
  return fetchWithErrorHandlLing(
    `${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US`,
  );
}
