import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import s from 'components/LoaderView/LoaderView.module.css';

function LoaderView() {
  return (
    <>
      <Loader
        className={s.Loader}
        type="ThreeDots"
        color="#00BFFF"
        height={80}
        width={80}
        timeout={3000}
      />
    </>
  );
}

export default LoaderView;
