import errorImage from '../../images/no-image-icon-29.jpg';
import s from './NotFoundView.module.css';

function NotFoundView() {
  return (
    <main role="alert" className={s.main}>
      <img src={errorImage} width="550" alt="404" className={s.img} />
      <h1 className={s.title}>This pages not found 😟</h1>
    </main>
  );
}
export default NotFoundView;
