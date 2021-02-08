import propTypes from 'prop-types';
import s from './Container.module.css';

function Container({ children }) {
  return <div className={s.container}>{children}</div>;
}

Container.propTypes = {
  children: propTypes.node.isRequired,
};

export default Container;
