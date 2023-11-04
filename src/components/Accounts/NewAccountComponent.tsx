//src/components/Accounts/NewAccountComponent.tsx
import React, { useState } from 'react';
import { Card, IconButton, Typography, Dialog, TextField, Button, Box, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { Alert } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { db, auth } from "../../lib/FireBase/initFirebase";
import { doc, setDoc } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";

const NewAccountComponent: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [open, setOpen] = useState(false);
    const [accountName, setAccountName] = useState('');
    const [initialBalance, setInitialBalance] = useState<string | number>('');
    const [currency, setCurrency] = useState<string>('');
    const [accountType, setAccountType] = useState<string>('');
    const [financialInstitution, setFinancialInstitution] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');

    const handleCreateAccount = async () => {
        const parsedInitialBalance = parseFloat(initialBalance.toString());
        setErrorMessage('');

        if (!accountName || isNaN(parsedInitialBalance) || parsedInitialBalance < 0) {
            console.error('Please provide a valid account name and initial balance.');
            setErrorMessage('Please provide a valid account name and initial balance.'); // This is the error handling in case of invalid inputs
            return;
        }

        try {
            const user = auth.currentUser;

            if (!user) {
                console.error('Please sign in to create an account.');
                return;
            }

            const newAccountData = {
                accountName,
                initialBalance: parsedInitialBalance,
                currency,
                accountType,
                financialInstitution,
                timestamp: serverTimestamp(),
            };

            // Assuming the collection where you store accounts is named 'accounts'
            const accountRef = doc(db, 'accounts', `${user.uid}_${accountName}`);
            await setDoc(accountRef, newAccountData);
            setSuccessMessage('Account created successfully!');
            setTimeout(() => {
                setOpen(false);
                setSuccessMessage('');
            }, 1500); // Close the dialog after 1.5 seconds
        } catch (error: any) {
            console.error('Error creating account:', error.message);
            setErrorMessage('Error creating account. Please try again.');
        }
    };

    return (
        <>
            <Card
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    perspective: '1000px',
                    width: '300px',
                    height: '200px',
                    cursor: 'pointer',
                    borderRadius: '18px'
                }}
            >
                <IconButton onClick={() => setOpen(true)}>
                    <AddCircleIcon fontSize="large" />
                </IconButton>
                <Typography variant="h6">New Account</Typography>
            </Card>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <Box sx={{ p: 2 }}>
                    <TextField
                        fullWidth
                        label="Account Name"
                        variant="outlined"
                        margin="normal"
                        value={accountName}
                        onChange={e => setAccountName(e.target.value)}
                    />

                    <FormControl fullWidth variant="outlined" margin="normal">
                        <InputLabel>Account Type</InputLabel>
                        <Select
                            value={accountType}
                            onChange={e => setAccountType(e.target.value as string)}
                            label="Account Type"
                        >
                            <MenuItem value="money">Money</MenuItem>
                            <MenuItem value="savings">Savings</MenuItem>
                            <MenuItem value="cards">Cards</MenuItem>
                            {/* Add more types if necessary */}
                        </Select>
                    </FormControl>

                    <TextField
                        fullWidth
                        label="Financial Institution"
                        variant="outlined"
                        margin="normal"
                        value={financialInstitution}
                        onChange={e => setFinancialInstitution(e.target.value)}
                    />

                    <FormControl fullWidth variant="outlined" margin="normal">
                        <InputLabel>Currency</InputLabel>
                        <Select
                            value={currency}
                            onChange={e => setCurrency(e.target.value as string)}
                            label="Currency"
                        >
                            <MenuItem value="USD">USD</MenuItem>
                            <MenuItem value="EUR">EUR</MenuItem>
                            <MenuItem value="GBP">GBP</MenuItem>
                            <MenuItem value="GBP">IDR</MenuItem>
                            <MenuItem value="GBP">CAD</MenuItem>
                            {/* Add more currencies if necessary */}
                        </Select>
                    </FormControl>

                    <TextField
                        fullWidth
                        label="Initial Balance"
                        variant="outlined"
                        margin="normal"
                        value={initialBalance}
                        onChange={e => setInitialBalance(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                        fullWidth
                        onClick={handleCreateAccount}
                    >
                        Create
                    </Button>
                    {successMessage && (
                        <Alert severity="success" sx={{ mt: 2 }}>
                            {successMessage}
                        </Alert>
                    )}
                    {errorMessage && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                            {errorMessage}
                        </Alert>
                    )}
                </Box>
            </Dialog>
        </>
    );
};

export default NewAccountComponent;


