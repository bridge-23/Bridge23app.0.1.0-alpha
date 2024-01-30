//../src/components/AIChat.tsx
import React, { useState, useRef } from 'react';
import { Box, TextField, List, ListItem, ListItemText, IconButton, Fab, Typography, Popover } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';

const AIChat = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
  const [input, setInput] = useState('');
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const fabRef = useRef<HTMLButtonElement>(null);

  const handleToggleOpen = () => {
    setAnchorEl(fabRef.current);
    setOpen(!open);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const handleMessage = async (text: string) => {
    // Add user message to messages
    setMessages(prevMessages => [...prevMessages, { text, isUser: true }]);

    try {
      // Send text to the API and get the response
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: text }),
      });

      // Check if the response is ok (status in the range 200-299)
      if (!response.ok) {
        console.error(`API call failed with status: ${response.status}`);
        // Optionally, handle the error in the UI or perform other actions
      } else {
        const data = await response.json();

        // Check if the data has the expected structure
        if (data && data.data && data.data.choices && data.data.choices.length > 0) {
          const aiText = data.data.choices[0].text.trim();
          setMessages(prevMessages => [...prevMessages, { text: aiText, isUser: false }]);
        } else {
          // Handle unexpected structure
          console.error('Unexpected response structure:', data);
        }
      }
    } catch (error) {
      console.error('Error handling message:', error);
      // Optionally, handle the error in the UI as well
    }
  };

  const handleSend = async () => {
    if (input.trim()) {
      try {
        await handleMessage(input);
        setInput('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
      <Box sx={{ position: 'fixed', bottom: 16, right: 16 }}>
        <Fab color="primary" aria-label="chat" onClick={handleToggleOpen} ref={fabRef}>
          <ChatIcon />
        </Fab>
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            PaperProps={{
              style: {
                width: '500px',
                maxHeight: '800px',
              },
            }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close" sx={{ paddingRight: 2 }}>
              <CloseIcon />
            </IconButton>
            <Typography variant="body1">
              Hai this is BridgeAI, you can ask anything here
            </Typography>
          </Box>
          <List>
            {messages.map((message, index) => (
                <ListItem key={index}>
                  <ListItemText
                      primary={message.text}
                      secondary={message.isUser ? 'You' : 'AI'}
                  />
                </ListItem>
            ))}
          </List>
          {/* Example structure, update attributes as per latest Material-UI documentation */}
          <Box sx={{ display: 'flex', padding: 2 }}>
            <TextField
                fullWidth
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
            />
            <IconButton color="primary" onClick={handleSend}>
              <SendIcon />
            </IconButton>
          </Box>
        </Popover>
      </Box>
  );
};

export default AIChat;
