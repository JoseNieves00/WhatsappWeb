import Messages from '../Conversation/components/Messages/Messages';
import PanelInicial from '../Conversation/components/PanelInicial/PanelIncial';
import './Conversation.css';

const Conversation = ({ user, messages, onRefreshData }) => {
  return (
    <div className="messages">
      {user == null ? (
        <PanelInicial />
      ) : (
        <Messages
          userP={user}
          messages={messages}
          onRefreshData={onRefreshData}
        />
      )}
    </div>
  );
};

export default Conversation;
