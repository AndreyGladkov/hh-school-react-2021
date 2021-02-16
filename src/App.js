import React from 'react'
import BlackListContextProvider from './components/context/BlackListContext';
import RepoContextProvider from './components/context/RepoContext';
import UserContextProvider from './components/context/UserContext';
import Layout from './components/Layout';


function App() {
  return (
    <>
      <UserContextProvider>
        <BlackListContextProvider>
          <RepoContextProvider>
            <Layout />
          </RepoContextProvider>
        </BlackListContextProvider>
      </UserContextProvider>
    </>
  );
}

export default App;
