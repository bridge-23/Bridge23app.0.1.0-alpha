//..src/components/TransactionList.tsx
import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ReceiptIcon from '@mui/icons-material/Receipt';
import dynamic from "next/dynamic";

const DynamicAddExpense = dynamic(() => import("../Dashboard/AddTransaction"), {ssr: false});

export default function TransactionList() {
    const [isDialogOpen, setDialogOpen] = useState(false);
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
            <ListItem button onClick={() => setDialogOpen(true)}>
                <ListItemIcon>
                    <RemoveIcon sx={{ color: 'red' }} />
                </ListItemIcon>
                <ListItemText primary="Expense" />
            </ListItem>
            <ListItem>
                <ListItemIcon>
                    <AddIcon sx={{ color: 'green' }} />
                </ListItemIcon>
                <ListItemText primary="Income" />
            </ListItem>
            <ListItem>
                <ListItemIcon>
                    <ReceiptIcon sx={{ color: 'blue' }} />
                </ListItemIcon>
                <ListItemText primary="Upload receipt" />
            </ListItem>
            <ListItem>
                <ListItemIcon>
                    <SwapHorizIcon sx={{ color: 'blue' }} />
                </ListItemIcon>
                <ListItemText primary="Transfer" />
            </ListItem>
        </List>
    <DynamicAddExpense open={isDialogOpen} onClose={() => setDialogOpen(false)} />
</>
    );
}
