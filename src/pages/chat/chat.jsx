import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loader from '../../components/loader/Loader';
import './chat.css';
import Header from './components/Header/Header';
import ListUsers from './components/ListUsers/ListUsers';
import Conversation from './components/Conversation/Conversation';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import getHourFormat from '../../dateFormat';

const Chat = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [usersAll, setUsersAll] = useState([]);
  const [user, setUser] = useState([]);
  const [isLoadPage, setIsLoadPage] = useState(false);
  const [userSelected, setUserSelected] = useState(null);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    obtenerDatos(true);
  }, []);

  const obtenerDatos = async (loading) => {
    try {
      if (loading) {
        setLoading(true);
      }
      const usersDB = await getDocs(collection(db, 'users'));
      const messagesDB = await getDocs(collection(db, 'messages'));

      let usersData = usersDB.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      let userProfile = usersData.filter(
        (user) => user.email == localStorage.getItem('email')
      );

      let usersList = usersData.filter(
        (user) => user.email != localStorage.getItem('email')
      );

      let messagesData = messagesDB.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      messagesData.sort((a, b) => {
        return a.date - b.date;
      });

      usersData.forEach((user) => {
        let messagesForMe = messagesData.filter(
          (m) =>
            m.emailReceive == localStorage.getItem('email') &&
            m.emailSend == user.email
        );

        let messagesSendForMe = messagesData.filter(
          (m) =>
            m.emailSend == localStorage.getItem('email') &&
            m.emailReceive == user.email
        );

        if (messagesSendForMe.length > 0 || messagesForMe.length > 0) {
          let lastMessageForMe = null;
          let lastMessageSendForMe = null;

          let lastMessageF = null;

          if (messagesSendForMe.length > 0) {
            lastMessageSendForMe =
              messagesSendForMe[messagesSendForMe.length - 1];
          }

          if (messagesForMe.length > 0) {
            lastMessageForMe = messagesForMe[messagesForMe.length - 1];
          }

          if (lastMessageSendForMe == null) {
            lastMessageF = lastMessageForMe;
          } else {
            if (lastMessageForMe == null) {
              lastMessageF = lastMessageSendForMe;
            } else {
              if (
                lastMessageForMe.date.seconds >
                lastMessageSendForMe.date.seconds
              ) {
                lastMessageF = lastMessageForMe;
              } else {
                lastMessageF = lastMessageSendForMe;
              }
            }
          }
          user.lastMessage = lastMessageF.text;
          user.lastTimeMessage = getHourFormat(lastMessageF.date);
        }
      });
      setUsersAll(usersList);

      if (filter != '') {
        let result = usersList.filter((user) =>
          user.username.toLowerCase().includes(filter.toLowerCase())
        );
        setUsers(result);
      } else {
        setUsers(usersList);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const selectUser = (user) => {
    setUserSelected(user);
  };

  const _filter = (value) => {
    setFilter(value);
    let result = usersAll.filter((user) =>
      user.username.toLowerCase().includes(value.toLowerCase())
    );
    setUsers(result);
  };

  const refreshData = () => {
    obtenerDatos(false);
  };

  return (
    <div className="contenedor">
      {!loading ? (
        <div className="contenedor-chat">
          <div className="part1">
            <Header onHandleKey={_filter} />

            <ListUsers users={users} onSelectUser={selectUser} />
          </div>
          <Conversation user={userSelected} onRefreshData={refreshData} />
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Chat;
