import React, { useState } from "react";
import FlexContainer from "./components/util/FlexContainer";
import Header from "./components/Header";
import GenerateReviewerScreen from "./components/resultscreen/GenerateReviewerScreen";
import SettingsComponent from "./components/settingsscreen/SettingsComponent";

function App() {
    const [showSettings, setShowSettings] = useState(true);
    return (
        <>
            <Header
                setShowSettings={setShowSettings}
                showSettings={showSettings}
            />
            <FlexContainer>
                {showSettings && <SettingsComponent />}
                <GenerateReviewerScreen />
            </FlexContainer>
        </>
    );
}

export default App;
