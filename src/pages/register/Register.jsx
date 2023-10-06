import { useNavigate } from 'react-router-dom';
import './Register.css';
import Loader from '../../components/loader/Loader';
import { useState } from 'react';
import { vRegister } from '../../firebase.js';

const Register = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const validarRegister = (e) => {
    e.preventDefault();
    var email_rg = e.target[0].value;
    var username_rg = e.target[1].value;
    var password_rg = e.target[2].value;
    var URLphoto_rg = e.target[3].value;

    const registrado = () => {
      vRegister(email_rg, username_rg, password_rg, URLphoto_rg);
      alert('Registro extoso');
      navigate('/');
    };

    email_rg != ''
      ? username_rg != ''
        ? password_rg != ''
          ? registrado()
          : alert('Ingrese todos los campos')
        : alert('Ingrese todos los campos')
      : alert('Ingrese todos los campos');
  };

  const loginClick = () => {
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
          <div className="logo">
            <img src="./public/logo.png" />
          </div>

          <div className="inc-cont">
            <div className="text">
              <h3>Register</h3>
              <p>Enter your information</p>
            </div>

            <form onSubmit={validarRegister}>
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                placeholder="jhondoe@gmail.com"
                className="email-inc"
              />
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                placeholder="Jhon Doe"
                className="username-inc"
              />
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                placeholder="Enter password"
                className="password-inc"
              />
              <label htmlFor="URLphoto">
                Ingrese URL de su foto de perfil:
              </label>
              <input
                type="text"
                placeholder="https://fotodeperfil.png"
                className="phto-inc"
              />
              <button type="submit" className="register-btn">
                Register
              </button>
              <div className="login-cont">
                <p>Already have an account ?</p>
                <a onClick={loginClick}>Login</a>
              </div>
            </form>
            <p className="creditos">© Whatsapp Web</p>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Register;
