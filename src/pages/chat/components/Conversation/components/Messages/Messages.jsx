import InputEmoji from 'react-input-emoji';
import './Messages.css';
import { useEffect, useState } from 'react';
import { db, sMessage } from '../../../../../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import getHourFormat from '../../../../../../dateFormat';

const Messages = ({ userP, onRefreshData }) => {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const [emailUserSend, setEmailUserSend] = useState(
    localStorage.getItem('email')
  );

  const enviar = () => {
    if (text != null) {
      const inputM = text;
      let date = new Date();
      let email_s = emailUserSend;
      let email_r = userP.email;
      sMessage(inputM, date, email_s, email_r);
      setText('');
      obtenerDatos();
      onRefreshData();
    }
  };

  useEffect(() => {
    obtenerDatos();
  }, []);

  useEffect(() => {
    obtenerDatos();
  }, [userP]);

  const obtenerDatos = async () => {
    try {
      const messagesDB = await getDocs(collection(db, 'messages'));

      let messagesData = messagesDB.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      let result = [];
      messagesData.forEach((message) => {
        if (
          message.emailSend == emailUserSend &&
          message.emailReceive == userP.email
        ) {
          message.realDate = getHourFormat(message.date);
          result.push(message);
        }

        if (
          message.emailSend == userP.email &&
          message.emailReceive == emailUserSend
        ) {
          message.realDate = getHourFormat(message.date);
          result.push(message);
        }
      });

      result.sort((a, b) => {
        return a.date - b.date;
      });

      setMessages(result);

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="cont-chat">
      <div className="top">
        <div className="user-info">
          <div className="user-img">
            <img src={userP.URLphoto} />
          </div>
          <div className="user-name">
            <p>{userP.username}</p>
          </div>
        </div>
      </div>

      <div className="messages-box">
        <div className="cont">
          {messages.map((message) => (
            <div
              className={`messages-cont ${
                message.emailSend == emailUserSend
                  ? 'message-send'
                  : 'message-received'
              }`}
            >
              {message.text}
              <div className="date-cont">
                <p>{message.realDate}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="message">
          <form id="message-form">
            <InputEmoji
              value={text}
              onChange={setText}
              onEnter={() => {
                enviar();
              }}
              placeholder=""
            />
            <button
              type="button"
              className="btn-enviar"
              onClick={() => {
                enviar();
              }}
            >
              <img src="../public/enviar.png " />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Messages;
