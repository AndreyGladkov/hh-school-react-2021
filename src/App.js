import React, {useEffect} from 'react'
import BlackListContextProvider from './components/context/BlackListContext';
import RepoContextProvider from './components/context/RepoContext';
import UserContextProvider from './components/context/UserContext';
import Layout from './components/Layout';

import {useSelector, useDispatch} from "react-redux";

function App() {

  const state = useSelector((state) => state)

  useEffect(() => {
    console.log(state)
  }, [state])

  return (
      <UserContextProvider>
        <BlackListContextProvider>
          <RepoContextProvider>
            <Layout />
          </RepoContextProvider>
        </BlackListContextProvider>
      </UserContextProvider>
  );
}

export default App;
