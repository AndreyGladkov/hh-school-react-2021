import './User.css';

function User(props) {
  if (props.user) {
    return (
      <div className="user">
        <img width="200px" height="200px" className="user__avatar" src={props.user.avatar_url} alt="" />
        <div className="user__name">{props.label}: {props.user.login}</div>
      </div>
    );
  } else {
    return (
      <div className="user">
        {props.label}: не найден
      </div>
    );
  }
}

export default User;
