import React, {useState} from 'react';
import FlexContainer from './util/FlexContainer';
import Header from './Header';
import GenerateReviewerScreen from './resultscreen/GenerateReviewerScreen';
import SettingsComponent from './settingsscreen/SettingsComponent';

const Layout = () => {

    const [showSettings, setShowSettings] = useState(true);
    return (
        <>
            <Header setShowSettings = {setShowSettings} showSettings = {showSettings}/>
            <FlexContainer>
              {showSettings && <SettingsComponent />}
              <GenerateReviewerScreen />
            </FlexContainer>
        </>
    )
}

export default Layout
