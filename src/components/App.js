import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AppBar from 'components/AppBar';
import Container from 'components/Container';
import LoaderView from 'components/LoaderView';

import './App.css';

const HomePage = lazy(() =>
  import('../views/HomePage' /* webpackChunkName: "HomePage" */),
);

const MoviesPage = lazy(() =>
  import('../views/MoviesPage' /* webpackChunkName: "MoviesPage" */),
);

const NotFoundView = lazy(() =>
  import('../views/NotFoundView' /* webpackChunkName: "NotFoundView" */),
);

const MovieDetailsPage = lazy(() =>
  import(
    '../views/MovieDetailsPage' /* webpackChunkName: "MovieDetailsPage" */
  ),
);

export default function App() {
  return (
    <Container>
      <AppBar />
      <Suspense fallback={<LoaderView />}>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>

          <Route path="/movies">
            <MoviesPage />
          </Route>

          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>

          <Route>
            <NotFoundView />
          </Route>
        </Switch>
      </Suspense>

      <ToastContainer autoClose={3000} position="top-right" />
    </Container>
  );
}
