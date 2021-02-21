import { useState, useEffect, Suspense } from 'react';
import {
  useParams,
  NavLink,
  Route,
  Switch,
  useRouteMatch,
} from 'react-router-dom';
import { fetchMovieDetails, POSTER_URL } from 'services/movies-api';
import Cast from '../../views/Cast';
import Reviews from '../../views/Reviews';
import LoaderView from 'components/LoaderView';

import s from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const { movie, setMovie } = useState(null);
  const { url, path } = useRouteMatch();

  useEffect(() => {
    fetchMovieDetails(movieId).then(setMovie);
  }, [movieId, setMovie]);

  return (
    <div>
      <div className={s.wrapper}>
        <img
          className={s.image}
          src={POSTER_URL + movie.poster_path}
          alt={movie.title}
          width="350"
          heigte="500"
        />
        <div className={s.description}>
          <h2 className={s.title}>{movie.title}</h2>
          <span className={s.movieTitle}>Rating</span>
          <span>{movie.vote_average}</span>
          <p className={s.movieTitle}>Overview</p>
          <p>{movie.overview}</p>

          {movie.genres && (
            <>
              <p className={s.movieTitle}>Genres</p>
              <ul className={s.list}>
                {movie.genres.map(genre => (
                  <li key={genre.id}>{genre.name}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
      <nav className={s.nav}>
        <NavLink
          to={`${url}/cast`}
          className={s.link}
          activeClassName={s.activeLink}
        >
          Reviews
        </NavLink>
      </nav>

      <Suspense fallback={<LoaderView />}>
        <Switch>
          <Route path={`${path}:moviedId/cast`}>
            <Cast movieId={movieId} />
          </Route>
          <Route path={`${path}:movieId/reviews`}>
            <Reviews movieId={movieId} />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}
