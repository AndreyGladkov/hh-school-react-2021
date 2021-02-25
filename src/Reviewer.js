export default function Reviewer(props) {
  return (
    <div>
        <div>
          {props.reviewer?.login}<br />
          <img src={props.reviewer?.avatar_url} alt={props.reviewer?.login} />
        </div>
    </div>);
}
