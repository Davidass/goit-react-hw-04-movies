import Navigation from 'components/Navigation';
import s from 'components/AppBar/AppBar.module.css';

export default function AppBar() {
  return (
    <header className={s.header}>
      <Navigation />
    </header>
  );
}
