import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchMovieReviews } from '../../services/movies-api';
import s from './Reviews.module.css';

export default function Reviews({ movieId }) {
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    fetchMovieReviews(movieId).then(request => setReviews(request.results));
  }, [movieId]);

  return (
    <div className={s.wrapper}>
      {reviews.length > 0 ? (
        <>
          <ul className={s.list}>
            {reviews.map(review => (
              <li key={review.id} className={s.item}>
                <p className={s.title}> {review.author}</p>
                <p> {review.content}</p>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className={s.text}>No reviews to show</p>
      )}
    </div>
  );
}

Reviews.propTypes = {
  movieId: PropTypes.string.isRequired,
};
