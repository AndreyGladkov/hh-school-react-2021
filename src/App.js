import { useEffect, useState } from 'react';
import './App.css';
import {Card, Settings}  from './components'

function App() {
  const [users, useUsers] = useState(null);
  // const getUsers = () => {
  //   fetch("https://api.github.com/users").then((response) => {
  //     let usrs = response.json();
  //     useUsers(usrs);
  //     console.log(usrs);
  //   }).catch((error)=>{
  //     console.log(error);
  //   });
  // }
  useEffect(() => {
   // getUsers();
  })
  return (
    <div className="App">
      <div className="wrapper">
        <div className="sidebar">
          <Settings blacklist={["pre55","pre66"]} reviewer={"Pre77"} repo={"https://github.com/pre77/hh_js_1"}/>
        </div>
        <div className="content">
          {users.map((value)=> {
            return <Card key={value.id} name={value.login} image={value.avatar_url}/>
          })}
          
        </div>
      </div>
    </div>
  );
}

export default App;
