import { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { fetchTredingMovies, POSTER_URL } from '../../services/movies-api';
import LoaderView from 'components/LoaderView';
import ErrorView from 'components/ErrorView';

import s from './HomePage.module.css';

const Status = {
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

function HomePage() {
  const { url } = useRouteMatch();
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.PENDING);

  useEffect(() => {
    setStatus(Status.PENDING);
    fetchTredingMovies()
      .then(request => setMovies(request.results))
      .then(setStatus(Status.RESOLVED))
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, []);

  if (status === Status.PENDING) {
    return <LoaderView />;
  }

  if (status === Status.REJECTED) {
    return <ErrorView message={error.message} />;
  }

  if (status === Status.RESOLVED) {
    return (
      <>
        {movies && (
          <>
            <h2 className={s.title}>Trending today</h2>
            <ul className={s.list}>
              {movies.map(movie => (
                <>
                  {movie.poster_path && (
                    <li key={movie.id} className={s.item}>
                      <Link to={`${url}movies/${movie.id}`} className={s.link}>
                        <img
                          className={s.image}
                          src={POSTER_URL + movie.poster_path}
                          alt={movie.title}
                          width="250"
                          height="350"
                        />
                      </Link>
                      <span className={s.movieTitle}>{movie.title}</span>
                    </li>
                  )}
                </>
              ))}
            </ul>
          </>
        )}
      </>
    );
  }
}

export default HomePage;
