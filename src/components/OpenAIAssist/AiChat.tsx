// components/AIChat.tsx
import React, { useState } from 'react';
import { Box, TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import Fab from '@mui/material/Fab';
import ChatIcon from '@mui/icons-material/Chat';

const AIChatFab = ({ onClick }: { onClick: () => void }) => (
 <Fab color="primary" aria-label="chat" onClick={onClick}>
     <ChatIcon />
 </Fab>
);

const useAIChat = () => {
 const [open, setOpen] = useState(false);
 const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);

 const handleMessage = async (text: string) => {
     // Send text to the API and get the response
     const response = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: text }),
     });
     const data = await response.json();
     
     // Add response to messages
     setMessages([...messages, { text: data.message, isUser: false }]);
 };

 const handleToggleOpen = () => {
     setOpen(!open);
 };

 return { open, messages, handleMessage, handleToggleOpen };
};

const AIChat = () => {
 const { open, messages, handleMessage, handleToggleOpen } = useAIChat();

 const [input, setInput] = useState('');

 const handleSend = async () => {
    await handleMessage(input);
    setInput('');
 }

 return (
     <Box>
        <AIChatFab onClick={handleToggleOpen} />
        {open && (
            <Box>
                <List>
                    {messages.map((message, index) => (
                        <ListItem key={index}>
                            <ListItem>
                                <ListItemText primary={message.text} secondary={message.isUser ? 'You' : 'AI'} />
                            </ListItem>
                        </ListItem>
                    ))}
                </List>
                <TextField value={input} onChange={(e) => setInput(e.target.value)} />
                <Button onClick={handleSend}>Send</Button>
            </Box>
        )}
     </Box>
 );
};

export default AIChat;