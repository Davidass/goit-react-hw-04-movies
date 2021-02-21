import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchMovieCredits, POSTER_URL } from '../../services/movies-api';
import s from './Cast.module.css';
import NoImage from '../../images/no-image-icon-29.jpg';
import { toast } from 'react-toastify';
import ErrorView from 'components/ErrorView';
import LoaderView from 'components/LoaderView';

const Status = {
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

function Cast({ movieId }) {
  const [authors, setAuthors] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMovieCredits(movieId)
      .then(({ cast }) => {
        if (cast.length === 0) {
          toast.error('👻 oops no results');
          setStatus(Status.IDLE);
          return;
        }
        setAuthors(cast);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        console.log(error);
        setError('🙄 Some mistake, Try again.');
        setStatus(Status.REJECTED);
      });
  }, [movieId]);

  if (status === Status.PENDING) {
    return <LoaderView />;
  }

  if (status === Status.REJECTED) {
    return <ErrorView message={error.message} />;
  }

  if (status === Status.RESOLVED) {
    return (
      <>
        {authors && (
          <>
            <ul className={s.list}>
              {authors.map(author => (
                <>
                  {author.profile_path && (
                    <li key={author.profile_path} className={s.item}>
                      <img
                        className={s.image}
                        src={
                          author.profile_path
                            ? `${POSTER_URL}${author.profile_path}`
                            : NoImage
                        }
                        alt={author.original_name}
                        width="250"
                        height="350"
                      />
                      <h3 className={s.name}>{author.original_name}</h3>
                      <p className={s.character}>{author.character}</p>
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

Cast.propTypes = {
  movieId: PropTypes.string.isRequired,
};

export default Cast;
