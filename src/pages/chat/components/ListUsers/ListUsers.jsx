import './ListUsers.css';

const ListUsers = ({ users, onSelectUser }) => {
  return (
    <div className="users">
      {users.map((user) => (
        <div className="user-demo">
          <div className="user-profile">
            <img src={user.URLphoto} />
          </div>

          <div
            className="user-info"
            onClick={() => {
              onSelectUser(user);
            }}
          >
            <div className="part1">
              <div className="user-name">
                <p className="name">{user.username}</p>
              </div>
              <div className="user-lmessage">
                <p>{user.lastMessage}</p>
              </div>
            </div>
            <div className="part2">
              <div className="hora-message">
                <p>{user.lastTimeMessage}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListUsers;
