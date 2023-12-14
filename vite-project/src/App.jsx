import { useState } from 'react'
import './App.css'
import {createTheme, MantineProvider, useMantineTheme} from '@mantine/core';
import '@mantine/core/styles.css';
import { TextInput, Button, Container, Title, Text, Box, Paper } from '@mantine/core';


const myTheme = createTheme({
  colors: {
    myColor: [
      '#f271aa',
      '#ef4991',
      '#ee3482',
      '#ef297a',
      '#d41f68',
      '#bd175c',
      '#a6074f'
    ]
  }
});
function ChatApp() {
  const [count, setCount] = useState(0)
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
    <Box sx={{ maxWidth: 500, margin: 'auto', padding: '20px' }}>
      {response && (
        <Paper 
          padding="lg"
          style={{ 
            marginBottom: '20px',
            maxHeight: '300px',
            overflowY: 'auto' // Enable scrolling for long responses
          }}
        >
          <Text>{response}</Text>
        </Paper>
      )}
      <TextInput
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message here"
        mb="sm"
        style={{ marginBottom: '10px' }}
      />
      <Button color='myColor' onClick={handleClick} fullWidth>
        Send
      </Button>
    </Box>
  );
}

function App() {
  return (
    <MantineProvider theme={myTheme}>
      <ChatApp />
    </MantineProvider>
  );
}

export default App;
