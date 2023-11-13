//..src/components/TransactionList.tsx
import React, { useState } from 'react';
import { List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import AddTransaction from "../Dashboard/AddTransaction";
import ReceiptIcon from '@mui/icons-material/Receipt';

export default function TransactionList() {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [initialTransactionType, setInitialTransactionType] = useState<string>(''); // Explicitly specify the type

    // Inside your handleListItemClick function
    // Inside your handleListItemClick function
    const handleListItemClick = (type: string) => {
        setInitialTransactionType(type);
        setDialogOpen(true);
    };

    return (
        <>
            <List
                sx={{
                    width: '280px',
                    backgroundColor: 'background.paper',
                    borderRadius: '10px',
                    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
                    padding: '16px'
                }}
            >
                <ListItem button onClick={() => handleListItemClick('Expense')}>
                    <ListItemIcon>
                        <RemoveIcon sx={{ color: 'red' }} />
                    </ListItemIcon>
                    <ListItemText primary="Expense" />
                </ListItem>
                <ListItem button onClick={() => handleListItemClick('Income')}>
                    <ListItemIcon>
                        <AddIcon sx={{ color: 'green' }} />
                    </ListItemIcon>
                    <ListItemText primary="Income" />
                </ListItem>
                <ListItem button onClick={() => handleListItemClick('Transfer')}>
                    <ListItemIcon>
                        <SwapHorizIcon sx={{ color: 'blue' }} />
                    </ListItemIcon>
                    <ListItemText primary="Transfer" />
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <ReceiptIcon sx={{ color: 'blue' }} />
                    </ListItemIcon>
                    <ListItemText primary="Upload receipt" />
                </ListItem>
            </List>
            <AddTransaction open={isDialogOpen} onClose={() => setDialogOpen(false)} initialTransactionType={initialTransactionType} />
        </>
    );
}

