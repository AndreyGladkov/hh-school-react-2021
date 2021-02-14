import React from 'react'
import BlackList from './components/BlackList';
import BlackListContextProvider, { BlackListContext } from './components/context/BlackListContext';
import UserContextProvider from './components/context/UserContext';
import FetchGithubUserByLogin from "./components/FetchGithubUserByLogin";

function App() {

  return (
    <>
      <UserContextProvider>
        <BlackListContextProvider>
          <FetchGithubUserByLogin/>
          <BlackList />
        </BlackListContextProvider>
      </UserContextProvider>
    </>
  );
}

export default App;
