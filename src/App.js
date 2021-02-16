import './App.css';
import {Card, Settings}  from './components'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        text
      </header>
      <div className="wrapper">
        <div className="sidebar">
          <Card />
        </div>
        <div className="content">
          <Settings />
        </div>
      </div>
    </div>
  );
}

export default App;
