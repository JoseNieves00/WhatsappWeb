import { useNavigate } from 'react-router-dom';
import './Login.css';
import logo from '../../../public/logo.png';
import Loader from '../../components/loader/Loader';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import Logo from '../../components/logo/Logo';

const Login = () => {
  localStorage.setItem('logo', logo);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const validado = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/chat');
    }, 2 * 1000);
  };

  const validarAcceso = async (e) => {
    e.preventDefault();
    let email_lg = e.target[0].value;
    let password_lg = e.target[1].value;

    if ((email_lg == '', password_lg == '')) {
      alert('Ingrese datos');
    } else {
      const usersDB = await getDocs(collection(db, 'users'));
      const usersData = usersDB.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      let valid = false;
      let _user = null;
      usersData.forEach((user) => {
        if (user.email == email_lg && user.password == password_lg) {
          valid = true;
          _user = user;
        }
      });
      if (valid == true) {
        localStorage.setItem('email', _user.email);
        localStorage.setItem('username', _user.username);
        localStorage.setItem('URLPhoto', _user.URLphoto);
        validado();
      } else {
        alert('el usuario no exite en el sistema');
      }
    }
  };

  const registerClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/register');
    }, 2 * 1000);
  };

  return (
    <div className="contenedor">
      {!loading ? (
        <div className="login">
          <Logo />

          <div className="inc-cont">
            <div className="text">
              <h3>Welcome back!</h3>
              <p>Sign in to continue to Whastsapp Web.</p>
            </div>

            <form action="" onSubmit={validarAcceso}>
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                placeholder="jhondoe@gmail.com"
                className="email-inc"
              />
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                placeholder="password"
                className="password-inc"
              />
              <div className="rmb-cont">
                <input type="checkbox" name="rmb" />
                <label htmlFor="rmb">Remember me</label>
              </div>
              <button type="submit" className="login-btn">
                Log In
              </button>

              <div className="register-cont">
                <p>Don´t have an account ?</p>
                <a onClick={registerClick}>Register</a>
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

export default Login;
