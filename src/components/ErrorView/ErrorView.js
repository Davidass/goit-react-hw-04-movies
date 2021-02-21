import PropTypes from 'prop-types';
import s from './ErrorView.module.css';

function ErrorView({ message }) {
  return (
    <div role="alert">
      <p className={s.message}>
        Sorry, an unexpected error has occurred 🙄:{message}
      </p>
    </div>
  );
}

ErrorView.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorView;
