import React, {useEffect} from 'react'
import RepoContextProvider from './components/context/RepoContext';
import Layout from './components/Layout';

import {useSelector} from "react-redux";

function App() {

  const state = useSelector((state) => state)

  useEffect(() => {
    console.log(state)
  }, [state])

  return (
        <RepoContextProvider>
          <Layout />
        </RepoContextProvider>
  );
}

export default App;
