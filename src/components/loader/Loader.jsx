import Logo from '../logo/Logo';
import './Loader.css';

const Loader = () => {
  return (
    <div className="contenedor">
      <div className="logo-loader">
        <Logo />
      </div>
      <div class="spinner"></div>
      <p className="creditos-loader">© Whatsapp Web</p>
    </div>
  );
};

export default Loader;
