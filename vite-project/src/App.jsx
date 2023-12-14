import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {createTheme, MantineProvider} from '@mantine/core';
import '@mantine/core/styles.css';
import { Button } from '@mantine/core';


function App() {
  const [count, setCount] = useState(0)
  const theme = createTheme({
    fontFamily: 'Open Sans, sans-serif',
    primaryColor: 'cyan',
  });
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);

  const handleClick = () => {
    fetch('http://127.0.0.1:5000/chat',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: input
      })
    })
    .then(response => {
      if (response.headers.get('content-type').includes('application/json')) {
        return response.json();
      } else {
        throw new Error('Server response was not in JSON format');
      }
    })
      .then(data => {
        setResponse(data.reply);
      });
  };

  return (
    <MantineProvider defaultColorScheme="dark">
    <div className="App">
      <header className="App-header">
      <input type="text" value={input} onChange={e => setInput(e.target.value)} />
        <button onClick={handleClick}>Send</button>
        {response && <p>{response}</p>}
      </header>
    </div>
    </MantineProvider>
  );
}

export default App
