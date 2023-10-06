import { useNavigate } from 'react-router-dom';
import './Logout.css';
import Loader from '../../components/loader/Loader';
import { useState } from 'react';
import Logo from '../../components/logo/Logo';

const Logout = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const goLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/');
    }, 2 * 1000);
  };

  return (
    <div className="contenedor">
      {!loading ? (
        <div className="login">
          <Logo />

          <div className="inc-cont">
            <div className="text">
              <h3>See you soon!</h3>
              <p>Thank you for using Whatsapp Web</p>
            </div>
            <button type="button" className="singin-btn" onClick={goLogin}>
              Sing In
            </button>

            <p className="creditos">© Whatsapp Web</p>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Logout;
