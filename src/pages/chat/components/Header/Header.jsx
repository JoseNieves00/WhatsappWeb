import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import searchImg from '../../../../../public/search.png';
import settingsImg from '../../../../../public/settings-btn.png';
import userImg from '../../../../../public/default-user.png';
import './Header.css';

const Header = ({ profile, onHandleKey }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [URLphoto, setURLphoto] = useState(localStorage.getItem('URLPhoto'));
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState();

  const menuBar = () => {
    setIsOpen(!isOpen);
  };

  const exitClick = () => {
    localStorage.clear();
    navigate('/logout');
  };

  const acessChat = () => {
    navigate('/chat1');
  };

  const handleKey = (e) => {
    onHandleKey(e.target.value);
  };

  return (
    <div className="top">
      <div className="settings-cont">
        <div className="profile-box">
          <img src={URLphoto} />
        </div>

        <div className="settings-btn" onClick={menuBar}>
          <img src={settingsImg} />
        </div>

        {isOpen && (
          <div className="menu">
            <ul>
              <li>
                <a onClick={exitClick}>Exit</a>
              </li>
            </ul>
          </div>
        )}
      </div>

      <div className="search-box">
        <img src={searchImg} />
        <input
          type="search"
          placeholder="Busca un chat o inicia uno nuevo"
          onKeyUp={handleKey}
        />
      </div>
    </div>
  );
};

export default Header;
