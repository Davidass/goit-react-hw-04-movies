import { useState, useEffect, lazy, Suspense } from 'react';
import {
  useParams,
  NavLink,
  Route,
  useRouteMatch,
  useHistory,
  useLocation,
} from 'react-router-dom';
import { fetchMovieDetails, POSTER_URL } from 'services/movies-api';
// import Cast from '../../views/Cast';
// import Reviews from '../../views/Reviews';
import LoaderView from 'components/LoaderView';
import ErrorView from 'components/ErrorView';
import noImages from '../../images/no-image-icon-29.jpg';
import s from './MovieDetailsPage.module.css';

const Cast = lazy(() =>
  import('../Cast' /* webpackChunkName: "cast-subview"*/),
);

const Reviews = lazy(() =>
  import('../Reviews' /* webpackChunkName: "reviews-subview"*/),
);

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const { movie, setMovie } = useState(null);
  const { url, path } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    fetchMovieDetails(movieId)
      .then(({ poster_path, original_title, popularity, overview, genres }) => {
        setMovie({
          src: poster_path ? `${POSTER_URL}${poster_path}` : `${noImages}`,
          title: original_title,
          score: popularity.toFixed(1),
          overview,
          genres,
        });
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        console.log(error);
        setError(error.message);
        setStatus(Status.REJECTED);
      });
  }, [movieId, setMovie]);

  const handleGoBack = () => {
    history.push(location?.state?.from ?? '/');
  };

  return (
    <main className={s.main}>
      <button onClick={handleGoBack} type="button" className={s.btn}>
        Go back
      </button>

      {status === Status.PENDING && <LoaderView />}

      {status === Status.REJECTED && <ErrorView message={error} />}

      {status === Status.RESOLVED && (
        <>
          <div className={s.wrapper}>
            <img
              className={s.image}
              src={movie.src}
              alt={movie.title}
              width="350"
              heigte="500"
            />
            <div className={s.description}>
              <h2 className={s.title}>{movie.title}</h2>
              <h3 className={s.title}>User Score</h3>
              <p className={s.info}>{movie.score}</p>
              <h3 className={s.title}>Overview</h3>
              <p className={s.info}>{movie.overview}</p>
              <h3 className={s.title}>Genres</h3>
              <ul className={s.list}>
                {movie.genres.map(genre => (
                  <li key={genre.id}>{genre.name}</li>
                ))}
              </ul>
            </div>
          </div>

          <ul className={s.nav}>
            <li>
              <NavLink
                to={{
                  pathname: `${url}/cast`,
                  state: { from: location?.state?.from ?? '/' },
                }}
                className={s.link}
                activeClassName={s.activeLink}
              >
                Cast
              </NavLink>
            </li>
            <li>
              <NavLink
                to={{
                  pathname: `${url}/reviews`,
                  state: { from: location?.state?.from ?? '/' },
                }}
                className={s.link}
                activeClassName={s.activeLink}
              >
                Reviews
              </NavLink>
            </li>
          </ul>

          <Suspense fallback={<LoaderView />}>
            <Route path={`${path}/cast`}>
              {status === Status.RESOLVED && <Cast />}
            </Route>
            <Route path={`${path}/reviews`}>
              {status === Status.RESOLVED && <Reviews />}
            </Route>
          </Suspense>
        </>
      )}
    </main>
  );
}
