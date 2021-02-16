import React from 'react'
import BlackListContextProvider, { BlackListContext } from './components/context/BlackListContext';
import RepoContextProvider from './components/context/RepoContext';
import UserContextProvider from './components/context/UserContext';
import FlexContainer from './components/FlexContainer';
import GenerateReviewerScreen from './components/GenerateReviewerScreen';
import SettingsComponent from './components/SettingsComponent';

function App() {

  return (
    <>
      <UserContextProvider>
        <BlackListContextProvider>
          <RepoContextProvider>
            <FlexContainer>
              <SettingsComponent />
              <GenerateReviewerScreen />
            </FlexContainer>
          </RepoContextProvider>
        </BlackListContextProvider>
      </UserContextProvider>
    </>
  );
}

export default App;
