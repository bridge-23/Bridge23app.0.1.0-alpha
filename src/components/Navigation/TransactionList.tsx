//..src/components/TransactionList.tsx
import React, { useState } from 'react';
import {List, ListItem, ListItemText, ListItemIcon, Dialog, DialogContent, DialogTitle, Box, useMediaQuery, Drawer} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AddTransaction from "../Dashboard/AddTransaction";
import FileUploadAndRecognize from '../Buttons/UploadReceipt';
import {useTheme} from "@mui/material/styles";
export default function TransactionList() {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [isUploadDialogOpen, setUploadDialogOpen] = useState(false);
    const [initialTransactionType, setInitialTransactionType] = useState<string>(''); // Explicitly specify the type
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const handleListItemClick = (type: string) => {
        setInitialTransactionType(type);
        type === 'UploadReceipt' ? setUploadDialogOpen(true) : setDialogOpen(true);
    };
    const renderDialogContent = () => (
        <>
            {/* Your Dialog Content Here */}
            {initialTransactionType !== 'UploadReceipt' && (
                <AddTransaction open={isDialogOpen} onClose={() => setDialogOpen(false)} initialTransactionType={initialTransactionType} />
            )}
            {initialTransactionType === 'UploadReceipt' && (
                <FileUploadAndRecognize />
            )}
        </>
    );
    return (
        <>
            <List
                sx={{
                    width: '280px',
                    //padding: '16px'
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
                <ListItem button onClick={() => handleListItemClick('UploadReceipt')}>
                    <ListItemIcon>
                        <ReceiptIcon sx={{ color: 'blue' }} />
                    </ListItemIcon>
                    <ListItemText primary="Upload receipt" />
                </ListItem>
            </List>
            {/* Dialog for File Upload and Recognize */}
            {isMobile ? (
                <Drawer anchor="bottom"sx={{
                    '& .MuiDrawer-paper': {
                        borderTopLeftRadius: '24px',
                        borderTopRightRadius: '24px',
                        paddingBottom: '60px',
                    },
                }} open={isDialogOpen || isUploadDialogOpen} onClose={() => { setDialogOpen(false); setUploadDialogOpen(false); }}>
                    {renderDialogContent()}
                </Drawer>
            ) : (
                <Dialog open={isDialogOpen || isUploadDialogOpen} onClose={() => { setDialogOpen(false); setUploadDialogOpen(false); }} sx={{ '& .MuiPaper-rounded': { borderRadius: '24px', boxShadow: 'none' } }}>
                    <DialogTitle sx={{ textAlign: 'center' }}>
                        {initialTransactionType === 'UploadReceipt' ? 'Upload Receipt' : 'Add Transaction'}
                    </DialogTitle>
                    <DialogContent>
                        {renderDialogContent()}
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
}

