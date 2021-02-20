import React, {useEffect} from 'react'
import Layout from './components/Layout';

import {useSelector} from "react-redux";

function App() {

  const state = useSelector((state) => state)

  useEffect(() => {
    console.log("State: ", state)
  }, [state])

  useEffect(() => {
    console.log("Set githubuserdata")
    localStorage.setItem("githubUserData", JSON.stringify(state.githubUserData))
  }, [state.githubUserData])

  useEffect(() => {
    console.log("Set blacklist")
    localStorage.setItem("blacklist", JSON.stringify(state.blacklist))
  }, [state.blacklist])

  useEffect(() => {
    console.log("Set repocontext")
    localStorage.setItem("selectedRepo", JSON.stringify(state.selectedRepo))
  }, [state.selectedRepo])

  return (
          <Layout />
  );
}

export default App;
