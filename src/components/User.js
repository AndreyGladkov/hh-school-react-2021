export default function User(props) {
  const errorStyle = {color: 'red'};

  return (
    <div>
      <h2>{props.title}</h2>
      {props.user?.error ?
        <div style={errorStyle}>{props.user?.error}</div> :
        <div>
          {props.user?.login}<br />
          <img src={props.user?.avatar_url} alt={props.user?.login} />
        </div>}
    </div>);
}
