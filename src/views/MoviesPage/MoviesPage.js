import { useState, useEffect } from 'react';
import { Link, useRouteMatch, useHistory, useLocation } from 'react-router-dom';
import SearchBar from 'components/SearchBar';
import * as moviesApi from '../../services/movies-api';
import s from './MoviesPage.module.css';
import LoaderView from 'components/LoaderView';
import ErrorView from 'components/ErrorView/ErrorView';

const Status = {
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function MoviesPage() {
  const { url } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [movieName, setMovieName] = useState(null);
  const [query, setQuery] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  // const page = new URLSearchParams(location.search).get('page') ?? 1;

  useEffect(() => {
    if ((location.search = '')) {
      return;
    }

    const newSearch = new URLSearchParams(location.search).get('query');
    setQuery(newSearch);
  }, [location, location.search]);

  useEffect(() => {
    if (!query) return;
    setStatus(Status.PENDING);

    moviesApi
      .fetchSeachMovies(query, page)
      .then(({ results }) => {
        if (results.length === 0) {
          setError(`No results were found for ${query}`);
          setStatus(Status.REJECTED);
          return;
        }

        setMovieName(results);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        console.log(error);
        setError(error.message);
        setStatus(Status.REJECTED);
      });
  }, [query, page]);

  const handeleSearchBarSubmit = newSearch => {
    if (query === newSearch) return;
    setQuery(newSearch);
    setMovieName(null);
    setError(null);
    setPage(1);
    setStatus(Status.IDLE);
    history.push({ ...location, search: `query=${newSearch}` });
  };

  return (
    <main className={s.main}>
      <SearchBar onSubmit={handeleSearchBarSubmit} />
      {status === Status.PENDING && <LoaderView />}

      {status === Status.REJECTED && <ErrorView message={error} />}

      {status === Status.RESOLVED && (
        <>
          <ul className={s.movieList}>
            {movieName.map(movie => (
              <li key={movie.id} className={s.moviesItem}>
                <Link
                  className={s.link}
                  to={{ pathname: `${url}/${movie.id}` }}
                >
                  <img
                    className={s.image}
                    src={moviesApi.POSTER_URL + movie.poster_path}
                    alt={movie.title}
                    width="300"
                    height="450"
                  />
                </Link>
                <span className={s.movieTitle}>{movie.title}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}
