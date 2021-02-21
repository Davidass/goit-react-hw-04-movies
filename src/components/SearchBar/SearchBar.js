import { useState } from 'react';
import { GrSearch } from 'react-icons/gr';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PropTypes from 'prop-types';
import s from './SearchBar.module.css';

function Searchbar({ onSubmit }) {
  const [movieName, setmovieName] = useState('');

  const handleNameChange = event => {
    setmovieName(event.currentTarget.value.toLowerCase());
  };

  const handelFormSubmit = e => {
    e.preventDefault();

    if (movieName.trim() === '') {
      return toast.info('Please enter search query');
    }

    onSubmit(movieName);
    setmovieName('');
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={handelFormSubmit}>
        <button type="submit" className={s.SearchFormBtn}>
          <GrSearch />
          {/* <span className={s.SearchForm_button_label}>Search</span> */}
        </button>

        <input
          value={movieName}
          onChange={handleNameChange}
          className={s.SearchForm_input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
