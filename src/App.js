import logo from './logo.svg';
import './App.css';
import { useState } from React;
import DailyIframe from '@daily-co/daily-js';

const ROOM_URL = 'https://wojwozniak.daily.co/qMA5L7spRCsX2KMqNyn7';

const STATE_IDLE = 'STATE_IDLE';
const STATE_CREATING = 'STATE_CREATING';
const STATE_JOINING = 'STATE_JOINING';
const STATE_LEAVING = 'STATE_LEAVING';
const STATE_ERROR = 'STATE_ERROR';

function App() {
  const [appState, setAppState] = useState();
  const [roomUrl, setRoomUrl] = useState(ROOM_URL);
  const [callObject, setCallObject] = useState(null);

  const startJoiningCall = () => {
    const newCallObject = DailyIframe.createCallObject();
    setCallObject(newCallObject);
    setAppState();
  }


  return (
    <div className="App">
      <button>
        Start a call
      </button>
    </div>
  );
}

export default App;
