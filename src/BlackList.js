import React, {useState} from 'react';

function BlackList(props) {
  const [currentIgnore, setCurrentIgnore] = useState("");

  return (<div>
    <label htmlFor="blackList">Black list:</label>&nbsp;
    <input id="blackList" value={currentIgnore} onChange={(e) => setCurrentIgnore(e.target.value)} />&nbsp;
    <button onClick={() => props.addToBlackList(currentIgnore)}>Add</button>
    <ul>
      {props.blackList.map(contributor => <li key={contributor}>{contributor} <button onClick={() => props.removeFromBlackList(contributor)}>Remove</button></li>)}
    </ul>
  </div>)
}

export default BlackList;
