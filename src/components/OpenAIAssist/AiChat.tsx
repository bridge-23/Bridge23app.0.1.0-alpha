// components/AIChat.tsx
import React, { useState } from 'react';
import { Box, TextField, Button, List, ListItem, ListItemText, Typography, Stack, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Fab from '@mui/material/Fab';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

const AIChatFab = ({ onClick }: { onClick: () => void }) => (
    <Stack direction="row" spacing={2}>
        <Fab color="primary" aria-label="chat" onClick={onClick} size="small">
            <ChatIcon />
        </Fab>
        <Typography variant="subtitle1">Hi BridgeAI here, can I help you?</Typography>
    </Stack>
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
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');

    const handleSend = async () => {
        await handleMessage(input);
        setInput('');
        setOpenDialog(true);
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
    }

    return (
        <Box>
          <AIChatFab onClick={handleToggleOpen} />
          {open && (
            <Box>
              <List>
                {messages.map((message, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={message.text} secondary={message.isUser ? 'You' : 'AI'} />
                  </ListItem>
                ))}
              </List>
              <TextField value={input} onChange={e => setInput(e.target.value)} />
              <Button onClick={handleSend}>Send</Button>
            </Box>
          )}
          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>AI Response</DialogTitle>
            <DialogContent>
              <Typography>{dialogMessage}</Typography>
            </DialogContent>
            <DialogActions>
              <IconButton edge="end" color="inherit" onClick={handleCloseDialog} aria-label="close">
                <CloseIcon />
              </IconButton>
            </DialogActions>
          </Dialog>
        </Box>
    );
};
    
    export default AIChat;