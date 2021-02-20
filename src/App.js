import React from 'react'
import RepoContextProvider from './components/context/RepoContext';
import UserContextProvider from './components/context/UserContext';
import Layout from './components/Layout';

function App() {
  return (
      <UserContextProvider>
        <RepoContextProvider>
          <Layout />
        </RepoContextProvider>
      </UserContextProvider>
  );
}

export default App;
